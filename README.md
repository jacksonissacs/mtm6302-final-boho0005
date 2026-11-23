# mtm6302-final-boho0005

## Quiet Place

Developed by Alan Bohore for MTM6302. Students can use the planned app to remember a quiet place, filter by noise, mark favourites, remove one spot or clear their collection. My separate client project is StudyTrack.

## Milestone 2

- [Planning PDF](docs/milestone-2/quiet-place-plan.pdf) and [editable Word plan](docs/milestone-2/quiet-place-plan.docx)
- [Assigned brief, public transcription](docs/milestone-2/assigned-brief.md) and [requirements](docs/milestone-2/requirements.md)
- [Mobile](docs/milestone-2/wireframes/mobile.png), [desktop](docs/milestone-2/wireframes/desktop.png) and [interaction-state sketches](docs/milestone-2/wireframes/interaction-states.png)
- [Planned acceptance tests](docs/milestone-2/acceptance-tests.md) and [communication and decisions](docs/milestone-2/communication-log.md)

The original client PDF is retained privately. The transcription preserves the requirements and omits identifying information.

## Milestone 3 prototype

Open the [interface source](index.html), [stylesheet](css/styles.css), [JavaScript and final implementation plan](js/app.js), [progress note](docs/milestone-3-progress.md) and [verification record](docs/milestone-3-verification.md).

From the repository root, run `python3 -m http.server 8000` and open http://127.0.0.1:8000/. Use **Explore example spots** to inspect the three-card layout. Both views let you add, filter, favourite, remove and clear for the current visit. Refresh resets the prototype. Final-project work includes Local Storage, persistent IDs, storage failure handling and cross-refresh testing.

The app uses HTML, CSS and vanilla JavaScript. It has no production build step, external fonts, image requests or API dependencies. Sample places are adapted from the assigned brief.
