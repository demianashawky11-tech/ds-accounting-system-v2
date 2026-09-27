import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient';
import AddDocumentModal from '../../components/modals/AddDocumentModal';

const DocumentsPage = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [searchDoc, setSearchDoc] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب المستندات
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (err) {
      console.error('خطأ في جلب المستندات:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // إضافة مستند
  const handleAddDocument = async (newDoc) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([newDoc])
        .select();

      if (error) throw error;

      setDocuments([...(data || []), ...documents]);
      setIsModalOpen(false);
      alert('✅ تم حفظ المستند بنجاح');
    } catch (err) {
      console.error('خطأ في الحفظ:', err);
      alert('❌ فشل الحفظ: ' + err.message);
    }
  };

  // حذف مستند
  const deleteDocument = async (docId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستند؟')) return;
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', docId);

      if (error) throw error;
      setDocuments(documents.filter(d => d.id !== docId));
    } catch (err) {
      console.error('خطأ في الحذف:', err);
      alert('فشل الحذف: ' + err.message);
    }
  };

  // فلترة
  const filteredDocs = documents.filter(doc => {
    const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
    const matchesSearch =
      doc.name?.toLowerCase().includes(searchDoc.toLowerCase()) ||
      doc.client?.toLowerCase().includes(searchDoc.toLowerCase());
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
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm"
        >
          📤 {t('documents.upload')}
        </button>
      </div>

      {/* البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="بحث باسم الملف أو العميل..."
          value={searchDoc}
          onChange={(e) => setSearchDoc(e.target.value)}
          className="flex-1 px-4 py-2 bg-white border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="md:w-48 px-4 py-2 bg-white border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">كل الأنواع</option>
          <option value="tax_return">إقرار ضريبي</option>
          <option value="vat">قيمة مضافة</option>
          <option value="commercial_doc">أوراق رسمية</option>
          <option value="other">أخرى</option>
        </select>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ {error}
        </div>
      )}

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
                <th className="p-4 text-sm font-semibold text-gray-700">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e9d8]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    ⏳ جاري التحميل من Supabase...
                  </td>
                </tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    {searchDoc || activeFilter !== 'all'
                      ? 'لا توجد مستندات مطابقة'
                      : 'لا توجد مستندات حتى الآن. اضغط "رفع مستند جديد" للبدء.'}
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#faf6ec] transition-colors">
                    <td className="p-4 font-medium text-gray-900">📄 {doc.name}</td>
                    <td className="p-4 text-gray-600">
  {doc.type === 'tax_return' ? 'إقرار ضريبي'
   : doc.type === 'vat' ? 'قيمة مضافة'
   : doc.type === 'commercial_doc' ? 'أوراق رسمية'
   : doc.type === 'other' ? 'أخرى'
   : doc.type || '---'}
</td>
                    <td className="p-4 text-gray-600">{doc.client || '---'}</td>
                    <td className="p-4 text-gray-600">
                      <code className="bg-[#faf6ec] px-2 py-1 rounded text-sm">
                        {doc.doc_date || '---'}
                      </code>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-all"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* عداد */}
      {!loading && documents.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          إجمالي المستندات: <strong>{documents.length}</strong>
          {(searchDoc || activeFilter !== 'all') && ` | نتائج البحث: ${filteredDocs.length}`}
        </div>
      )}

      {/* نافذة رفع مستند */}
      <AddDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDocument}
      />
    </div>
  );
};

export default DocumentsPage;