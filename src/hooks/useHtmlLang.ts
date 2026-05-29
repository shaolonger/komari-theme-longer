import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to sync the HTML lang attribute with the current i18n language
 */
export function useHtmlLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML lang attribute when language changes
    const updateHtmlLang = () => {
      const currentLang = i18n.language;
      // Extract primary language code (e.g., zh-CN -> zh)
      const primaryLang = currentLang.split('-')[0];
      document.documentElement.lang = primaryLang;
    };

    // Set initial language
    updateHtmlLang();

    // Listen for language changes
    i18n.on('languageChanged', updateHtmlLang);

    // Cleanup
    return () => {
      i18n.off('languageChanged', updateHtmlLang);
    };
  }, [i18n]);
}