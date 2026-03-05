import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "SteamGridDB Link",
        namespace: "https://github.com/savagecore",
        icon: "https://www.steamgriddb.com/static/img/logo-512.png",
        match: [
          "*://gazellegames.net/torrents.php*",
          "*://store.steampowered.com/app/*",
          "*://steamdb.info/app/*",
          "*://www.pcgamingwiki.com/wiki/*",
        ],
        description:
          "Adds a link to SteamGridDB on Steam store pages, SteamDB, PCGamingWiki, and GGn",
        author: "savagecore",
        grant: [
          "GM_setValue",
          "GM_getValue",
          "GM_registerMenuCommand",
          "GM_xmlhttpRequest",
        ],
        connect: ["www.steamgriddb.com"],
        downloadURL:
          "https://github.com/savagecore/userscripts/raw/main/steamgriddb-link/dist/steamgriddb-link.user.js",
        updateURL:
          "https://github.com/savagecore/userscripts/raw/main/steamgriddb-link/dist/steamgriddb-link.user.js",
      },
    }),
  ],
  server: {
    host: "localhost",
  },
});
