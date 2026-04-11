import { useLanguage } from "@/contexts/LanguageContext";
import { webdevTranslations } from "@/lib/webdev-translations";

export const useWebdevTranslations = () => {
  const { language } = useLanguage();
  return webdevTranslations[language];
};
