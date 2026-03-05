import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "GGn Link Steam",
        namespace: "https://github.com/savagecore",
        icon: "https://gazellegames.net/favicon.ico",
        match: [
          "*://store.steampowered.com/app/*",
          "*://steamdb.info/app/*",
          "*://www.pcgamingwiki.com/wiki/*",
        ],
        description: "Adds a link to GGn search on Steam store pages",
        author: "savagecore",
        grant: ["GM_addElement"],
        downloadURL:
          "https://github.com/savagecore/userscripts/raw/main/ggn-link-steam/dist/ggn-link-steam.user.js",
        updateURL:
          "https://github.com/savagecore/userscripts/raw/main/ggn-link-steam/dist/ggn-link-steam.user.js",
      },
    }),
  ],
  server: {
    host: "localhost",
  },
});
