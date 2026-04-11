import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "@/app-routes";
import { AppShell } from "@/app-shell";
import {
  BASE_URL,
  DEFAULT_ROBOTS,
  LANGUAGE_SEO,
  SEO_PATHS,
  SITE_NAME,
  SUPPORTED_LANGUAGES,
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  createFaqSchema,
  createOrganizationSchema,
  createServiceSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
  createWebsiteSchema,
  getPageSeo,
  getSeoLabel,
  type SchemaObject,
} from "@/lib/seo";
import {
  buildLangPath,
  detectLanguageFromPathname,
  stripAllLangPrefixes,
} from "@/lib/localized-paths";
import { seoTranslations } from "@/lib/seo-translations";
import { grafickiDizajnTranslations } from "@/lib/graficki-dizajn-translations";
import { webdevTranslations } from "@/lib/webdev-translations";
import Index from "@/pages/Index";
import WizFlussi from "@/pages/WizFlussi";
import WizMedikReports from "@/pages/WizMedikReports";
import WizMedik from "@/pages/WizMedik";
import Frizerino from "@/pages/Frizerino";
import Chatko from "@/pages/Chatko";
import Usluge from "@/pages/Usluge";
import SEOOptimizacija from "@/pages/SEOOptimizacija";
import WebDevelopment from "@/pages/WebDevelopment";
import GrafickiDizajn from "@/pages/GrafickiDizajn";
import ProjectDetail, { portfolioProjects } from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";

const prerenderBasePaths = [
  SEO_PATHS.home,
  SEO_PATHS.wizflussi,
  SEO_PATHS.wizmedikReports,
  SEO_PATHS.wizmedik,
  SEO_PATHS.frizerino,
  SEO_PATHS.chatko,
  SEO_PATHS.usluge,
  SEO_PATHS.webDevelopment,
  SEO_PATHS.seoOptimization,
  SEO_PATHS.graphicDesign,
  ...portfolioProjects.map((project) => `/portfolio/${project.slug}`),
];

export const prerenderRoutes = prerenderBasePaths.flatMap((path) =>
  SUPPORTED_LANGUAGES.map((language) => buildLangPath(path, language))
);

const pages = {
  Index,
  WizFlussi,
  WizMedikReports,
  WizMedik,
  Frizerino,
  Chatko,
  Usluge,
  SEOOptimizacija,
  WebDevelopment,
  GrafickiDizajn,
  ProjectDetail,
  NotFound,
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const createMetaTag = (name: string, content: string) =>
  `<meta name="${escapeHtml(name)}" content="${escapeHtml(content)}" />`;

const createPropertyTag = (property: string, content: string, extra = "") =>
  `<meta property="${escapeHtml(property)}" content="${escapeHtml(content)}"${extra} />`;

const createLinkTag = (rel: string, href: string, extra = "") =>
  `<link rel="${escapeHtml(rel)}" href="${escapeHtml(href)}"${extra} />`;

const createScriptTag = (schema: SchemaObject) =>
  `<script type="application/ld+json" data-wizionar-schema="true">${JSON.stringify(schema)}</script>`;

type HeadData = {
  title: string;
  description: string;
  keywords?: string[];
  schema: SchemaObject[];
  pageType?: "website" | "article";
  noIndex?: boolean;
};

const getHeadData = (urlPath: string): { language: keyof typeof LANGUAGE_SEO; basePath: string; data: HeadData } => {
  const language = detectLanguageFromPathname(urlPath);
  const basePath = stripAllLangPrefixes(urlPath);

  switch (basePath) {
    case SEO_PATHS.home: {
      const seo = getPageSeo("home", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          keywords: seo.keywords,
          schema: [
            createOrganizationSchema(),
            createWebsiteSchema(language),
            createWebPageSchema({
              language,
              path: SEO_PATHS.home,
              title: seo.title,
              description: seo.description,
            }),
          ],
        },
      };
    }
    case SEO_PATHS.wizflussi: {
      const seo = getPageSeo("wizflussi", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "WizFlussi",
              description: seo.description,
              path: SEO_PATHS.wizflussi,
              category: "BusinessApplication",
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.wizflussi,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "WizFlussi", path: SEO_PATHS.wizflussi },
            ]),
          ],
        },
      };
    }
    case SEO_PATHS.wizmedikReports: {
      const seo = getPageSeo("wizmedikReports", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "WizMedikReports",
              description: seo.description,
              path: SEO_PATHS.wizmedikReports,
              category: "BusinessApplication",
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.wizmedikReports,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "WizMedikReports", path: SEO_PATHS.wizmedikReports },
            ]),
          ],
        },
      };
    }
    case SEO_PATHS.wizmedik: {
      const seo = getPageSeo("wizmedik", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "WizMedik",
              description: seo.description,
              path: SEO_PATHS.wizmedik,
              category: "HealthApplication",
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.wizmedik,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "WizMedik", path: SEO_PATHS.wizmedik },
            ]),
          ],
        },
      };
    }
    case SEO_PATHS.frizerino: {
      const seo = getPageSeo("frizerino", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "Frizerino",
              description: seo.description,
              path: SEO_PATHS.frizerino,
              category: "BusinessApplication",
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.frizerino,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "Frizerino", path: SEO_PATHS.frizerino },
            ]),
          ],
        },
      };
    }
    case SEO_PATHS.chatko: {
      const seo = getPageSeo("chatko", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "Chatko",
              description: seo.description,
              path: SEO_PATHS.chatko,
              category: "BusinessApplication",
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.chatko,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "Chatko", path: SEO_PATHS.chatko },
            ]),
          ],
        },
      };
    }
    case SEO_PATHS.usluge: {
      const seo = getPageSeo("usluge", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.usluge,
              serviceType: seo.title,
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.usluge,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
            ]),
          ],
        },
      };
    }
    case SEO_PATHS.webDevelopment: {
      const seo = getPageSeo("webDevelopment", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.webDevelopment,
              serviceType: getSeoLabel(language, "webDevelopment"),
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.webDevelopment,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
              { name: getSeoLabel(language, "webDevelopment"), path: SEO_PATHS.webDevelopment },
            ]),
            createFaqSchema(
              webdevTranslations[language].faq.items.map((item) => ({
                question: item.q,
                answer: item.a,
              }))
            ),
          ],
        },
      };
    }
    case SEO_PATHS.seoOptimization: {
      const seo = getPageSeo("seoOptimization", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.seoOptimization,
              serviceType: getSeoLabel(language, "seo"),
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.seoOptimization,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
              { name: getSeoLabel(language, "seo"), path: SEO_PATHS.seoOptimization },
            ]),
            createFaqSchema(
              seoTranslations[language].faq.items.map((item) => ({
                question: item.q,
                answer: item.a,
              }))
            ),
          ],
        },
      };
    }
    case SEO_PATHS.graphicDesign: {
      const seo = getPageSeo("graphicDesign", language);

      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.graphicDesign,
              serviceType: getSeoLabel(language, "graphicDesign"),
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.graphicDesign,
              title: seo.title,
              description: seo.description,
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
              { name: getSeoLabel(language, "graphicDesign"), path: SEO_PATHS.graphicDesign },
            ]),
            createFaqSchema(
              grafickiDizajnTranslations[language].faqs.map((item) => ({
                question: item.q,
                answer: item.a,
              }))
            ),
          ],
        },
      };
    }
    default: {
      if (basePath.startsWith("/portfolio/")) {
        const slug = basePath.replace("/portfolio/", "");
        const project = portfolioProjects.find((item) => item.slug === slug);

        if (project) {
          const title = `${project.title} | ${project.category[language]} | Wizionar`;
          const description = project.description[language];

          return {
            language,
            basePath,
            data: {
              title,
              description,
              keywords: [project.category[language], ...project.technologies],
              pageType: "article",
              schema: [
                createCreativeWorkSchema({
                  language,
                  name: project.title,
                  description,
                  path: basePath,
                  keywords: [project.category[language], ...project.technologies],
                }),
                createWebPageSchema({
                  language,
                  path: basePath,
                  title,
                  description,
                }),
                createBreadcrumbSchema(language, [
                  { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
                  { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
                  { name: getSeoLabel(language, "webDevelopment"), path: SEO_PATHS.webDevelopment },
                  { name: getSeoLabel(language, "portfolio"), path: SEO_PATHS.webDevelopment },
                  { name: project.title, path: basePath },
                ]),
              ],
            },
          };
        }
      }

      return {
        language,
        basePath,
        data: {
          title: "Page not found | Wizionar",
          description: "The page you requested could not be found.",
          noIndex: true,
          schema: [],
        },
      };
    }
  }
};

const buildHeadHtml = (urlPath: string) => {
  const { language, basePath, data } = getHeadData(urlPath);
  const localeMeta = LANGUAGE_SEO[language];
  const canonicalUrl = new URL(buildLangPath(basePath, language), BASE_URL).toString();
  const robots = data.noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS;
  const ogImage = `${BASE_URL}/favicon.png`;

  const alternateLinks = SUPPORTED_LANGUAGES.map((lang) =>
    `<link rel="alternate" hreflang="${LANGUAGE_SEO[lang].hreflang}" href="${escapeHtml(
      new URL(buildLangPath(basePath, lang), BASE_URL).toString()
    )}" />`
  );

  alternateLinks.push(
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(
      new URL(basePath, BASE_URL).toString()
    )}" />`
  );

  const alternateLocales = SUPPORTED_LANGUAGES.filter((lang) => lang !== language).map(
    (lang) =>
      `<meta property="og:locale:alternate" content="${LANGUAGE_SEO[lang].ogLocale}" data-seo-og-alt-locale="true" />`
  );

  const parts = [
    `<title>${escapeHtml(data.title)}</title>`,
    createMetaTag("description", data.description),
    data.keywords?.length ? createMetaTag("keywords", data.keywords.join(", ")) : "",
    createMetaTag("author", SITE_NAME),
    createMetaTag("application-name", SITE_NAME),
    createMetaTag("robots", robots),
    createMetaTag("googlebot", robots),
    createPropertyTag("og:title", data.title),
    createPropertyTag("og:description", data.description),
    createPropertyTag("og:type", data.pageType || "website"),
    createPropertyTag("og:site_name", SITE_NAME),
    createPropertyTag("og:url", canonicalUrl),
    createPropertyTag("og:image", ogImage),
    createPropertyTag("og:image:alt", data.title),
    createPropertyTag("og:locale", localeMeta.ogLocale),
    ...alternateLocales,
    createMetaTag("twitter:card", "summary_large_image"),
    createMetaTag("twitter:title", data.title),
    createMetaTag("twitter:description", data.description),
    createMetaTag("twitter:image", ogImage),
    createLinkTag("canonical", canonicalUrl),
    ...alternateLinks,
    ...data.schema.map((schema) => createScriptTag(schema)),
  ].filter(Boolean);

  return {
    htmlLang: localeMeta.htmlLang,
    headHtml: parts.join("\n    "),
  };
};

export const render = (url: string) => {
  const queryClient = new QueryClient();

  const appHtml = renderToString(
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <StaticRouter location={url}>
          <AppShell>
            <AppRoutes pages={pages} />
          </AppShell>
        </StaticRouter>
      </MotionConfig>
    </QueryClientProvider>
  );

  return {
    appHtml,
    ...buildHeadHtml(url),
  };
};
