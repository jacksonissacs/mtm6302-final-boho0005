# Prototype verification

**Build:** [be6705d](https://github.com/jacksonissacs/mtm6302-final-boho0005/commit/be6705df582b7406d80aad50ab2204283a350b20). On November 23, 2026, Chrome 157 tested the checked-in site on a loopback HTTP server in [GitHub Actions run 45259855676](https://github.com/jacksonissacs/mtm6302-final-boho0005/actions/runs/45259855676). The desktop workspace restricted listening on a local port, so the automated local-server results below come from the hosted runner. The developer also inspected the actual GitHub Pages site in desktop Chrome.

## Responsive inspection

| Requested viewport | Card columns | Horizontal overflow | Smallest measured control height | Screenshot |
|---|---:|---|---:|---|
| 320 px | 1 | None | 44 px | [320 px](screenshots/populated-320.jpg) |
| 375 px | 1 | None | 44 px | [375 px](screenshots/populated-375.jpg) |
| 768 px | 2 | None | 44 px | [768 px](screenshots/populated-768.jpg) |
| 1440 px | 3 | None | 44 px | [1440 px](screenshots/populated-1440.jpg) |

A source-colour check of 14 active text/background pairs found a minimum contrast of 5.45:1 (placeholder text on white). The four example views had visible labels on every control, CSS grid applied and no overflowing cards. The scripted run recorded no browser or request errors. The screenshots show actual rendered states. All viewport values and assertions are in [results.json](screenshots/results.json). Site typography and decoration use CSS and system fonts.

## Inspect the 15 required states

| State | Action or condition | Evidence |
|---|---|---|
| 1. Empty | Open the regular entry page. | [First visit](screenshots/01-first-visit.jpg) |
| 2. Populated | Follow Explore example spots. | [Three examples](screenshots/populated-1440.jpg) |
| 3. Addition succeeded | Add Reading room, Library, Silent. | [Form confirmation](screenshots/05-spot-added.jpg) |
| 4. Name missing | Submit spaces and preserve the note. | [Name error](screenshots/03-missing-name.jpg) |
| 5. Selection missing | Enter a name and leave the selects blank. | [Selection error](screenshots/04-missing-selections.jpg) |
| 6. No matching results | Choose Moderate when only Silent and Quiet exist. | [Empty filter result](screenshots/06-no-matches.jpg) |
| 7. Favourite selected | Star the second of two same-name cards. | [Star and moved card](screenshots/07-favourite-selected.jpg) |
| 8. Favourite deselected | Toggle the same card again. | [Restored order](screenshots/08-favourite-deselected.jpg) |
| 9. Remove confirmation | Click Remove on a card. | [Named prompt](screenshots/09-remove-confirmation.jpg) |
| 10. Removal cancelled | Press Escape. | [Both cards remain](screenshots/10-remove-cancelled.jpg) |
| 11. Spot removed | Confirm removal of one duplicate. | [Surviving sibling](screenshots/11-spot-removed.jpg) |
| 12. Clear confirmation | Click Clear All Spots with a zero-match filter. | [Clear prompt](screenshots/12-clear-confirmation.jpg) |
| 13. Clear cancelled | Choose Cancel. | [Filter retained](screenshots/13-clear-cancelled.jpg) |
| 14. All spots cleared | Confirm clearing. | [Success and All](screenshots/14-all-cleared.jpg) |
| 15. Clear disabled | Inspect first visit or the just-cleared state. | [Disabled Clear](screenshots/14-all-cleared.jpg) |

The test followed Tab from the skip link through the example link to Place name, measured the visible focus outline and checked focus restoration after modal cancellation. It also checked optional notes, missing inputs, distinct IDs for duplicate names, star toggling, maximum length inputs and refresh resetting the session. See the [keyboard focus screenshot](screenshots/02-keyboard-focus.jpg) and [test source](../qa/browser.cjs).

## Published checks

GitHub Pages deployed from main at the repository root. The [published homepage](https://jacksonissacs.github.io/mtm6302-final-boho0005/) opened empty with Clear disabled. The example route displayed three cards, and selecting Silent displayed only the library card. Star toggling updated its label and message. Single-remove confirmation named the card and Cancel returned to the list. A blank submission showed the name error. Adding Review corner created one card, and confirmed clearing reported success, zero spots and a disabled Clear control.

Chrome showed the same 1 / 1 / 2 / 3 column pattern across the four requested viewport settings. At each setting the document scroll width equalled its available client width. No console errors or warnings appeared in the published review. The loaded layout and functioning controls verified the relative CSS and JavaScript assets on the deployed project path.

## Reproduce

From the repository root, run `python3 -m http.server 8000` and open http://127.0.0.1:8000/. The GitHub Actions workflow installs a test-only Playwright driver and runs the suite against that server. The application itself needs no packages. Persistence, malformed saved data, storage reset and write failures belong to final-project testing. No client acceptance result is recorded.
