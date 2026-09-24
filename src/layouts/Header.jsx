import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.lang = newLang;
  };

  return (
    <header style={{
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
        {t('app_title')}
      </h1>
      
      <button 
        onClick={toggleLanguage}
        style={{
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: '#ffffff'
        }}
      >
        {i18n.language === 'ar' ? 'English' : 'العربية'}
      </button>
    </header>
  );
};

export default Header;