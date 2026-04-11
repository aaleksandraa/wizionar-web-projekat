import { useLanguage } from "@/contexts/LanguageContext";
import { uslugeTranslations } from "@/lib/usluge-translations";

export const useUslugeTranslations = () => {
  const { language } = useLanguage();
  return uslugeTranslations[language];
};
