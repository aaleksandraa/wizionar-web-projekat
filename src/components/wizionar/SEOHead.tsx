import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildLangPath, stripAllLangPrefixes } from "@/lib/localized-paths";
import {
  BASE_URL,
  DEFAULT_ROBOTS,
  LANGUAGE_SEO,
  SITE_NAME,
  type SchemaObject,
} from "@/lib/seo";
import defaultOgImage from "@/assets/wizionar-logo.png";

type SEOHeadProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  schema?: SchemaObject | SchemaObject[];
};

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let meta = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.content = content;
};

const upsertLink = (rel: string, href: string) => {
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.href = href;
};

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  noIndex = false,
  schema,
}: SEOHeadProps) => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const basePath = stripAllLangPrefixes(location.pathname);
    const canonicalUrl = new URL(buildLangPath(basePath, language), BASE_URL).toString();
    const robots = noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS;
    const ogImage = new URL(image || defaultOgImage, BASE_URL).toString();
    const currentLocale = LANGUAGE_SEO[language].ogLocale;
    const alternateLocales = Object.entries(LANGUAGE_SEO)
      .filter(([lang]) => lang !== language)
      .map(([, meta]) => meta.ogLocale);

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords?.join(", ") || "");
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("name", "application-name", SITE_NAME);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:alt", title);
    upsertMeta("property", "og:locale", currentLocale);

    document
      .querySelectorAll('meta[data-seo-og-alt-locale="true"]')
      .forEach((element) => element.remove());

    alternateLocales.forEach((locale) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:locale:alternate");
      meta.setAttribute("content", locale);
      meta.dataset.seoOgAltLocale = "true";
      document.head.appendChild(meta);
    });

    upsertLink("canonical", canonicalUrl);

    document
      .querySelectorAll('script[data-wizionar-schema="true"]')
      .forEach((element) => element.remove());

    const schemaList = (Array.isArray(schema) ? schema : schema ? [schema] : []).filter(Boolean);

    schemaList.forEach((item) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.wizionarSchema = "true";
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });

    return () => {
      document
        .querySelectorAll('meta[data-seo-og-alt-locale="true"]')
        .forEach((element) => element.remove());
      document
        .querySelectorAll('script[data-wizionar-schema="true"]')
        .forEach((element) => element.remove());
    };
  }, [description, image, keywords, language, location.pathname, noIndex, schema, title, type]);

  return null;
};

export default SEOHead;
