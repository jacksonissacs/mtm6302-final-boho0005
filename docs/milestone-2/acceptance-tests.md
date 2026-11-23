# Acceptance and testing plan

Planned for final JavaScript. Record environment, actual result and outcome separately when running a case.

| Test / feature | Start | Action | Expected |
|---|---|---|---|
| T01 · First visit | No project key | Open the app. | All selected, empty message, blank form and disabled clear. |
| T02 · F1 | First visit | Add Library corner / Library / Silent, no note. | One unstarred card, form resets, “Spot added: Library corner”; refresh restores it. |
| T03 · F1 | Type and noise selected | Submit a blank name, then three spaces. | “Please enter a place name.” Inputs and saved list stay intact. |
| T04 · F1 | Name and note entered | Leave type blank, noise blank, then both blank. Submit each. | “Please choose a type and a noise level.” First missing select receives focus. |
| T05 · F1 | Required selects chosen | Try 49, 50 and 51 ASCII characters for name; 99, 100 and 101 for note. | Values at/below limits accepted; excess blocked or rejected. No overlong stored field. |
| T06 · F1 | One Garden bench | Add a second Garden bench with a different note. Submit again after reset. | Two independent IDs. Empty resubmission adds nothing. |
| T07 · F2 | One of each noise level | Select Silent, Quiet, Moderate, All; repeat All. | Counts 1, 1, 1, 3. Only matching cards visible. Same selection has no effect. |
| T08 · F2 | Only a Quiet spot exists | Select Silent, refresh, then All. | Zero Silent matches; helpful hint; filter restored; All reveals original spot. |
| T09 · F3 | Two ordinary spots A then B | Favourite B twice, once to select and once to deselect. | B rises with star, Favourite text and Favourited button; second click removes star and restores order. Both messages appear near B. |
| T10 · F3 | Two duplicate names | Star only the second duplicate; refresh. | Its persistent ID alone is starred; favourite precedes other duplicate. |
| T11 · F4 | Two duplicate names | Remove one, verify name prompt, confirm. | Only its ID disappears. Counter updates, “Spot removed”, deletion survives refresh. |
| T12 · F4 | Populated filtered list | Open Remove; try Cancel and Escape separately. | Same IDs, filter and stored value. Focus returns to original Remove. |
| T13 · F4 | One remaining spot | Remove and confirm. | Global empty message appears; clear disabled; reload stays empty. |
| T14 · F5 | Filtered list with one favourite | Open Clear All Spots; cancel. | Records, star, filter and storage unchanged. Focus returns to clear. |
| T15 · F5 | Hidden spots and unrelated storage key | Confirm Clear All Spots then refresh. | All spots cleared; All selected; key removed, unrelated key intact. Empty after refresh. |
| T16 · Storage | A favourite with note; Quiet filter | Reload, close and reopen same site. | Same IDs, data, stars, order and selected filter. Feedback does not persist. |
| T17 · Recovery | Invalid JSON, then invalid shape or duplicate IDs | Reload each case. | Start empty/All with recovery message. No crash; later valid add can restore normal saving. |
| T18 · Keyboard | Populated list | Use Tab/Shift+Tab, Enter/Space, Escape; confirm and cancel separately. | Visible focus for every action. Dialog confines focus, cancellation restores trigger and removal moves focus logically. |
| T19 · Layout | Long name and note | Inspect 320, 375, 768 and 1440 px. | No horizontal scrolling, readable labels, wrapped text, one phone column and adaptable wider cards. |
| T20 · Failure | Storage write unavailable | Try add and confirmed clear. | Show storage problem, preserve previous saved state and entered values; no false success. |
| T21 · F1/F2 | Filter Silent with one Silent spot | Add a Moderate spot. | Keep Silent, report successful add by name. Newly added spot can be found under All. |
| T22 · F2/F5 | At least one saved spot but zero current matches | Open Clear All from zero-match view; confirm. | Enabled before confirmation. All records cleared, filter All and disabled afterwards. |
| T23 · QA | After a fix and after publishing | Repeat affected cases and adjacent flows locally and on Pages. | Record actual results per URL/build; failures remain open until rerun succeeds. |
