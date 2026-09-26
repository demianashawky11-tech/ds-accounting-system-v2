import React, { useState } from 'react';

const AddTaxReturnModal = ({ isOpen, onClose, onSave }) => {
  // حالة لتخزين بيانات الإقرار الجديد
  const [returnData, setReturnData] = useState({
    clientName: '',
    returnType: 'قيمة مضافة',   // نوع الإقرار
    period: '',                 // الفترة (شهر/ربع)
    dueDate: '',                // تاريخ الاستحقاق
    amount: '',                 // المبلغ
    status: 'upcoming',         // الحالة
    notes: '',                  // ملاحظات
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReturnData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!returnData.clientName || !returnData.dueDate) {
      alert('يرجى ملء الحقول الإجبارية: اسم العميل وتاريخ الاستحقاق');
      return;
    }
    onSave(returnData);
    // تصفير الحقول
    setReturnData({
      clientName: '',
      returnType: 'قيمة مضافة',
      period: '',
      dueDate: '',
      amount: '',
      status: 'upcoming',
      notes: '',
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* رأس النافذة */}
        <div className="px-6 py-4 border-b border-[#e8dcc8] bg-[#faf6ec] rounded-t-xl">
          <h3 className="text-lg font-bold text-gray-800">
            ➕ إنشاء إقرار ضريبي جديد
          </h3>
        </div>

        {/* الحقول */}
        <div className="p-6 flex flex-col gap-4">

          {/* اسم العميل */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم العميل <span className="text-red-500">*</span>
            </label>
            <input
              name="clientName"
              value={returnData.clientName}
              onChange={handleChange}
              type="text"
              placeholder="مثال: شركة الأمل"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* نوع الإقرار */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع الإقرار
            </label>
            <select
              name="returnType"
              value={returnData.returnType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="قيمة مضافة">ضريبة القيمة المضافة</option>
              <option value="دخل سنوي">ضريبة الدخل السنوية</option>
              <option value="خصم وإضافة">الخصم والإضافة</option>
              <option value="مرتبات">ضريبة المرتبات</option>
            </select>
          </div>

          {/* الفترة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الفترة
            </label>
            <input
              name="period"
              value={returnData.period}
              onChange={handleChange}
              type="text"
              placeholder="مثال: الربع الثاني 2026"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* تاريخ الاستحقاق */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ الاستحقاق <span className="text-red-500">*</span>
            </label>
            <input
              name="dueDate"
              value={returnData.dueDate}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* المبلغ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المبلغ (ج.م)
            </label>
            <input
              name="amount"
              value={returnData.amount}
              onChange={handleChange}
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* الحالة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select
              name="status"
              value={returnData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="upcoming">قادم</option>
              <option value="due_today">مستحق اليوم</option>
              <option value="overdue">متأخر</option>
              <option value="filed">تم التقديم</option>
            </select>
          </div>

          {/* ملاحظات */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ملاحظات
            </label>
            <textarea
              name="notes"
              value={returnData.notes}
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
            className="px-6 py-2 rounded-lg border border-[#e8dcc8] bg-white text-gray-700 hover:bg-gray-50 transition-all"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
          >
            💾 حفظ الإقرار
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaxReturnModal;