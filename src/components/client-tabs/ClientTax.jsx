import React from 'react';

const ClientTax = () => {
  // هذه البيانات ستكون لاحقاً قادمة من قاعدة البيانات (Props)
  const taxData = {
    fileNumber: '123-456-789',
    office: 'مأمورية وسط القاهرة',
    registrationNumber: '555-888-999',
    taxType: 'ضريبة دخل / قيمة مضافة',
    status: 'منتظم',
    periodicity: 'ربع سنوي',
    lastFiling: '2026-06-15'
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-700">البيانات الضريبية للعميل</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded bg-gray-50">
          <label className="text-sm text-gray-500 block">رقم الملف الضريبي</label>
          <p className="font-medium text-gray-900">{taxData.fileNumber}</p>
        </div>
        
        <div className="p-4 border rounded bg-gray-50">
          <label className="text-sm text-gray-500 block">المأمورية</label>
          <p className="font-medium text-gray-900">{taxData.office}</p>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <label className="text-sm text-gray-500 block">رقم التسجيل الضريبي</label>
          <p className="font-medium text-gray-900">{taxData.registrationNumber}</p>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <label className="text-sm text-gray-500 block">نوع الضريبة</label>
          <p className="font-medium text-gray-900">{taxData.taxType}</p>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <label className="text-sm text-gray-500 block">الموقف الضريبي</label>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-bold">
            {taxData.status}
          </span>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <label className="text-sm text-gray-500 block">دورية الإقرار</label>
          <p className="font-medium text-gray-900">{taxData.periodicity}</p>
        </div>
      </div>

      <div className="mt-4 p-4 border-t">
        <h4 className="font-semibold text-gray-700 mb-2">أرشيف الإقرارات</h4>
        <button className="text-blue-600 hover:underline">عرض سجل الإقرارات السابقة</button>
      </div>
    </div>
  );
};

export default ClientTax;