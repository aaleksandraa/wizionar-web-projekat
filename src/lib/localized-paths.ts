import { Language } from "@/lib/translations";

const NON_DEFAULT_LANGUAGES = ["en", "de", "it"] as const;
const LANG_PREFIX_PATTERN = new RegExp(`^/(?:${NON_DEFAULT_LANGUAGES.join("|")})(?=/|$)`);

const ensureLeadingSlash = (path: string) => (path.startsWith("/") ? path : `/${path}`);

const splitPathSuffix = (path: string) => {
  const match = path.match(/^([^?#]*)(.*)$/);

  return {
    pathname: match?.[1] || "/",
    suffix: match?.[2] || "",
  };
};

export const detectLanguageFromPathname = (pathname: string): Language => {
  const firstSegment = pathname.split("/")[1];

  if (firstSegment && NON_DEFAULT_LANGUAGES.includes(firstSegment as (typeof NON_DEFAULT_LANGUAGES)[number])) {
    return firstSegment as Language;
  }

  return "sr";
};

export const stripAllLangPrefixes = (pathname: string): string => {
  let normalizedPath = ensureLeadingSlash(pathname);

  while (LANG_PREFIX_PATTERN.test(normalizedPath)) {
    normalizedPath = normalizedPath.replace(LANG_PREFIX_PATTERN, "") || "/";
  }

  return normalizedPath || "/";
};

export const localizePath = (path: string, language: Language): string => {
  if (path.startsWith("#")) return path;
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) return path;

  const { pathname, suffix } = splitPathSuffix(ensureLeadingSlash(path));
  const basePath = stripAllLangPrefixes(pathname);

  if (language === "sr") return `${basePath}${suffix}`;
  if (basePath === "/") return `/${language}${suffix}`;

  return `/${language}${basePath}${suffix}`;
};

export const buildLangPath = (path: string, language: Language) => localizePath(path, language);

export const normalizeLocalizedPathname = (pathname: string) => {
  const language = detectLanguageFromPathname(pathname);
  return localizePath(stripAllLangPrefixes(pathname), language);
};
