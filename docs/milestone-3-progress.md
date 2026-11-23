# Milestone 3 progress

Quiet Place is an interactive, session-only prototype. The regular entry page opens empty with All selected. The labelled example collection lives at the same page with `?view=examples`. It starts with three illustrative records. Refresh resets each view. Both use the same form, rendering code and event handlers.

## What is implemented

| Feature | Prototype behaviour | Final work |
|---|---|---|
| F1 Add | Checks fields and lengths, allows duplicate names, creates an unstarred card and resets on success. | Generate a persistent ID and commit a successful storage write before clearing the form. |
| F2 Filter | Shows matching cards and counts, preserves other records and distinguishes no matches from an empty collection. | Save and restore the selected filter on startup. |
| F3 Favourite | Changes one record by ID, updates the star, word and button state, then sorts favourites first. | Persist the flag and verify ordering after refresh. |
| F4 Remove | Names the target in a confirmation, supports cancellation and removes one record on confirmation. | Persist the change and test recovery after a failed write. |
| F5 Clear | Works even when nothing matches a filter. Confirmation resets All and disables Clear. Cancellation preserves the collection. | Remove only the project key and verify unrelated storage survives. |

## Interface decisions

The form stays above the collection, as drawn. On tablets the name occupies a full row and the two selections share the next row. At phone widths all fields stack. On wide screens the grid can show three cards. The extra example link lets reviewers inspect a populated layout without seeding the regular entry screen. A brief session notice explains refresh behaviour.

Labels remain visible, noise badges include words and favourites combine a star with a text label. Actions use native buttons, a labelled select or the form submit event. The modal focuses Cancel first and Escape cancels. A successful removal restores focus to a surviving Remove button or the results heading.

## Final implementation order

1. Implement storage validation, missing/malformed state recovery and stable UUIDs. Keep demonstration data isolated.
2. Connect F1 and startup restoration. Test a vertical slice by adding one record and reopening the same URL.
3. Persist F2 and F3. Test a filtered, favourited duplicate after a reload.
4. Persist F4 and F5, preserve unrelated storage, and show recoverable errors on failed writes.
5. Execute the final acceptance plan, repeat it on Pages, obtain client feedback and complete the course reflection.

The precise steps appear in [the linked script](../js/app.js). The [verification record](milestone-3-verification.md) distinguishes checks actually run from final acceptance testing. The [communication log](milestone-2/communication-log.md) records the open questions. Outreach awaits owner approval.

## Inspection outcome

Chrome passed eight groups of browser assertions against the hosted runner’s local development server, including all five required interactions during a visit. The public site also passed first-visit, form, filter, favourite, confirmation and responsive checks at four widths. Full results, limitations and 18 screenshots are in the verification record.
