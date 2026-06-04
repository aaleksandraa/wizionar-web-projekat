import { lazy, type ComponentType } from "react";

type PageModule = { default: ComponentType };
type PageImporter = () => Promise<PageModule>;

const localePrefixPattern = /^\/(en|de|it)(?=\/|$)/;
const externalPathPattern = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

const createLazyPage = (importer: PageImporter) => ({
  Component: lazy(importer),
  preload: importer,
});

const indexPage = createLazyPage(() => import("@/pages/Index"));
const wizFlussiPage = createLazyPage(() => import("@/pages/WizFlussi"));
const wizMedikReportsPage = createLazyPage(() => import("@/pages/WizMedikReports"));
const wizMedikPage = createLazyPage(() => import("@/pages/WizMedik"));
const frizerinoPage = createLazyPage(() => import("@/pages/Frizerino"));
const chatkoPage = createLazyPage(() => import("@/pages/Chatko"));
const uslugePage = createLazyPage(() => import("@/pages/Usluge"));
const seoPage = createLazyPage(() => import("@/pages/SEOOptimizacija"));
const webDevelopmentPage = createLazyPage(() => import("@/pages/WebDevelopment"));
const grafickiDizajnPage = createLazyPage(() => import("@/pages/GrafickiDizajn"));
const projectInquiryPage = createLazyPage(() => import("@/pages/ProjectInquiry"));
const projectDetailPage = createLazyPage(() => import("@/pages/ProjectDetail"));
const notFoundPage = createLazyPage(() => import("@/pages/NotFound"));

export const lazyPages = {
  Index: indexPage.Component,
  WizFlussi: wizFlussiPage.Component,
  WizMedikReports: wizMedikReportsPage.Component,
  WizMedik: wizMedikPage.Component,
  Frizerino: frizerinoPage.Component,
  Chatko: chatkoPage.Component,
  Usluge: uslugePage.Component,
  SEOOptimizacija: seoPage.Component,
  WebDevelopment: webDevelopmentPage.Component,
  GrafickiDizajn: grafickiDizajnPage.Component,
  ProjectInquiry: projectInquiryPage.Component,
  ProjectDetail: projectDetailPage.Component,
  NotFound: notFoundPage.Component,
};

const prefetchedImporters = new WeakSet<PageImporter>();

const normalizeRoutePath = (path: string) => {
  if (!path || externalPathPattern.test(path)) {
    return null;
  }

  const [pathname] = path.split(/[?#]/);
  const withoutLocale = pathname.replace(localePrefixPattern, "") || "/";

  if (!withoutLocale) {
    return "/";
  }

  if (withoutLocale !== "/" && withoutLocale.endsWith("/")) {
    return withoutLocale.slice(0, -1);
  }

  return withoutLocale;
};

const routePrefetchers: Array<{ matches: (path: string) => boolean; importer: PageImporter }> = [
  { matches: (path) => path === "/", importer: indexPage.preload },
  { matches: (path) => path === "/wizflussi", importer: wizFlussiPage.preload },
  { matches: (path) => path === "/wizmedik-reports", importer: wizMedikReportsPage.preload },
  { matches: (path) => path === "/wizmedik", importer: wizMedikPage.preload },
  { matches: (path) => path === "/frizerino", importer: frizerinoPage.preload },
  { matches: (path) => path === "/chatko", importer: chatkoPage.preload },
  { matches: (path) => path === "/usluge/graficki-dizajn", importer: grafickiDizajnPage.preload },
  { matches: (path) => path === "/usluge/seo-optimizacija", importer: seoPage.preload },
  { matches: (path) => path === "/usluge/izrada-web-stranica", importer: webDevelopmentPage.preload },
  { matches: (path) => path === "/projektni-upitnik" || path === "/project-inquiry", importer: projectInquiryPage.preload },
  { matches: (path) => path.startsWith("/portfolio/"), importer: projectDetailPage.preload },
  { matches: (path) => path === "/usluge", importer: uslugePage.preload },
];

export const prefetchRoute = (path: string) => {
  const normalizedPath = normalizeRoutePath(path);

  if (!normalizedPath) {
    return;
  }

  const matchedRoute = routePrefetchers.find(({ matches }) => matches(normalizedPath));

  if (!matchedRoute || prefetchedImporters.has(matchedRoute.importer)) {
    return;
  }

  prefetchedImporters.add(matchedRoute.importer);
  void matchedRoute.importer();
};
