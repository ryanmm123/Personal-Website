# Copilot / AI Agent Instructions for Personal-Website

Repository snapshot: very small static site. Current files discovered:
- `main.hbs` — top-level Handlebars template (HTML skeleton).
- `README.md` — empty/placeholder.

Quick summary for agents
- This repo currently contains a single Handlebars template (`main.hbs`). There is no detected package manager, build script, or server configuration in the repository root.
- Treat this project as a minimal static website scaffold. Any non-trivial feature work should first add a clear build/runtime config (e.g., `package.json` + build scripts) and document it in `README.md`.

What to edit
- Edit `main.hbs` to change the global HTML skeleton (doctype, `<head>`, meta tags, basic layout). Example: the file begins with `<!DOCTYPE html>` and a basic `<head>` with `charset` and `viewport`.
- If adding new templates/partials, create a `views/` (or `templates/`) directory and follow Handlebars naming conventions. Prefer a `views/partials/` subfolder for partials and include with `{{> partialName }}`.

Project conventions discovered and recommended (do not add unilaterally)
- Keep the top-level layout in `main.hbs`. If you introduce a templating build, use `views/layouts/main.hbs` as the layout and move the current `main.hbs` content there.
- There are no tests or CI config. If you add CI, include a short README section explaining how to run the build and preview the site.

Developer workflows (what we found / what to add)
- No build or run commands are present. Before implementing automated previews, add a `package.json` with scripts like `start` (development server) and `build` (static build). Document the exact commands in `README.md`.
- For quick local previews without adding a build system, a developer can open compiled HTML in a browser or run a simple static server (e.g., `python -m http.server` in the output directory). Document any chosen approach.

Integration points & dependencies
- No external integrations or package manifests detected. If you add dependencies, commit only `package.json` and `package-lock.json` (or equivalent) and list why each dependency is required in `README.md`.

How Copilot / AI agents should behave in this repo
- Preserve the HTML skeleton and meta tags when refactoring layout files (keep `<!DOCTYPE html>` and `lang="en"`).
- When adding new files or directories, update `README.md` with a short note explaining the change and any new scripts.
- Do not add or modify CI/workflow files without the user's explicit request.

Examples from this repo
- `main.hbs` (current layout file): contains the global `<head>` and empty `<body>` where page content will be placed.

If something's missing
- If you need a build tool, propose a minimal `package.json` and show the scripts you will add before applying changes.

Questions for the repo owner
- Do you want a simple Node-based build (Handlebars + express/static) or do you prefer no build system and purely static files?

End of instructions — ask for clarification if any required files are missing.
