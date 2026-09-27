import React, { useState } from 'react';

const AddFollowUpModal = ({ isOpen, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [followUpData, setFollowUpData] = useState({
    client: '',
    work_volume: '',
    exceeded_date: '',
    action: '',
    status: 'pending',
    notes: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowUpData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!followUpData.client) {
      alert('يرجى ملء اسم العميل');
      return;
    }

    setLoading(true);
    try {
      const dataToSave = {
        ...followUpData,
        work_volume: followUpData.work_volume ? parseFloat(followUpData.work_volume) : 0,
      };
      await onSave(dataToSave);
      setFollowUpData({
        client: '',
        work_volume: '',
        exceeded_date: '',
        action: '',
        status: 'pending',
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
            ⭐ إضافة متابعة جديدة
          </h3>
        </div>

        {/* الحقول */}
        <div className="p-6 flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              العميل <span className="text-red-500">*</span>
            </label>
            <input
              name="client"
              value={followUpData.client}
              onChange={handleChange}
              type="text"
              placeholder="مثال: شركة الأمل"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              حجم الأعمال (ج.م)
            </label>
            <input
              name="work_volume"
              value={followUpData.work_volume}
              onChange={handleChange}
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ تجاوز الحد
            </label>
            <input
              name="exceeded_date"
              value={followUpData.exceeded_date}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الإجراء
            </label>
            <input
              name="action"
              value={followUpData.action}
              onChange={handleChange}
              type="text"
              placeholder="مثال: بدء التسجيل في القيمة المضافة"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select
              name="status"
              value={followUpData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="pending">قيد المتابعة</option>
              <option value="in_progress">جاري التنفيذ</option>
              <option value="done">مكتمل</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ملاحظات
            </label>
            <textarea
              name="notes"
              value={followUpData.notes}
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
            إلغاء
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
            {loading ? '⏳ جاري الحفظ...' : '💾 حفظ المتابعة'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFollowUpModal;