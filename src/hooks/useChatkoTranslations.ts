import { useLanguage } from '@/contexts/LanguageContext';
import { chatkoTranslations } from '@/lib/chatko-translations';

export const useChatkoTranslations = () => {
  const { language } = useLanguage();
  return chatkoTranslations[language];
};
