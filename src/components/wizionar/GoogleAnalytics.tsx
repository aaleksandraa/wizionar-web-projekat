import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BASE_URL } from "@/lib/seo";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_SCRIPT_ID = "wizionar-ga-script";
const GA_INIT_ID = "wizionar-ga-init";

const GoogleAnalytics = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    if (!document.getElementById(GA_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GA_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }

    if (!document.getElementById(GA_INIT_ID)) {
      const inlineScript = document.createElement("script");
      inlineScript.id = GA_INIT_ID;
      inlineScript.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${measurementId}', { send_page_view: false });
      `;
      document.head.appendChild(inlineScript);
    }
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || !window.gtag) {
      return;
    }

    const pagePath = `${location.pathname}${location.search}`;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_path: pagePath,
      page_location: `${BASE_URL}${pagePath}`,
      language,
      send_to: measurementId,
    });
  }, [language, location.pathname, location.search, measurementId]);

  return null;
};

export default GoogleAnalytics;
