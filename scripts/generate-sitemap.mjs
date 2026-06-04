import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://wizionar.app";
const OUTPUT_FILE = path.resolve("public", "sitemap.xml");

const LASTMOD = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Sarajevo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const LANGUAGES = [
  { code: "sr", hreflang: "bs-BA" },
  { code: "en", hreflang: "en" },
  { code: "de", hreflang: "de-DE" },
  { code: "it", hreflang: "it-IT" },
];

const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/wizflussi", changefreq: "monthly", priority: "0.9" },
  { path: "/wizmedik-reports", changefreq: "monthly", priority: "0.85" },
  { path: "/wizmedik", changefreq: "monthly", priority: "0.85" },
  { path: "/frizerino", changefreq: "monthly", priority: "0.85" },
  { path: "/chatko", changefreq: "monthly", priority: "0.85" },
  { path: "/usluge", changefreq: "weekly", priority: "0.8" },
  { path: "/usluge/izrada-web-stranica", changefreq: "weekly", priority: "0.85" },
  { path: "/usluge/seo-optimizacija", changefreq: "weekly", priority: "0.85" },
  { path: "/usluge/graficki-dizajn", changefreq: "weekly", priority: "0.8" },
  { path: "/projektni-upitnik", changefreq: "monthly", priority: "0.85" },
  { path: "/portfolio/techflow-dashboard", changefreq: "monthly", priority: "0.72" },
  { path: "/portfolio/styleout-fashion-shop", changefreq: "monthly", priority: "0.72" },
  { path: "/portfolio/mediconnect-klinika", changefreq: "monthly", priority: "0.72" },
];

const buildLocalizedPath = (basePath, language) => {
  if (language === "sr") {
    return basePath;
  }

  return basePath === "/" ? `/${language}` : `/${language}${basePath}`;
};

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const renderAlternateLinks = (basePath) => {
  const alternates = LANGUAGES.map(
    ({ code, hreflang }) =>
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(
        `${BASE_URL}${buildLocalizedPath(basePath, code)}`
      )}" />`
  );

  alternates.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}${basePath}`)}" />`
  );

  return alternates.join("\n");
};

const renderUrlEntry = (route, language) => {
  const localizedPath = buildLocalizedPath(route.path, language.code);
  const location = `${BASE_URL}${localizedPath}`;

  return [
    "  <url>",
    `    <loc>${escapeXml(location)}</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    renderAlternateLinks(route.path),
    "  </url>",
  ].join("\n");
};

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...ROUTES.flatMap((route) => LANGUAGES.map((language) => renderUrlEntry(route, language))),
  "</urlset>",
  "",
].join("\n");

await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
await writeFile(OUTPUT_FILE, sitemap, "utf8");

console.log(`Generated sitemap: ${OUTPUT_FILE}`);
