import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddDocumentModal = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [docData, setDocData] = useState({
    name: '',
    type: 'tax_return',
    client: '',
    doc_date: new Date().toISOString().split('T')[0],
    size: '',
    url: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // حساب الحجم بالصيغة المناسبة
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeText = sizeInMB > 1
      ? `${sizeInMB} MB`
      : `${(file.size / 1024).toFixed(2)} KB`;

    setDocData(prev => ({
      ...prev,
      name: prev.name || file.name,
      size: sizeText,
      url: URL.createObjectURL(file), // مؤقتاً - سنستبدله بـ Supabase Storage لاحقاً
    }));
  };

  const handleSave = async () => {
    if (!docData.name || !docData.client) {
      alert('يرجى ملء اسم المستند والعميل');
      return;
    }

    setLoading(true);
    try {
      await onSave(docData);
      setDocData({
        name: '',
        type: 'tax_return',
        client: '',
        doc_date: new Date().toISOString().split('T')[0],
        size: '',
        url: '',
        notes: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* رأس النافذة */}
        <div className="px-6 py-4 border-b border-[#e8dcc8] bg-[#faf6ec] rounded-t-xl">
          <h3 className="text-lg font-bold text-gray-800">
            📤 رفع مستند جديد
          </h3>
        </div>

        {/* الحقول */}
        <div className="p-6 flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم المستند <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={docData.name}
              onChange={handleChange}
              type="text"
              placeholder="مثال: الإقرار الضريبي 2026.pdf"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رفع ملف (اختياري)
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {docData.size && (
              <p className="text-xs text-gray-500 mt-1">
                📎 حجم الملف: {docData.size}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع المستند
            </label>
            <select
              name="type"
              value={docData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="tax_return">إقرار ضريبي</option>
              <option value="vat">قيمة مضافة</option>
              <option value="commercial_doc">أوراق رسمية</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              العميل <span className="text-red-500">*</span>
            </label>
            <input
              name="client"
              value={docData.client}
              onChange={handleChange}
              type="text"
              placeholder="مثال: شركة الأمل"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ المستند
            </label>
            <input
              name="doc_date"
              value={docData.doc_date}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ملاحظات
            </label>
            <textarea
              name="notes"
              value={docData.notes}
              onChange={handleChange}
              rows="2"
              placeholder="أي ملاحظات إضافية..."
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
          </div>

        </div>

        {/* الأزرار */}
        <div className="px-6 py-4 border-t border-[#e8dcc8] bg-[#faf6ec] rounded-b-xl flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 rounded-lg border border-[#e8dcc8] bg-white text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            {t('actions.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-6 py-2 rounded-lg shadow-sm transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? '⏳ جاري الحفظ...' : '💾 حفظ المستند'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;