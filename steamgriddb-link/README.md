# SteamGridDB Link

[[Changelog](./CHANGELOG.md)]

Adds a button to PCGamingWiki, Steam store pages, and SteamDB linking directly to the corresponding game on [SteamGridDB](https://www.steamgriddb.com/).

## Features

- **App ID Extraction**: Automatically finds the Steam App ID on the page.
- **SGDB Logic**: Uses the SGDB API to find the exact game page. **An API key is required.**
- **API Key Support**: Set your API key via the userscript manager's menu command. The script will not function without a valid key.

## Installation

1. Install a userscript manager like [Violentmonkey](https://violentmonkey.github.io/), [Greasemonkey](https://www.greasespot.net/), or [ScriptCat](https://scriptcat.org/).
2. Click [**Install**](https://github.com/savagecore/userscripts/raw/main/steamgriddb-link/dist/steamgriddb-link.user.js) to install the built script.

## Configuration

**Note: The script will only add links when an API key is configured.** You can find your API key in your [SteamGridDB Profile Preferences](https://www.steamgriddb.com/profile/preferences/api).

To set your SteamGridDB API key:

1. Open any PCGamingWiki, Steam, or SteamDB page.
2. Open your userscript manager's menu (e.g., click the Violentmonkey icon).
3. Select **"Set SteamGridDB API Key"**.
4. Enter your key and the page will reload.

## Development

```bash
pnpm install
pnpm run dev    # Watch and serve the userscript
pnpm run watch  # Watch and build
pnpm run build  # Build the production userscript
pnpm run lint   # Check formatting
pnpm run lint:fix # Fix formatting
```

## Releasing

To create a new release:

```bash
pnpm version patch --no-git-tag-version
```
