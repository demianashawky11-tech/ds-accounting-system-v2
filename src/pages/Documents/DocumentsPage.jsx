import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DocumentsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchDoc, setSearchDoc] = useState('');

  // بيانات وهمية للمستندات
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
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#0f172a', margin: 0 }}>{t('documents.title')}</h2>
        </div>
        <button style={{ padding: '10px 20px', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
          📤 {t('documents.upload')}
        </button>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="بحث باسم الملف أو العميل..." 
          value={searchDoc}
          onChange={(e) => setSearchDoc(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e4e7', outline: 'none' }}
        />
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'start' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e4e7' }}>
              <th style={{ padding: '16px', color: '#64748b' }}>{t('documents.doc_name')}</th>
              <th style={{ padding: '16px', color: '#64748b' }}>{t('documents.doc_type')}</th>
              <th style={{ padding: '16px', color: '#64748b' }}>العميل</th>
              <th style={{ padding: '16px', color: '#64748b' }}>التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px' }}>📄 {doc.name}</td>
                <td style={{ padding: '16px' }}>{t(`documents.${doc.type}`)}</td>
                <td style={{ padding: '16px' }}>{doc.client}</td>
                <td style={{ padding: '16px' }}>{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsPage;