import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DocumentsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchDoc, setSearchDoc] = useState('');

  const dummyDocs = [
    { id: 1, name: 'الإقرار الضريبي الربع سنوي - الهدى.pdf', type: 'tax_return', client: 'شركة الهدى للتجارة', date: '2026-06-15', size: '2.4 MB' },
    { id: 2, name: 'شهادة القيمة المضافة 2026.pdf', type: 'vat', client: 'مؤسسة النور للمقاولات', date: '2026-05-20', size: '1.1 MB' },
    { id: 3, name: 'السجل التجاري المحدث - مصنع الشرق.pdf', type: 'commercial_doc', client: 'مصنع الشرق للبلاستيك', date: '2026-07-01', size: '4.8 MB' },
  ];

  const filteredDocs = dummyDocs.filter(doc => {
    const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
    const matchesSearch = doc.name.toLowerCase().includes(searchDoc.toLowerCase()) || doc.client.includes(searchDoc);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          📁 {t('documents.title')}
        </h1>
        <button
          onClick={() => alert('قريباً: نافذة رفع مستند جديد')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm"
        >
          📤 {t('documents.upload')}
        </button>
      </div>

      {/* مربع البحث */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="بحث باسم الملف أو العميل..."
          value={searchDoc}
          onChange={(e) => setSearchDoc(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* الجدول */}
      <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-[#faf6ec] border-b border-[#e8dcc8]">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-700">{t('documents.doc_name')}</th>
                <th className="p-4 text-sm font-semibold text-gray-700">{t('documents.doc_type')}</th>
                <th className="p-4 text-sm font-semibold text-gray-700">العميل</th>
                <th className="p-4 text-sm font-semibold text-gray-700">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e9d8]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    لا توجد مستندات مطابقة
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#faf6ec] transition-colors">
                    <td className="p-4 font-medium text-gray-900">📄 {doc.name}</td>
                    <td className="p-4 text-gray-600">{t(`documents.${doc.type}`)}</td>
                    <td className="p-4 text-gray-600">{doc.client}</td>
                    <td className="p-4 text-gray-600">
                      <code className="bg-[#faf6ec] px-2 py-1 rounded text-sm">{doc.date}</code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
