import { useLanguage } from '@/contexts/LanguageContext';
import { wizmedikTranslations, WizMedikTranslations } from '@/lib/wizmedik-translations';

export const useWizmedikTranslations = (): WizMedikTranslations => {
  const { language } = useLanguage();
  return wizmedikTranslations[language];
};
