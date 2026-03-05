// ==UserScript==
// @name         SteamGridDB Link
// @namespace    https://github.com/savagecore
// @version      0.1.0
// @author       savagecore
// @description  Adds a link to SteamGridDB on Steam store pages, SteamDB, PCGamingWiki, and GGn
// @icon         https://www.steamgriddb.com/static/img/logo-512.png
// @downloadURL  https://github.com/savagecore/userscripts/raw/main/steamgriddb-link/dist/steamgriddb-link.user.js
// @updateURL    https://github.com/savagecore/userscripts/raw/main/steamgriddb-link/dist/steamgriddb-link.user.js
// @match        *://gazellegames.net/torrents.php*
// @match        *://store.steampowered.com/app/*
// @match        *://steamdb.info/app/*
// @match        *://www.pcgamingwiki.com/wiki/*
// @connect      www.steamgriddb.com
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const SGDB_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAALVBMVEUlKzA6bpIwW3lHh7RftPAkJihOlMRUntMiHx0fFgsrRlkwUWhGfKNkvv0eEAAeEObfAAABOUlEQVR4nO3dSQqDQBCGUTMZp3j/42aZdiMODVKp927wf6sCoW0aAAAAAAAAAAAAAAAAAAAAAAAA/sgrnMr779EMdQsIcPWe3QQQQAABBEgdoCvUDvAIpj1fIHaAhwACCCCAAJkDzKePgpUA7wCm0qECKwGewXx6AQQQQAABBMgbYD7y/WhjgHcbwDAWthbYGKC9RSOAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAFkDDKWEARYPKnYZA5QEEEAAAQRIHaBNHmB5Fn7yBVhcRXPGAKVeAAEEEECA1AEKGQM0/c88XL1nt8rvT49X79lNAAEEEEAAAfIGmGr/kCqcuvsBAAAAAAAAAAAAAAAAAAAAAAC41hcOlaQLJD9URwAAAABJRU5ErkJggg==";
  const configs = [
    {
      hostname: "gazellegames.net",
      getAppId: () => {
        const steamLink = document.querySelector(
          'a[href*="store.steampowered.com/app/"]'
        );
        if (steamLink) {
          const match = steamLink.href.match(/\/app\/(\d+)/);
          if (match) return match[1];
        }
        return null;
      },
      inject: (link) => {
        const container = document.querySelector("#weblinksdiv .body");
        if (container) {
          console.log("[SGDB Link] Injecting link on GGn");
          const a = document.createElement("a");
          a.href = link;
          a.title = "SteamGridDB";
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          const div = document.createElement("div");
          div.className = "weblinks tilt";
          div.style.backgroundImage = `url(${SGDB_ICON})`;
          div.style.backgroundSize = "48px";
          div.style.backgroundRepeat = "no-repeat";
          div.style.backgroundPosition = "center";
          div.style.width = "48px";
          div.style.height = "48px";
          a.appendChild(div);
          container.appendChild(a);
        }
      }
    },
    {
      hostname: "www.pcgamingwiki.com",
      getAppId: () => {
        const steamLinks = document.querySelectorAll(
          'a[href*="store.steampowered.com/app/"]'
        );
        for (const link of steamLinks) {
          const match = link.href.match(/\/app\/(\d+)/);
          if (match) return match[1];
        }
        return null;
      },
      inject: (link) => {
        const container = document.querySelector(".template-infobox-icons");
        if (container) {
          console.log("[SGDB Link] Injecting link on PCGamingWiki");
          const btn = document.createElement("a");
          btn.href = link;
          btn.target = "_blank";
          btn.className = "svg-icon template-infobox-icon";
          btn.title = "View on SteamGridDB";
          const span = document.createElement("span");
          const img = document.createElement("img");
          img.className = "ico16";
          img.src = SGDB_ICON;
          img.style.width = "16px";
          img.style.height = "16px";
          span.appendChild(img);
          btn.appendChild(span);
          container.appendChild(btn);
        }
      }
    },
    {
      hostname: "store.steampowered.com",
      getAppId: () => {
        const match = window.location.pathname.match(/\/app\/(\d+)/);
        return match ? match[1] : null;
      },
      inject: (link) => {
        const container = document.querySelector(".apphub_OtherSiteInfo");
        if (container) {
          console.log(
            "[SGDB Link] Injecting link before Community Hub on Steam Store"
          );
          const btn = document.createElement("a");
          btn.href = link;
          btn.target = "_blank";
          btn.className = "btnv6_blue_hoverfade btn_medium";
          btn.style.marginRight = "0.28em";
          btn.style.height = "30px";
          btn.style.display = "inline-flex";
          btn.style.alignItems = "center";
          btn.style.justifyContent = "center";
          btn.style.verticalAlign = "top";
          const span = document.createElement("span");
          span.style.padding = "0 15px";
          span.style.display = "flex";
          span.style.alignItems = "center";
          span.style.justifyContent = "center";
          span.setAttribute("data-tooltip-text", "View on SteamGridDB");
          const img = document.createElement("img");
          img.src = SGDB_ICON;
          img.style.width = "16px";
          img.style.height = "16px";
          img.style.verticalAlign = "middle";
          span.appendChild(img);
          btn.appendChild(span);
          const communityHub = document.querySelector(
            'a.btn_medium[href*="steamcommunity.com/app/"]'
          );
          if (communityHub) {
            communityHub.insertAdjacentElement("beforebegin", btn);
          } else {
            container.appendChild(btn);
          }
        }
      }
    },
    {
      hostname: "steamdb.info",
      getAppId: () => {
        const rows = document.querySelectorAll(".table-bordered tr");
        for (const row of rows) {
          if (row.textContent?.includes("App ID")) {
            const cells = row.querySelectorAll("td");
            if (cells.length >= 2) {
              return cells[1].textContent?.trim() || null;
            }
          }
        }
        return null;
      },
      inject: (link) => {
        const container = document.querySelector("nav.app-links");
        if (container) {
          console.log("[SGDB Link] Injecting link on SteamDB");
          const btn = document.createElement("a");
          btn.href = link;
          btn.target = "_blank";
          btn.className = "btn tooltipped tooltipped-n";
          btn.setAttribute("aria-label", "View on SteamGridDB");
          const span = document.createElement("span");
          const img = document.createElement("img");
          img.className = "ico16";
          img.src = SGDB_ICON;
          img.style.width = "16px";
          img.style.height = "16px";
          span.appendChild(img);
          btn.appendChild(span);
          container.insertAdjacentElement("afterbegin", btn);
        }
      }
    }
  ];
  async function getSgdbLink(appId) {
    const apiKey = _GM_getValue("sgdb_api_key");
    if (!apiKey) {
      console.warn("[SGDB Link] No API key set. Script will not function.");
      return null;
    }
    try {
      console.log(`[SGDB Link] Looking up game by App ID ${appId} via API`);
      return new Promise((resolve) => {
        _GM_xmlhttpRequest({
          method: "GET",
          url: `https://www.steamgriddb.com/api/v2/games/steam/${appId}`,
          headers: {
            Authorization: `Bearer ${apiKey}`
          },
          onload: (response) => {
            const data = JSON.parse(response.responseText);
            if (data.success && data.data && data.data.id) {
              console.log(`[SGDB Link] Found SGDB Game ID: ${data.data.id}`);
              resolve(`https://www.steamgriddb.com/game/${data.data.id}`);
            } else {
              console.warn("[SGDB Link] Game not found on SGDB.");
              resolve(null);
            }
          },
          onerror: () => {
            console.error("[SGDB Link] Network error during API lookup");
            resolve(null);
          }
        });
      });
    } catch (e) {
      console.error("[SGDB Link] Error during API lookup", e);
      return null;
    }
  }
  function initApiKeyMenu() {
    _GM_registerMenuCommand("Set SteamGridDB API Key", () => {
      const current = _GM_getValue("sgdb_api_key", "");
      const key = prompt("Enter your SteamGridDB API Key:", current);
      if (key !== null) {
        _GM_setValue("sgdb_api_key", key.trim());
        console.log("[SGDB Link] API key updated, reloading page...");
        window.location.reload();
      }
    });
  }
  async function main() {
    console.log(`[SGDB Link] Initializing on host: ${window.location.hostname}`);
    const config = configs.find(
      (c) => window.location.hostname.includes(c.hostname)
    );
    if (config) {
      initApiKeyMenu();
      const apiKey = _GM_getValue("sgdb_api_key");
      if (!apiKey) {
        console.info(
          "[SGDB Link] API key is not set. Please set it via the menu command."
        );
        return;
      }
      const appId = config.getAppId();
      console.log(`[SGDB Link] Extracted App ID: ${appId}`);
      if (appId) {
        const link = await getSgdbLink(appId);
        if (link) {
          console.log(`[SGDB Link] Final URL: ${link}`);
          config.inject(link);
        }
      }
    }
  }
  main();

})();