import React, { useState } from 'react';
import ClientInfo from './client-tabs/ClientInfo';
import ClientDocs from './client-tabs/ClientDocs';
import ClientTax from './client-tabs/ClientTax';

const ClientTabs = () => {
  const [activeTab, setActiveTab] = useState('info');

  // دالة لاختيار المكون المناسب
  const renderContent = () => {
    switch (activeTab) {
      case 'info': return <ClientInfo />;
      case 'docs': return <ClientDocs />;
      case 'tax': return <ClientTax />;
      default: return <div>اختر تبويب لعرض المحتوى</div>;
    }
  };

  const tabs = [
    { id: 'info', label: 'البيانات الأساسية' },
    { id: 'docs', label: 'المستندات والأرشيف' },
    { id: 'tax', label: 'الإقرارات الضريبية' },
  ];

  return (
    <div className="client-workspace">
      {/* شريط التبويبات */}
      <div className="tabs-header border-b flex gap-4 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 transition-all ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600 font-bold' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* منطقة المحتوى الذكية */}
      <div className="tabs-content p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ClientTabs;