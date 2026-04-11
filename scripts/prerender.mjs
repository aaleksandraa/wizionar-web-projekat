import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST_DIR = path.resolve("dist");
const SSR_ENTRY = path.resolve(".prerender", "entry-server.js");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

const template = await readFile(TEMPLATE_PATH, "utf8");
const serverEntry = await import(pathToFileURL(SSR_ENTRY).href);

const { prerenderRoutes, render } = serverEntry;

if (!Array.isArray(prerenderRoutes) || typeof render !== "function") {
  throw new Error("SSR prerender entry is missing required exports.");
}

const writeRouteHtml = async (route, html) => {
  if (route === "/") {
    await writeFile(TEMPLATE_PATH, html, "utf8");
    return;
  }

  const routeDir = path.join(DIST_DIR, route.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf8");
};

for (const route of prerenderRoutes) {
  const { appHtml, headHtml, htmlLang } = await render(route);

  const documentHtml = template
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang}">`)
    .replace(
      /<!--prerender-head:start-->[\s\S]*?<!--prerender-head:end-->/,
      `<!--prerender-head:start-->\n    ${headHtml}\n    <!--prerender-head:end-->`
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  await writeRouteHtml(route, documentHtml);
}

console.log(`Prerendered ${prerenderRoutes.length} routes into ${DIST_DIR}`);
