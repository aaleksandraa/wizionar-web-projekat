import { useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/lib/localized-paths";
import { useCallback } from "react";

/**
 * Returns a function that prefixes a path with the current language.
 * It is idempotent, so already-localized paths are normalized instead of duplicated.
 */
export const useLocalizedPath = () => {
  const { language } = useLanguage();

  return useCallback((path: string) => localizePath(path, language), [language]);
};

export { buildLangPath } from "@/lib/localized-paths";
