# SavageCore Userscripts

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Lint](https://img.shields.io/github/actions/workflow/status/savagecore/userscripts/lint.yml?branch=main&label=lint&style=flat-square)](https://github.com/savagecore/userscripts/actions/workflows/lint.yml)

A collection of small userscripts for various websites.

## Scripts

- [GGn Link Steam](./ggn-link-steam) - Adds a GGn search button to PCGamingWiki, Steam store pages, and SteamDB.
- [SteamGridDB Link](./steamgriddb-link) - Adds a link to SteamGridDB on GGn, PCGamingWiki, Steam store pages, and SteamDB.

## Getting Started

This repository uses a monorepo structure with `vite-plugin-monkey`.

### Prerequisites

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/)

### Common Commands

Refer to the individual script directories for specific instructions. Generally:

```bash
pnpm install       # Install dependencies for all scripts
pnpm run build     # Build all scripts
pnpm run lint      # Lint all scripts
```
