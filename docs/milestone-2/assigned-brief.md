# Quiet Place assigned brief

Text transcription of the eight-page brief. The client name is omitted for public posting. Line breaks and table layout differ from the privately retained PDF.

## Source page 1

Milestone 1 Client Project Brief
How to use this template
You are the client. Explain what you want the application to do in everyday language. Your developer will
decide how to organize the code and test the application in Milestone 2.
Replace [Your answer] with your information. Copy the feature block for each main feature. The reading-list
examples are guidance, not requirements for your idea. Remove prompts and examples from your finished
document, keeping the five numbered headings and your answers.
Type your answers directly into this Word document. The answer areas expand as you type. Export your
completed brief as one PDF named mtm6302-milestone-1-YOUR-AC-USERNAME.pdf and submit it to
Milestone 1 in Brightspace. No code, technical plan, or repository is required.
1 Project identity and purpose
Project title: Quiet place
Who is it for? Students who need calm places to study, read or recharge, such as library corners, cafés and
outdoor benches. They would open it when they have a free hour and want to choose a spot quickly, or after
finding a good spot they want to remember.
What will it help them do? Good quiet spots are easy to forget and hard to compare. Quiet Place lets people
save the places they have found, describe how noisy each one is, mark favourites, and filter the list to find a
suitable spot in seconds.
This application helps students to save and sort their favourite quiet spots so they can find a calm place to
focus without searching each time.

## Source page 2

2 Main features and priorities
List three to five main features. Describe useful things a person can do. Add F4 and F5 only if needed.
Feature What the user can do
Enter a place name, choose its type and noise level, and optionally add a
F1: Add a spot
short note.
F2: Filter by noise level Show all spots, or only Silent, Quiet or Moderate ones.
F3: Mark as favourite Star or unstar a spot so the best places are easy to spot.
F4: Remove a spot Delete one spot from the list.
F5:Clear all spots Remove every saved spot and start over.
What matters most? Which required features should the developer prioritize?
F1 (adding), F2 (filtering) and remembering the spots after a refresh are the most important.
F3 comes next. F4 and F5 are required but simple.
Optional extras: What would be nice to have if time permits?
a search box to find a spot by name; a “Pick one for me” button that shows a random spot from the current
filter; showing the number of spots at the top (for example “5 spots”).
What will this application not do? Set clear limits.
No maps, GPS or directions; no accounts or logins; no sharing or reviews from other people; no photos; no live
noise measuring (noise levels are the user's own opinion); and no editing a spot after it is added (the user
removes it and adds it again).

## Source page 3

3 What happens when someone uses it
Feature [F1] Add a spot
 What does the user enter, select, or click? They type the place name, pick a type (Library, Café,
Outdoors or Other), pick a noise level (Silent, Quiet or Moderate), optionally type a note, and click “Add
Spot.”
 What information is required? Are there any rules or limits? The place name is required and needs at
least one non-space character (maximum 50 characters). Type and noise level are required, and neither
is chosen at first. The note is optional (maximum 100 characters).
 What should happen when the action succeeds? The spot appears in the list, and it is not a favourite
at first. The form clears so the user can add another spot.
 What message or visible change tells the user it worked? The message “Spot added: Library 3rd floor
corner” (using the place’s name) appears beside the form, and the new card shows in the list.
 What if information is missing or unsuitable? What should stay unchanged? If the name is blank or
only spaces, show “Please enter a place name.” If type or noise level is not chosen, show “Please choose
a type and a noise level.” The list stays unchanged, and what the user already typed stays in the form.
 What happens if the user repeats the action, where relevant? Two spots with the same name are
allowed, because the same café may have a quiet corner and a loud counter. Clicking Add Spot with an
empty form adds nothing.
Feature [F2] Filter by Noise level
 What does the user enter, select, or click? They choose All, Silent, Quiet or Moderate from a labelled
filter above the list.
 What information is required? Are there any rules or limits? Nothing needs to be typed. Only one filter
is active at a time, and “All” is the starting choice.
 What should happen when the action succeeds? The list immediately shows only the spots with that
noise level. Other spots are hidden, not deleted, and they return when the user picks “All.”
 What message or visible change tells the user it worked? A line above the list such as “Showing 2
Quiet spots,” and the chosen filter looks selected.
 What if information is missing or unsuitable? What should stay unchanged? If no spots match, show
“No Silent spots yet. Try another filter or add a spot.” The filter stays on what the user chose, and no
spots are changed.
 What happens if the user repeats the action, where relevant? Choosing the same filter again changes
nothing.

## Source page 4

Feature [F3] Mark as favourite
 What does the user enter, select, or click? They click the “Favourite” button on one spot. Clicking it
again removes the favourite.
 What information is required? Are there any rules or limits? Nothing needs to be typed. Only the spot
whose button was clicked changes.
 What should happen when the action succeeds? The spot shows a star and the word “Favourite,” and
favourites move to the top of the list.
 What message or visible change tells the user it worked? The button label changes to “Favourited”
and the message “Added to favourites” appears near the button.
 What if information is missing or unsuitable? What should stay unchanged? Not applicable, because
the button only exists on spots that already exist. All other spots stay unchanged.
 What happens if the user repeats the action, where relevant? Each click switches between favourite
and not favourite. When unfavourited, the star disappears, the button goes back to “Favourite,” and
the message is “Removed from favourites.”
Feature [F4] Remove a spot
 What does the user enter, select, or click? They click the “Remove” button on one spot.
 What information is required? Are there any rules or limits? Nothing needs to be typed. Before
anything is deleted, ask “Remove Library 3rd floor corner? This cannot be undone.” (using the spot’s
name) and let the user confirm or cancel. Only the spot whose button was clicked is affected.
 What should happen when the action succeeds? The spot disappears from the list, and the rest of the
list stays as it was. If it was the last spot, the “No spots yet” message is shown.
 What message or visible change tells the user it worked? The message “Spot removed” appears near
the list, and the card is gone.
 What if information is missing or unsuitable? What should stay unchanged? If the user cancels the
confirmation, nothing changes and all spots stay in the list. There is no missing-information case,
because the button only exists on spots that already exist.
 What happens if the user repeats the action, where relevant? Each click only affects the spot it
belongs to. Removing several spots means confirming each one separately.

## Source page 5

Feature [F5] Clear all spots
 What does the user enter, select, or click? They click the “Clear All Spots” button below the list.
 What information is required? Are there any rules or limits? Nothing needs to be typed. Ask “Remove
all saved spots? This cannot be undone.” and let the user confirm or cancel. The button is disabled
when the list is empty.
 What should happen when the action succeeds? All spots are erased, including the saved ones, so
they do not return after a refresh. The filter goes back to “All.”
 What message or visible change tells the user it worked? The list shows “No spots yet,” the message
“All spots cleared” appears, and the Clear All Spots button becomes disabled.
 What if information is missing or unsuitable? What should stay unchanged? If the user cancels the
confirmation, nothing changes: the spots, the favourites and the filter all stay as they were.
 What happens if the user repeats the action, where relevant? Nothing happens, because the button
is disabled while the list is empty. After another refresh, the list is still empty.

## Source page 6

4 Information the app needs and remembers
What information will users enter or see? Describe the details that belong together in plain language.
Each spot has a place name, a type (Library, Café, Outdoors, Other), a noise level (Silent, Quiet, Moderate), an
optional short note, and a favourite yes/no mark.
Give a few realistic examples: Say whether these should appear in the app initially or are only examples for
the developer.
“Library 3rd floor corner, Library, Silent, ‘Window seat, outlets nearby’”; “Maple Café back table, Café,
Moderate, ‘Gets busy at lunch’”; “Botanical garden bench, Outdoors, Quiet, favourite.” These are examples
only for the developer. They should not appear when someone first opens the app.
Where does the content come from? Will you provide text/images, will users enter information, or does the
idea need information from somewhere else?
Everything is entered by the user. No outside information or website is needed.
What does a first-time user see?
The title, the Add Spot form, the filter set to All, and the message “No spots yet. Add your first quiet place
above.” The Clear All Spots button is disabled.
What should the application remember after a refresh, and when should changes be saved?
The saved spots (with their details and favourite marks) and the filter the user last chose. Save whenever
something changes: a spot is added, removed, favourited or unfavourited, the filter changes, or the list is
cleared. After a refresh or reopening the page, the same spots appear with the same favourites and the same
filter selected.
How can users clear the saved information? What should they see afterward and after refreshing again?
With Clear All Spots (F5). Afterward the user sees “No spots yet,” the filter shows All, and after another refresh
the list is still empty.
The final app must remember useful information or preferences. Your developer will plan Local Storage. You
do not need to choose a storage key, write an object, or select an API. If your idea needs outside information,
describe the information and give a source if you know one.

## Source page 7

5 What users see
What sections and controls belong on the page? Where should people enter information and see the results?
From top to bottom: the title “Quiet Place” with a one-line description; the Add Spot form (labelled Place
name, Type, Noise level and Note fields, plus the Add Spot button) with its message area directly below; the
noise-level filter and a short line saying how many spots are shown; the list of spots; and the Clear All Spots
button. Each spot is a card with its name, type, noise level, note, and two buttons: “Favourite” and “Remove.”
What are your visual preferences? Describe colours, mood, or readability preferences, and which choices the
developer can make.
A calm, restful look: soft muted colours such as pale blue, grey or sage green, a lot of white space, and no
flashing or busy effects. The three noise levels each get a text label and a gentle colour badge. The developer
can choose the exact fonts, colours and card style as long as it feels peaceful and easy to read.
How should it work on a phone and a larger screen? Consider readable text, clear labels, keyboard use, and
controls that remain easy to use.
On a phone everything is one column with large tap-friendly buttons, and the buttons can sit below the spot
name. On a larger screen the spots can appear in two or three columns. Every field has a visible text label,
everything can be used with the keyboard (Tab and Enter) with a clearly visible focus outline, and meaning is
never shown by colour alone (noise level and favourites also use words).
What should users see in these situations?
Situation What the user sees
The title, the Add Spot form, the filter set to All, and “No spots yet. Add
Before the first action
your first quiet place above.”
No spots yet” when the list is empty, or “No Silent spots yet. Try another
Nothing has been added or found
filter or add a spot.” when a filter matches nothing.
A short message near the control used (for example “Spot added: Maple
An action succeeds Café back table,” “Added to favourites,” “Spot removed”), and the list
updates right away.
Information is missing or A clear message directly under the form, such as “Please enter a place
something goes wrong name.” The list stays as it was. Messages disappear on the next action.
The app is waiting for Not needed. Everything is stored in the browser and appears instantly,
information, if applicable with no outside source to wait for.
A sketch is optional. Your developer will create wireframes in Milestone 2.

## Source page 8

Before submitting
☐ My purpose and intended users are clear.
☐ I described three to five main features, priorities, optional extras, and exclusions.
☐ Each feature explains what the user does, what happens, and how mistakes are handled.
☐ I included realistic content examples and explained where content comes from.
☐ I explained what is remembered, when it is saved, and what clearing it does.
☐ I described the page, its controls, and the messages users should see.
☐ I reviewed my brief for confusing or missing details during the class activity or an equivalent process.
☐ I replaced placeholders and removed irrelevant prompts and examples.
☐ I checked that the exported PDF is readable and submitted it to Brightspace.
Client participation can be demonstrated through instructor observations or a short dated note about what
you reviewed or improved. No separate technical report is required.
