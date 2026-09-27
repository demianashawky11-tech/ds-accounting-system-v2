import React, { useState } from 'react';

const AddAppointmentModal = ({ isOpen, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    client: '',
    task: '',
    due_date: new Date().toISOString().split('T')[0],
    status: 'upcoming',
    notes: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!appointmentData.client || !appointmentData.task || !appointmentData.due_date) {
      alert('يرجى ملء العميل والمهمة وتاريخ الاستحقاق');
      return;
    }

    setLoading(true);
    try {
      await onSave(appointmentData);
      setAppointmentData({
        client: '',
        task: '',
        due_date: new Date().toISOString().split('T')[0],
        status: 'upcoming',
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
            📅 إضافة موعد جديد
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
              value={appointmentData.client}
              onChange={handleChange}
              type="text"
              placeholder="مثال: شركة الأمل"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المهمة <span className="text-red-500">*</span>
            </label>
            <input
              name="task"
              value={appointmentData.task}
              onChange={handleChange}
              type="text"
              placeholder="مثال: إقرار القيمة المضافة"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ الاستحقاق <span className="text-red-500">*</span>
            </label>
            <input
              name="due_date"
              value={appointmentData.due_date}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select
              name="status"
              value={appointmentData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="upcoming">قادم</option>
              <option value="due_today">مستحق اليوم</option>
              <option value="overdue">متأخر</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ملاحظات
            </label>
            <textarea
              name="notes"
              value={appointmentData.notes}
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
            {loading ? '⏳ جاري الحفظ...' : '💾 حفظ الموعد'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;