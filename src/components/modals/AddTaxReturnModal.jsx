import React, { useState } from 'react';

const AddTaxReturnModal = ({ isOpen, onClose, onSave }) => {
  const [returnData, setReturnData] = useState({
    clientName: '',
    returnType: 'قيمة مضافة',
    dueDate: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReturnData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!returnData.clientName || !returnData.dueDate) {
      alert('يرجى ملء الحقول الإجبارية');
      return;
    }
    onSave(returnData);
    setReturnData({ clientName: '', returnType: 'قيمة مضافة', dueDate: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-[#e8dcc8] bg-[#faf6ec] rounded-t-xl">
          <h3 className="text-lg font-bold text-gray-800">إنشاء إقرار ضريبي جديد</h3>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم العميل *</label>
            <input name="clientName" value={returnData.clientName} onChange={handleChange} type="text" placeholder="مثال: شركة الأمل" className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع الإقرار</label>
            <select name="returnType" value={returnData.returnType} onChange={handleChange} className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="قيمة مضافة">ضريبة القيمة المضافة</option>
              <option value="دخل سنوي">ضريبة الدخل السنوية</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الاستحقاق *</label>
            <input name="dueDate" value={returnData.dueDate} onChange={handleChange} type="date" className="w-full px-4 py-2 border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#e8dcc8] bg-[#faf6ec] rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-lg border border-[#e8dcc8] bg-white text-gray-700 hover:bg-gray-50">إلغاء</button>
          <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm">حفظ الإقرار</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaxReturnModal;
