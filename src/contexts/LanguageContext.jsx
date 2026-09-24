import React, { createContext, useState, useContext, useEffect } from 'react';

// استيراد ملفات الترجمة الثابتة
import ar from '../locales/ar/translation.json';
import en from '../locales/en/translation.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // الحالة الافتراضية هي العربية، وتُحفظ في localStorage لتبقى ثابتة عند تحديث الصفحة
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ar');

  // تحديث اتجاه الموقع (RTL/LTR) تلقائياً عند تغيير اللغة
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  // اختيار القاموس بناءً على اللغة الحالية
  const t = lang === 'ar' ? ar : en;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// هوك مخصص للاستخدام السريع في أي صفحة
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};