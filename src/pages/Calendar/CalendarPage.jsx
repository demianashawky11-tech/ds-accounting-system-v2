import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CalendarPage = () => {
  const { t } = useTranslation();
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const appointments = [
    { id: 1, client: 'شركة الهدى للتجارة', task: 'إقرار القيمة المضافة', dueDate: '2026-07-15', status: 'upcoming' },
    { id: 2, client: 'مؤسسة النور للمقاولات', task: 'ضريبة الدخل السنوية', dueDate: '2026-07-03', status: 'due_today' },
    { id: 3, client: 'مصنع الشرق للبلاستيك', task: 'إقرار الخصم والإضافة', dueDate: '2026-06-25', status: 'overdue' },
    { id: 4, client: 'شركة الإبداع', task: 'تجديد السجل التجاري', dueDate: '2026-08-01', status: 'upcoming' },
  ];

  const processedData = appointments.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.task.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedData = [...processedData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // دالة مساعدة للون الشارة حسب الحالة
  const getStatusStyle = (status) => {
    switch (status) {
      case 'due_today':
        return 'bg-amber-100 text-amber-800';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'upcoming':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* العنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          📅 {t('navigation.calendar')}
        </h1>
      </div>

      {/* شريط الأدوات */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 بحث باسم العميل أو المهمة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-white border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="md:w-48 px-4 py-2 bg-white border border-[#e8dcc8] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">كل الحالات</option>
          <option value="due_today">مستحق اليوم</option>
          <option value="overdue">متأخر</option>
          <option value="upcoming">قادم</option>
        </select>
      </div>

      {/* الجدول */}
      <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-[#faf6ec] border-b border-[#e8dcc8]">
              <tr>
                {[
                  { key: 'client', label: 'العميل' },
                  { key: 'task', label: 'المهمة' },
                  { key: 'dueDate', label: 'تاريخ الاستحقاق' },
                  { key: 'status', label: 'الحالة' },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="p-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-[#f0e9d8] transition-colors"
                  >
                    {col.label}
                    {sortConfig.key === col.key && (
                      <span className="mr-1">{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e9d8]">
              {sortedData.length > 0 ? (
                sortedData.map((item) => (
                  <tr key={item.id} className="hover:bg-[#faf6ec] transition-colors">
                    <td className="p-4 font-medium text-gray-900">{item.client}</td>
                    <td className="p-4 text-gray-600">{item.task}</td>
                    <td className="p-4 text-gray-600">
                      <code className="bg-[#faf6ec] px-2 py-1 rounded text-sm">{item.dueDate}</code>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                        {item.status === 'due_today' ? 'مستحق اليوم'
                          : item.status === 'overdue' ? 'متأخر'
                          : 'قادم'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    لا توجد نتائج تطابق بحثك
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;