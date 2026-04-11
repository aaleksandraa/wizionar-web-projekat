import type { ComponentType, ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

export type AppPages = {
  Index: ComponentType;
  WizFlussi: ComponentType;
  WizMedikReports: ComponentType;
  WizMedik: ComponentType;
  Frizerino: ComponentType;
  Chatko: ComponentType;
  Usluge: ComponentType;
  SEOOptimizacija: ComponentType;
  WebDevelopment: ComponentType;
  GrafickiDizajn: ComponentType;
  ProjectDetail: ComponentType;
  NotFound: ComponentType;
};

const identity = (page: ReactNode) => page;

export const AppRoutes = ({
  pages,
  wrapPage = identity,
}: {
  pages: AppPages;
  wrapPage?: (page: ReactNode) => ReactNode;
}) => {
  const routeElements = (
    <>
      <Route index element={wrapPage(<pages.Index />)} />
      <Route path="wizflussi" element={wrapPage(<pages.WizFlussi />)} />
      <Route path="wizmedik-reports" element={wrapPage(<pages.WizMedikReports />)} />
      <Route path="wizmedik" element={wrapPage(<pages.WizMedik />)} />
      <Route path="frizerino" element={wrapPage(<pages.Frizerino />)} />
      <Route path="chatko" element={wrapPage(<pages.Chatko />)} />
      <Route path="usluge" element={wrapPage(<pages.Usluge />)} />
      <Route path="usluge/izrada-web-stranica" element={wrapPage(<pages.WebDevelopment />)} />
      <Route path="usluge/seo-optimizacija" element={wrapPage(<pages.SEOOptimizacija />)} />
      <Route path="usluge/graficki-dizajn" element={wrapPage(<pages.GrafickiDizajn />)} />
      <Route path="portfolio/:slug" element={wrapPage(<pages.ProjectDetail />)} />
      <Route path="*" element={wrapPage(<pages.NotFound />)} />
    </>
  );

  return (
    <Routes>
      <Route path="/en/*">
        <Route>{routeElements}</Route>
      </Route>
      <Route path="/de/*">
        <Route>{routeElements}</Route>
      </Route>
      <Route path="/it/*">
        <Route>{routeElements}</Route>
      </Route>
      <Route path="/*">
        <Route>{routeElements}</Route>
      </Route>
    </Routes>
  );
};
