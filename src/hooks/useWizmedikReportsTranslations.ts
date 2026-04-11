import { useLanguage } from '@/contexts/LanguageContext';
import { wizmedikReportsTranslations, WizMedikReportsTranslations } from '@/lib/wizmedik-reports-translations';

export const useWizmedikReportsTranslations = (): WizMedikReportsTranslations => {
  const { language } = useLanguage();
  return wizmedikReportsTranslations[language];
};
