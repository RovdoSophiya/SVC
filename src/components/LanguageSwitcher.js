import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Сохраняем выбор языка
  };

  React.useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <div>
      <button onClick={() => changeLanguage('ru')}>Русский</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};

export default LanguageSwitcher;