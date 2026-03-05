# GGn Link Steam

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Lint](https://img.shields.io/github/actions/workflow/status/savagecore/userscripts/lint.yml?branch=main&label=lint&style=flat-square)](https://github.com/savagecore/userscripts/actions/workflows/lint.yml)

[[Changelog](./CHANGELOG.md)]

Adds a button to PCGamingWiki, Steam store pages, and SteamDB linking directly to a GazelleGames (GGn) search for the current game.

- **App Name**: Extracted from the URL.
- **Release Year**: Extracted from the Steam store date element.
- **Styling**: Mimics native Steam store buttons.
- **Icon**: Uses the GGn favicon.

## Installation

1. Install a userscript manager like [Violentmonkey](https://violentmonkey.github.io/), [Greasemonkey](https://www.greasespot.net/), or [ScriptCat](https://scriptcat.org/).
2. Click [**Install**](https://github.com/savagecore/userscripts/raw/main/ggn-link-steam/dist/ggn-link-steam.user.js) to install the built script.

## Development

```bash
pnpm install
pnpm run dev    # Watch and serve the userscript (may hit CSP issues)
pnpm run watch  # Watch and build (alternative for CSP issues)
pnpm run build  # Build the production userscript
pnpm run fix    # Lint and format the code
```

## Releasing

To create a new release (bump version and update built script):

```bash
pnpm version patch --no-git-tag-version # or minor, or major
```

The version bump will automatically trigger a build, ensuring `dist/ggn-link-steam.user.js` is updated.
