// ==UserScript==
// @name         GGn Link Steam
// @namespace    https://github.com/savagecore
// @version      0.0.0
// @author       savagecore
// @description  Adds a link to GGn search on Steam store pages
// @icon         https://gazellegames.net/favicon.ico
// @downloadURL  https://github.com/savagecore/userscripts/raw/main/ggn-link-steam/dist/ggn-link-steam.user.js
// @updateURL    https://github.com/savagecore/userscripts/raw/main/ggn-link-steam/dist/ggn-link-steam.user.js
// @match        *://store.steampowered.com/app/*
// @match        *://steamdb.info/app/*
// @match        *://www.pcgamingwiki.com/wiki/*
// @grant        GM_addElement
// ==/UserScript==

(function () {
  'use strict';

  const GGN_ICON = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAsJxhHLBFOLQY5JwI5Lxc3JRRDLBY5Jwo0KBA+KRM+IgpFKxM9Kw5DMA87Jgs7Jhc+JRtGLhJCJgc9IxP/9vT49vb38vH/9/j//un49vX2+/7y9PX///44JBJEKAo5KBNjQBVNPRlLQCJUPhtcQRxTQhtVRSFXPBpoQRpNOx5NPh1XQR1RNBlrRCRoQRVXPhRjRiFbQjJbRjdhSipyWDNwVDyFZ0yJZjqQbUWJaDqNc0V1WzNqTzRVRTlOQjhdRytQPyxiQyxcPiV/cV6gnpamoKGhlZGqoI+Ze0qsilyIem6ZlZS1qZeWm5qHjZhjRy9cQylYRSKel362s6uQgm+LdEapnXueoqexlFu2nHiyqqukmI6EYzJ3ZEG0rqeEZE1nQCpvX1Our7OPgoSKZkisgEq2noC4tcS0nnW7t6yzrqWbflmQb0JzYUq9tKtpXlZeRyeFdWnezsKAbUqBcU3Bu7TJzNHIzMbUrHjV0sO0poKkgEqsoZnLy9nZzcNxZ1VbPy6Oe3Pn3NhtYFKFbEqjg06xj1O8nGHJqXTc3NCspZSffkyPcUJuWTliTClcRSVbRSJ9blT37dykk36AYj+cdESwg1C5jl2zi1v25tnSwraXc0+IYTpqTzVmSzZiQiVhQyZROSXFt6v16d2woY50YUaMe2HFt6CdgFTGuKH58+jJuaJ1WjhkVUKck4ZpUzdmRCxbQTBSQDW/s6n/+ev///H///TDwrSFbER6Z0a3saT48eD//+X//+7f3dVjTjJcRiNcSClYRSpUPyRhRixyVDlyUTd3VjyEXjuFXzxpUT1ZRDVsTC9UPCpSQDVpRylYQSdYQSddRCpfRixjSC1gRSpjRylrTi9pSilrSyhiRyxcRCxhRitbQy1YQCxeQiRlRjddPCxiRTBXPylNOiVTRS9SRi5TRixaSCtWRSphSipaRSVSQitXRitbRidUQyhdRSldQSJkRSRpSilhQyZiRSpgQiVlQyVeQy5UOytoRSRmQR9cRDJeQCdkPx1eRTEAAFxBAAAgVAAAaG4AAG9nAABzXAAASS4AAEVcAAByZQAAdGEAAGM7AABcUAAAZ3IAACBGAABlcwAAeDgAAFxT";
  const addGgnLink = () => {
    const host = window.location.hostname;
    const configs = {
      "store.steampowered.com": {
        appName: () => {
          const dlcPage = document.querySelector(
            "div.game_area_bubble.game_area_dlc_bubble"
          );
          const pageUrl = dlcPage?.querySelector("div > p > a")?.getAttribute("href") ?? window.location.href;
          let name = document.querySelector("#appHubAppName")?.textContent?.trim() || "";
          if (!name) {
            const match = pageUrl.match(/\/app\/\d+\/([^/]+)/);
            if (match) name = decodeURIComponent(match[1]);
          }
          return name;
        },
        year: () => {
          const text = document.querySelector("#genresAndManufacturer")?.innerText || "";
          const rel = text.match(/Release Date:\s*[\s\S]*?(\d{4})/i)?.[1];
          const ea = text.match(
            /Early Access Release Date:\s*[\s\S]*?(\d{4})/i
          )?.[1];
          if (ea && rel && ea !== rel) return `${ea}-${rel}`;
          return rel || ea || document.querySelector(".date")?.textContent?.match(/\d{4}/)?.[0] || "";
        },
        insertBefore: () => document.querySelector(".apphub_OtherSiteInfo")?.firstElementChild || null,
        buttonClass: "btnv6_blue_hoverfade btn_medium",
        tooltipAttr: "data-tooltip-text",
        extraStyles: (btn2) => {
          btn2.style.marginRight = "0.28em";
        }
      },
      "steamdb.info": {
        appName: () => document.querySelector("h1")?.textContent?.trim() || "",
        year: () => Array.from(document.querySelectorAll("td")).find((td) => td.textContent?.includes("Release Date"))?.nextElementSibling?.textContent?.match(/\d{4}/)?.[0] || "",
        insertBefore: () => {
          const rin = document.querySelector('a[href*="cs.rin.ru"]');
          return rin ? rin.nextElementSibling : document.querySelector(".app-links")?.firstElementChild || null;
        },
        buttonClass: "btn tooltipped tooltipped-s",
        tooltipAttr: "aria-label",
        extraStyles: (btn2, img2) => {
          btn2.style.marginRight = "0.28em";
          img2.style.width = "16px";
          img2.style.height = "16px";
        }
      },
      "www.pcgamingwiki.com": {
        appName: () => {
          const title = document.querySelector(".article-title");
          let name = title?.textContent?.trim() || "";
          name = name.split("[")[0].trim();
          return name || document.title.replace(" - PCGamingWiki", "").trim();
        },
        year: () => {
          const infoCells = Array.from(
            document.querySelectorAll(".template-infobox-info")
          );
          for (const cell of infoCells) {
            const text = cell.textContent || "";
            const match = text.match(/\d{4}/);
            if (match) return match[0];
          }
          return "";
        },
        insertBefore: () => {
          const rin = document.querySelector(
            '.template-infobox-icons a[href*="cs.rin.ru"]'
          );
          return rin ? rin.nextElementSibling : document.querySelector(".template-infobox-icons")?.firstElementChild || null;
        },
        buttonClass: "svg-icon template-infobox-icon",
        tooltipAttr: "title"
      }
    };
    const findConfig = () => {
      if (configs[host]) return configs[host];
      const entry = Object.entries(configs).find(([key]) => host.includes(key));
      return entry ? entry[1] : null;
    };
    const config = findConfig();
    if (!config) return;
    const appName = config.appName();
    if (!appName) return;
    const year = config.year();
    const searchUrl = `https://gazellegames.net/torrents.php?artistname=&action=advanced&groupname=${encodeURIComponent(appName)}&year=${year}&order_by=relevance&order_way=desc&empty_groups=both#search_box`;
    const btn = document.createElement("a");
    btn.href = searchUrl;
    btn.target = "_blank";
    btn.className = config.buttonClass;
    const span = document.createElement("span");
    span.setAttribute(config.tooltipAttr, "View on GGn");
    const img = document.createElement("img");
    img.src = GGN_ICON;
    img.className = "ico16";
    img.style.verticalAlign = "middle";
    if (config.extraStyles) config.extraStyles(btn, img);
    span.appendChild(img);
    btn.appendChild(span);
    const target = config.insertBefore();
    if (target) {
      target.insertAdjacentElement("beforebegin", btn);
    } else if (host.includes("steampowered.com")) {
      const parent = document.querySelector(".apphub_OtherSiteInfo");
      if (parent) parent.appendChild(btn);
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addGgnLink);
  } else {
    addGgnLink();
  }

})();