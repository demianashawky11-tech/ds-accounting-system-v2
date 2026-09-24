import React from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar'; 
import Header from './Header';

const MainLayout = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className="flex flex-row w-full h-screen overflow-hidden bg-gray-50"
    >
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;