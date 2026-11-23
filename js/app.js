"use strict";

// M3 implementation: all five interactions work with in-memory state. The
// labelled example view has its own disposable records. Neither view reads or
// writes Local Storage yet. Production startup and storage steps are at the end.

const noiseLevels = ["Silent", "Quiet", "Moderate"];
const placeTypes = ["Library", "Café", "Outdoors", "Other"];
const exampleView = new URLSearchParams(location.search).get("view") === "examples";
const state = { spots: [], activeFilter: "All" };
const form = document.querySelector("#spot-form");
const fields = form.elements;
const list = document.querySelector("#spots");
const filter = document.querySelector("#filter");
const summary = document.querySelector("#summary");
const empty = document.querySelector("#empty");
const clear = document.querySelector("#clear");
const template = document.querySelector("#spot-card");
const formMessage = document.querySelector("#form-message");
const listMessage = document.querySelector("#list-message");
const dialog = document.querySelector("#confirmation");
const confirmButton = document.querySelector("#confirm-action");
let pendingAction = null;
let nextId = 1;

function createSpot(name, type, noise, note) {
  // This counter is unique for the current session. Final storage uses a UUID
  // generated at creation and retained unchanged when a record is restored.
  return { id: String(nextId++), name, type, noise, note, favourite: false };
}

function validateForm() {
  const name = fields.name.value.trim();
  const note = fields.note.value;
  if (!name) return [fields.name, "Please enter a place name."];
  if (fields.name.value.length > 50) return [fields.name, "Use 50 characters or fewer for the place name."];
  if (!placeTypes.includes(fields.type.value)) return [fields.type, "Please choose a type and a noise level."];
  if (!noiseLevels.includes(fields.noise.value)) return [fields.noise, "Please choose a type and a noise level."];
  if (note.length > 100) return [fields.note, "Use 100 characters or fewer for the note."];
  return null;
}

function clearFeedback() {
  formMessage.textContent = "";
  formMessage.classList.remove("error");
  listMessage.textContent = "";
  for (const node of list.querySelectorAll(".card-message")) node.textContent = "";
  for (const control of form.querySelectorAll("[aria-invalid]")) control.removeAttribute("aria-invalid");
}

function visibleSpots() {
  const matches = state.spots.filter(spot => state.activeFilter === "All" || spot.noise === state.activeFilter);
  return matches.sort((a, b) => Number(b.favourite) - Number(a.favourite));
}

function renderCard(spot) {
  const card = template.content.firstElementChild.cloneNode(true);
  card.dataset.id = spot.id;
  card.querySelector("h3").textContent = spot.name;
  card.querySelector(".type").textContent = spot.type;
  const badge = card.querySelector(".badge");
  badge.textContent = spot.noise;
  badge.dataset.noise = spot.noise;
  const note = card.querySelector(".note");
  note.textContent = spot.note;
  note.hidden = !spot.note;
  card.querySelector(".star").hidden = !spot.favourite;
  const favourite = card.querySelector('[data-action="favourite"]');
  favourite.textContent = spot.favourite ? "Favourited" : "Favourite";
  favourite.setAttribute("aria-pressed", String(spot.favourite));
  return card;
}

function render() {
  const matches = visibleSpots();
  list.replaceChildren(...matches.map(renderCard));
  filter.value = state.activeFilter;
  const noise = state.activeFilter === "All" ? "" : " " + state.activeFilter;
  summary.textContent = "Showing " + matches.length + noise + (matches.length === 1 ? " spot" : " spots");
  empty.hidden = matches.length > 0;
  empty.querySelector("p").textContent = state.spots.length === 0
    ? "No spots yet. Add your first quiet place above."
    : "No " + state.activeFilter + " spots yet. Try another filter or add a spot.";
  clear.disabled = state.spots.length === 0;
}

function addSpot(event) {
  event.preventDefault();
  clearFeedback();
  const error = validateForm();
  if (error) {
    const [control, message] = error;
    formMessage.classList.add("error");
    formMessage.textContent = message;
    control.setAttribute("aria-invalid", "true");
    control.focus();
    return;
  }
  const spot = createSpot(fields.name.value.trim(), fields.type.value, fields.noise.value, fields.note.value.trim());
  state.spots.push(spot);
  form.reset();
  render();
  formMessage.textContent = "Spot added: " + spot.name;
}

function cardFor(id) {
  return Array.from(list.children).find(card => card.dataset.id === id);
}

function toggleFavourite(spot) {
  spot.favourite = !spot.favourite;
  render();
  const card = cardFor(spot.id);
  card.querySelector('[data-action="favourite"]').focus();
  card.querySelector(".card-message").textContent = spot.favourite ? "Added to favourites" : "Removed from favourites";
}

function confirmAction(kind, spot, trigger) {
  const all = kind === "clear";
  pendingAction = { kind, id: spot?.id, trigger };
  document.querySelector("#dialog-title").textContent = all ? "Clear all spots" : "Remove a spot";
  document.querySelector("#dialog-message").textContent = all
    ? "Remove all saved spots? This cannot be undone."
    : "Remove " + spot.name + "? This cannot be undone.";
  confirmButton.textContent = all ? "Clear All Spots" : "Remove";
  dialog.returnValue = "cancel";
  dialog.showModal();
}

function handleConfirmation() {
  const action = pendingAction;
  pendingAction = null;
  if (!action) return;
  if (dialog.returnValue !== "confirm") {
    listMessage.textContent = action.kind === "clear" ? "Clear cancelled." : "Removal cancelled.";
    action.trigger.focus();
    return;
  }
  const previousIndex = visibleSpots().findIndex(spot => spot.id === action.id);
  if (action.kind === "clear") {
    state.spots = [];
    state.activeFilter = "All";
  } else {
    state.spots = state.spots.filter(spot => spot.id !== action.id);
  }
  render();
  listMessage.textContent = action.kind === "clear" ? "All spots cleared" : "Spot removed";
  const nextCard = list.children[Math.min(previousIndex, list.children.length - 1)];
  const focusTarget = nextCard?.querySelector('[data-action="remove"]') || document.querySelector("#list-heading");
  focusTarget.focus();
}

function init() {
  if (exampleView) {
    document.querySelector("#mode-label").textContent = "Example collection · Changes reset on refresh.";
    const link = document.querySelector("#example-link");
    link.href = "index.html";
    link.textContent = "Return to your spots";
    state.spots = [
      createSpot("Library 3rd floor corner", "Library", "Silent", "Window seat, outlets nearby."),
      createSpot("Maple Café back table", "Café", "Moderate", "Gets busy at lunch."),
      createSpot("Botanical garden bench", "Outdoors", "Quiet", "Shade under the maple trees.")
    ];
    state.spots[2].favourite = true;
  }
  render();
  form.addEventListener("submit", addSpot);
  filter.addEventListener("change", () => {
    clearFeedback();
    state.activeFilter = filter.value;
    render();
  });
  list.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const spot = state.spots.find(item => item.id === button.closest(".card").dataset.id);
    if (!spot) return;
    clearFeedback();
    if (button.dataset.action === "favourite") toggleFavourite(spot);
    else confirmAction("remove", spot, button);
  });
  clear.addEventListener("click", () => {
    if (state.spots.length === 0) return;
    clearFeedback();
    confirmAction("clear", null, clear);
  });
  dialog.addEventListener("close", handleConfirmation);
}
init();

/* FINAL IMPLEMENTATION PLAN — Local Storage has no executable implementation here.
   State: store {spots, activeFilter} at mtm6302-quiet-place-state-v1. Generate
   each ID with crypto.randomUUID(). Never persist DOM nodes, feedback, pending
   confirmations, visibleSpots() or its derived count. Examples must stay isolated.

   Startup — initialize [] / All; getItem inside try/catch. If absent, keep
   defaults. Otherwise JSON.parse and verify an array, nonempty unique string IDs,
   valid lengths and enumerations, boolean favourite and allowed filter. Reject
   malformed state as a unit; show recovery feedback and let the user start over.
   Restore state, render count/cards/disabled control, then attach listeners.

   F1 / submit — prevent reload; trim the name, validate fields and both limits.
   Keep form, focus and records on error. Create an unstarred object with a stable
   ID, allowing duplicate names. Stage the appended collection, save, then adopt it,
   render, clear inputs and announce "Spot added: [name]". Retain the active filter.

   F2 / change — validate the selected noise; for a new value, stage and save it.
   After saving, derive visible matches from the full array, with favourites first
   and insertion order for ties. Render count, selected option and empty hint.

   F3 / click — delegate by action and ID, find exactly one record, and stage a copy
   with the flag inverted. Save, adopt, rerender, restore focus by ID, and announce
   the change near the button. Update star, status word, label and aria-pressed.

   F4 / click, then dialog close — remember the target ID; open a named dialog.
   On cancel/Escape, restore focus without writing. On confirm, stage an array
   excluding that ID only, save, adopt, render the remaining cards, report "Spot
   removed", and focus the next Remove control or the results heading.

   F5 / click, then dialog close — guard using total record count, even if the
   active filter has no matches. Cancel preserves all fields. Confirm removes only
   the project key with removeItem. After success, reset to [] / All, rerender,
   report "All spots cleared", disable clear and focus results. Verify a fresh
   load follows the missing-key path and unrelated keys survive.

   Shared saveState(next) — JSON.stringify + setItem in try/catch for F1–F4.
   Perform the storage write before committing a staged change to the UI. If it
   fails, retain the last state and the form, restore the previously saved filter
   selection where needed, show a retryable error and never report success.
   Retest all 23 planned acceptance cases on the final build and on its public URL.
*/
