import { useLanguage } from '@/contexts/LanguageContext';
import { frizerinoTranslations, FrizerinoTranslations } from '@/lib/frizerino-translations';

export const useFrizerinoTranslations = (): FrizerinoTranslations => {
  const { language } = useLanguage();
  return frizerinoTranslations[language];
};
