// Run with a separate test-only installation of playwright-core and Chrome.
// Usage: BASE_URL=http://127.0.0.1:8000/ node qa/browser.cjs
const { chromium } = require("playwright-core");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const base = process.env.BASE_URL || "http://127.0.0.1:8000/";
const output = process.env.EVIDENCE_DIR || "docs/screenshots";
async function main() {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  const responses = new Map();
  const passed = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("requestfailed", r => errors.push(r.url() + " failed"));
  page.on("response", r => responses.set(new URL(r.url()).pathname, r.status()));
  const q = s => page.locator(s);
  const count = () => q("#spots .card").count();
  const record = s => { passed.push(s); console.log("PASS", s); };
  const text = async (sel, expected) => assert.equal(await q(sel).innerText(), expected);
  const shot = async (name, region) => {
    const opts = { path: path.join(output, name + ".jpg"), quality: 80 };
    if (region) await q(region).screenshot(opts);
    else await page.screenshot({ ...opts, fullPage: true });
  };
  const add = async (name, type, noise, note = "") => {
    await q("#name").fill(name);
    await q("#type").selectOption(type);
    await q("#noise").selectOption(noise);
    await q("#note").fill(note);
    await q(".primary").click();
  };
  const verifyFocus = async sel => assert.equal(await q(sel).evaluate(e => e === document.activeElement), true);
  try {
    await page.goto(base);
    assert.equal(await count(), 0); assert.equal(await q("#clear").isDisabled(), true);
    assert.equal(await q("#filter").inputValue(), "All");
    for (const id of ["type", "noise"]) assert.equal(await q("#" + id).inputValue(), "");
    await shot("01-first-visit");
    record("Clean first visit, blank selections, empty message and disabled Clear All Spots.");
    await page.keyboard.press("Tab"); await verifyFocus(".skip");
    await page.keyboard.press("Tab"); await verifyFocus("#example-link");
    await page.keyboard.press("Tab"); await verifyFocus("#name");
    assert.ok(await q("#name").evaluate(e => parseFloat(getComputedStyle(e).outlineWidth) >= 2));
    await shot("02-keyboard-focus", ".entry");
    await add("   ", "Library", "Silent", "Keep my note");
    await text("#form-message", "Please enter a place name.");
    assert.equal(await q("#note").inputValue(), "Keep my note"); await verifyFocus("#name");
    assert.equal(await count(), 0);
    await shot("03-missing-name", ".entry");
    await add("Reading room", "", "", "Keep my note");
    await text("#form-message", "Please choose a type and a noise level."); await verifyFocus("#type");
    assert.equal(await count(), 0);
    await shot("04-missing-selections", ".entry");
    record("Keyboard tab order, focus indicator, invalid-name and invalid-selection messages, retained values.");
    await add("  Reading room  ", "Library", "Silent");
    await text("#form-message", "Spot added: Reading room");
    assert.equal(await q("#name").inputValue(), "");
    assert.equal(await count(), 1);
    await shot("05-spot-added", ".entry");
    await add("Reading room", "Other", "Quiet", "Same name, another place");
    assert.equal(await count(), 2);
    const ids = await q(".card").evaluateAll(cards => cards.map(c => c.dataset.id));
    assert.equal(new Set(ids).size, 2);
    for (const [level, expected] of [["Silent",1],["Quiet",1],["Moderate",0],["All",2]]) {
      await q("#filter").selectOption(level); assert.equal(await count(), expected);
      if (!expected) {
        await text("#empty p", "No Moderate spots yet. Try another filter or add a spot.");
        assert.equal(await q("#clear").isEnabled(), true);
        await shot("06-no-matches", ".collection");
      }
    }
    record("Trimmed valid add, optional note, form reset, duplicate IDs and all noise filters.");
    const second = '.card[data-id="' + ids[1] + '"]';
    const fav = second + ' [data-action="favourite"]';
    await q(fav).click(); await text(second + " .card-message", "Added to favourites");
    assert.equal(await q(".card").first().getAttribute("data-id"), ids[1]);
    assert.equal(await q(fav).getAttribute("aria-pressed"), "true"); await verifyFocus(fav);
    await shot("07-favourite-selected", ".collection");
    await q(fav).click(); await text(second + " .card-message", "Removed from favourites");
    assert.equal(await q(".card").first().getAttribute("data-id"), ids[0]); await verifyFocus(fav);
    await shot("08-favourite-deselected", ".collection");
    record("Favourite on/off by ID, stable ordering, star, label, status and restored focus.");
    const remove = second + ' [data-action="remove"]';
    await q(remove).click(); await text("#dialog-message", "Remove Reading room? This cannot be undone.");
    await verifyFocus('dialog [value="cancel"]');
    await shot("09-remove-confirmation", "dialog");
    await page.keyboard.press("Escape"); await q("dialog").waitFor({state:"hidden"});
    await page.getByText("Removal cancelled.", {exact:true}).waitFor();
    await verifyFocus(remove); assert.equal(await count(), 2);
    await shot("10-remove-cancelled", ".collection");
    await q(remove).click(); await q("#confirm-action").click();
    await page.getByText("Spot removed", {exact:true}).waitFor();
    assert.equal(await count(), 1);assert.equal(await q(".card").first().getAttribute("data-id"), ids[0]);
    await shot("11-spot-removed", ".collection");
    record("Named removal prompt, Escape cancellation, focus return and deletion of one duplicate only.");
    await q("#filter").selectOption("Quiet");
    await q("#clear").click(); await text("#dialog-message","Remove all saved spots? This cannot be undone.");
    await shot("12-clear-confirmation", "dialog");
    await q('dialog [value="cancel"]').click();await page.getByText("Clear cancelled.",{exact:true}).waitFor();
    await verifyFocus("#clear"); assert.equal(await q("#filter").inputValue(), "Quiet");
    assert.equal(await q("#clear").isEnabled(), true);
    await shot("13-clear-cancelled", ".collection");
    await q("#clear").click();await q("#confirm-action").click();
    await page.getByText("All spots cleared",{exact:true}).waitFor();
    assert.equal(await q("#filter").inputValue(),"All");assert.equal(await q("#clear").isDisabled(), true);
    await shot("14-all-cleared", ".collection");
    record("Clear cancellation retains the filter and collection; confirmed clear resets All and disables the button.");
    await add("A".repeat(50), "Café", "Moderate", "B".repeat(100));
    assert.equal(await q(".card h3").innerText(),"A".repeat(50));
    assert.equal(await q(".card .note").innerText(),"B".repeat(100));
    await page.reload();assert.equal(await count(), 0);
    record("Accepted boundary inputs; refreshing the session-only prototype returns to empty.");
    await q("#example-link").click(); await text("#mode-label","Example collection · Changes reset on refresh.");
    assert.equal(await count(),3);
    const metrics = [];
    for (const width of [320,375,768,1440]) {
      await page.setViewportSize({width,height:width<500?812:1000});
      const m=await page.evaluate(() => {
        const $=s=>document.querySelector(s);
        const cards=Array.from(document.querySelectorAll(".card"));
        return { width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
          columns:new Set(cards.map(x=>Math.round(x.getBoundingClientRect().x))).size,
          missingLabels:Array.from(document.querySelectorAll("main input, main select, main textarea")).filter(x=>!x.labels.length).length,
          minControlHeight:Math.min(...Array.from(document.querySelectorAll("main button, main select, main input, main textarea")).map(x=>x.getBoundingClientRect().height)),
          cardOverflow:cards.some(c=>c.scrollWidth>c.clientWidth+1),
          cssLoaded:getComputedStyle($(".cards")).display==="grid" };
      });metrics.push(m);
      assert.equal(m.scrollWidth,m.width);assert.equal(m.cardOverflow,false);assert.equal(m.missingLabels,0);
      assert.ok(m.minControlHeight>=44);assert.equal(m.cssLoaded,true);
      if(width<500) assert.equal(m.columns,1);else assert.ok(m.columns>=2);
      await shot("populated-"+width);
    }
    for(const [url,status] of responses) assert.ok(status>=200 && status<400,url+" returned "+status);
    for(const asset of ["css/styles.css","js/app.js"]) assert.ok([...responses.keys()].some(x=>x.endsWith("/"+asset)),asset);
    assert.deepEqual(errors,[]);
    record("Example collection at 320, 375, 768 and 1440 px, labels, touch targets, card wrapping and loaded assets; no browser errors.");
    await fs.writeFile(path.join(output,"results.json"),JSON.stringify({testedAt:new Date().toISOString(),base,build:process.env.GITHUB_SHA||null,chrome:browser.version(),passed,metrics,errors},null,2)+"\n");
  } finally { await browser.close(); }
}
main().catch(error => {console.error(error);process.exitCode=1;});
