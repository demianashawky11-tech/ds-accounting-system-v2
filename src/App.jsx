import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
// تم تصحيح المسار ليكون مطابقاً للمجلد الفعلي (contexts)
import { LanguageProvider } from './contexts/LanguageContext'; 
import './utils/i18n'; // تفعيل نظام الترجمة واللغات

function App() {
  return (
    <BrowserRouter>
      {/* إحاطة التطبيق بالـ LanguageProvider لتفعيل خاصية الترجمة في كل الصفحات */}
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;