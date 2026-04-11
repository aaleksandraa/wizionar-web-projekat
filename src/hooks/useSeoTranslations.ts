import { useLanguage } from "@/contexts/LanguageContext";
import { seoTranslations } from "@/lib/seo-translations";

export const useSeoTranslations = () => {
  const { language } = useLanguage();
  return seoTranslations[language];
};
