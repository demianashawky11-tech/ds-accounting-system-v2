import React, { useState } from 'react';

const ClientTabs = () => {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'البيانات الأساسية' },
    { id: 'docs', label: 'المستندات والأرشيف' },
    { id: 'tax', label: 'الإقرارات الضريبية' },
    { id: 'cases', label: 'القضايا' },
    { id: 'tasks', label: 'المهام' },
    { id: 'log', label: 'سجل النشاط' },
  ];

  return (
    <div className="client-workspace">
      {/* شريط التبويبات */}
      <div className="tabs-header border-b flex gap-4 overflow-x-auto">
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

      {/* محتوى التبويب النشط */}
      <div className="tabs-content p-6">
        {activeTab === 'info' && <div>هنا ستظهر البيانات الأساسية للعميل</div>}
        {activeTab === 'docs' && <div>هنا سيظهر أرشيف المستندات</div>}
        {activeTab === 'tax' && <div>هنا ستظهر الإقرارات الضريبية</div>}
        {activeTab === 'cases' && <div>هنا ستظهر القضايا المرتبطة</div>}
        {activeTab === 'tasks' && <div>هنا ستظهر المهام المطلوبة</div>}
        {activeTab === 'log' && <div>هنا سيظهر سجل نشاط العميل</div>}
      </div>
    </div>
  );
};

export default ClientTabs;