import { useLanguage } from "@/contexts/LanguageContext";
import { wizflussiTranslations } from "@/lib/wizflussi-translations";

export const useWizflussiTranslations = () => {
  const { language } = useLanguage();
  return wizflussiTranslations[language];
};
