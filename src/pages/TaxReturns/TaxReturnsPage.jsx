import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const TaxReturnsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    // أضفنا حاوية لتنسيق الصفحة بشكل صحيح إذا كانت MainLayout لا توفرها تلقائياً
    <div className="p-4 md:p-6 w-full h-full">
      
      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">الإقرارات الضريبية</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm">
          + إنشاء إقرار جديد
        </button>
      </div>

      {/* بطاقات الإحصائيات - تم تحسين التنسيق لتكون متجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow-sm border rounded-xl">
          <p className="text-sm text-gray-500">إجمالي الإقرارات</p>
          <p className="text-xl font-bold">542</p>
        </div>
        <div className="p-4 bg-white shadow-sm border rounded-xl">
          <p className="text-sm text-gray-500">مستحق هذا الشهر</p>
          <p className="text-xl font-bold">27</p>
        </div>
        <div className="p-4 bg-white shadow-sm border rounded-xl">
          <p className="text-sm text-gray-500">متأخر</p>
          <p className="text-xl font-bold text-red-600">18</p>
        </div>
        <div className="p-4 bg-white shadow-sm border rounded-xl">
          <p className="text-sm text-gray-500">ينقصها مستندات</p>
          <p className="text-xl font-bold text-orange-500">8</p>
        </div>
      </div>

      {/* الجدول */}
      <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700">رقم</th>
              <th className="p-4 text-sm font-semibold text-gray-700">اسم العميل</th>
              <th className="p-4 text-sm font-semibold text-gray-700">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="p-4 text-gray-600">#1025</td>
              <td className="p-4 font-medium text-gray-900">شركة الأمل</td>
              <td className="p-4">
                 <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">متأخر</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxReturnsPage;