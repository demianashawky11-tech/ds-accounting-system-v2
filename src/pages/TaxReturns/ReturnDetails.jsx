import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ReturnDetails = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('data'); // التبويب الافتراضي

  const tabs = [
    { id: 'data', label: 'البيانات' },
    { id: 'documents', label: 'المستندات' },
    { id: 'notes', label: 'الملاحظات' },
    { id: 'tasks', label: 'المهام' },
    { id: 'audit', label: 'سجل النشاط' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* شريط التبويبات */}
      <div className="flex border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوى التبويب النشط */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {activeTab === 'data' && <div>هنا ستظهر البيانات الأساسية للإقرار...</div>}
        {activeTab === 'documents' && <div>هنا ستظهر قائمة المستندات (Checklist)...</div>}
        {activeTab === 'notes' && <div>هنا سيعرض الـ Timeline للملاحظات...</div>}
        {activeTab === 'tasks' && <div>هنا ستظهر قائمة المهام المرتبطة...</div>}
        {activeTab === 'audit' && <div>هنا سيظهر سجل التعديلات (Audit Log)...</div>}
      </div>
    </div>
  );
};

export default ReturnDetails;