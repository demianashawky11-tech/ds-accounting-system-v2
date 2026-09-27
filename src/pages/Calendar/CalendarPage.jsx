import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient';
import AddAppointmentModal from '../../components/modals/AddAppointmentModal';

const CalendarPage = () => {
  const { t } = useTranslation();

  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب المواعيد من Supabase
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('خطأ في جلب المواعيد:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // إضافة موعد
  const handleAddAppointment = async (newAppointment) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([newAppointment])
        .select();

      if (error) throw error;

      setAppointments([...(data || []), ...appointments]);
      setIsModalOpen(false);
      alert('✅ تم حفظ الموعد بنجاح');
    } catch (err) {
      console.error('خطأ في الحفظ:', err);
      alert('❌ فشل الحفظ: ' + err.message);
    }
  };

  // حذف موعد
  const deleteAppointment = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAppointments(appointments.filter(a => a.id !== id));
    } catch (err) {
      console.error('خطأ في الحذف:', err);
      alert('فشل الحذف: ' + err.message);
    }
  };

  // فلترة وترتيب
  const processedData = appointments.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch =
      item.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.task?.toLowerCase().includes(searchQuery.toLowerCase());
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

  // ألوان الحالة
  const getStatusStyle = (status) => {
    switch (status) {
      case 'due_today':  return 'bg-amber-100 text-amber-800';
      case 'overdue':    return 'bg-red-100 text-red-700';
      case 'completed':  return 'bg-emerald-100 text-emerald-700';
      case 'upcoming':   return 'bg-blue-100 text-blue-700';
      default:           return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'due_today':  return 'مستحق اليوم';
      case 'overdue':    return 'متأخر';
      case 'completed':  return 'مكتمل';
      case 'upcoming':   return 'قادم';
      default:           return status;
    }
  };

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          📅 {t('navigation.calendar')}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm"
        >
          + إضافة موعد جديد
        </button>
      </div>

      {/* البحث والفلترة */}
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
          <option value="completed">مكتمل</option>
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
                <th
                  onClick={() => handleSort('client')}
                  className="p-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-[#f0e9d8] transition-colors"
                >
                  العميل
                  {sortConfig.key === 'client' && (
                    <span className="mr-1">{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                  )}
                </th>
                <th
                  onClick={() => handleSort('task')}
                  className="p-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-[#f0e9d8] transition-colors"
                >
                  المهمة
                  {sortConfig.key === 'task' && (
                    <span className="mr-1">{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                  )}
                </th>
                <th
                  onClick={() => handleSort('due_date')}
                  className="p-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-[#f0e9d8] transition-colors"
                >
                  تاريخ الاستحقاق
                  {sortConfig.key === 'due_date' && (
                    <span className="mr-1">{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                  )}
                </th>
                <th className="p-4 text-sm font-semibold text-gray-700">الحالة</th>
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
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    {searchQuery || filterStatus !== 'all'
                      ? 'لا توجد نتائج مطابقة'
                      : 'لا توجد مواعيد حتى الآن. اضغط "+ إضافة موعد جديد" للبدء.'}
                  </td>
                </tr>
              ) : (
                sortedData.map((item) => (
                  <tr key={item.id} className="hover:bg-[#faf6ec] transition-colors">
                    <td className="p-4 font-medium text-gray-900">{item.client}</td>
                    <td className="p-4 text-gray-600">{item.task}</td>
                    <td className="p-4 text-gray-600">
                      <code className="bg-[#faf6ec] px-2 py-1 rounded text-sm">{item.due_date}</code>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteAppointment(item.id)}
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
      {!loading && appointments.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          إجمالي المواعيد: <strong>{appointments.length}</strong>
          {(searchQuery || filterStatus !== 'all') && ` | نتائج البحث: ${sortedData.length}`}
        </div>
      )}

      {/* نافذة إضافة موعد */}
      <AddAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAppointment}
      />
    </div>
  );
};

export default CalendarPage;