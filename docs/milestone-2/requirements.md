# Quiet Place requirements and scope

Students record quiet places as they find them, then use a noise filter to choose where to study, read or recharge. A student with a free hour can find a silent library corner and still keep a moderate café for another day.

Required: F1–F5 and restoration of records, favourites and filter. Optional: search by name, a random pick from current matches and a separate top-of-page total. The matching count is required. Excluded: maps, GPS, directions, accounts, sharing, reviews, photos, live noise readings, editing and remote services.

| Feature | Input or condition | Observable result |
|---|---|---|
| F1 · Add | Name (1–50, nonblank), type, noise and optional note (0–100). Two records may have the same name. | One new unstarred card, reset fields and “Spot added: [place name]”. |
| F2 · Filter | Choose All, Silent, Quiet or Moderate. Remember the latest selection. | Matching count and cards update immediately. A zero-match message retains the filter. |
| F3 · Favourite | Toggle one stable ID. Keep the mark after reopening. | Star, word Favourite and Favourited button on selection. Favourites rise to the top. |
| F4 · Remove | Confirm the name of one record or cancel. | Only its card disappears on confirmation. Report “Spot removed”. |
| F5 · Clear | Confirm clearing all saved spots or cancel. | Empty view, All filter, disabled clear control and “All spots cleared”, including after refresh. |

| Feature | Tasks | Dependency |
|---|---|---|
| F1 | Build labelled controls → trim and validate → allocate ID → append → render and reset → persist. | Field enums and ID rules |
| F2 | Read one filter → derive matching records → count → render the correct empty state → persist preference. | Canonical collection and display routine |
| F3 | Find record by ID → flip boolean → order displayed copy → announce near its button → persist. | F1 identifiers and F2 rendering |
| F4 | Capture ID → ask confirmation → remove matching ID → update count and focus → persist. | Reusable confirmation and rendering |
| F5 | Check total → confirm → reset records and filter → erase only the project key → render and announce. | F4 confirmation and storage key |

Confirmations and open design questions are in [the decision log](communication-log.md).
