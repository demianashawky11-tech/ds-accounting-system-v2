import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddTaskModal = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    employee: '',
    due_date: '',
    priority: 'متوسطة',
    status: 'pending'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!taskData.title || !taskData.employee) {
      alert('يرجى ملء اسم المهمة والموظف المسؤول');
      return;
    }
    setLoading(true);
    try {
      await onSave(taskData);
      setTaskData({ title: '', employee: '', due_date: '', priority: 'متوسطة', status: 'pending' });
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* الرأس */}
        <div className="px-6 py-4 border-b border-[#e8dcc8] bg-[#faf6ec] rounded-t-xl">
          <h3 className="text-lg font-bold text-gray-800">✅ إضافة مهمة جديدة</h3>
        </div>

        {/* الحقول */}
        <div className="p-6 flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم المهمة <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={taskData.title}
              onChange={handleChange}
              type="text"
              placeholder="مثال: مراجعة قيود اليومية"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الموظف المسؤول <span className="text-red-500">*</span>
            </label>
            <input
              name="employee"
              value={taskData.employee}
              onChange={handleChange}
              type="text"
              placeholder="مثال: أحمد علي"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ الاستحقاق
            </label>
            <input
              name="due_date"
              value={taskData.due_date}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الأولوية
            </label>
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="عالية">عالية</option>
              <option value="متوسطة">متوسطة</option>
              <option value="منخفضة">منخفضة</option>
            </select>
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
            {loading ? '⏳ جاري الحفظ...' : '💾 حفظ المهمة'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;