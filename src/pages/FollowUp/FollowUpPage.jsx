import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient';
import AddFollowUpModal from '../../components/modals/AddFollowUpModal';

const FollowUpPage = () => {
  const { t } = useTranslation();

  const [followUps, setFollowUps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب المتابعات من Supabase
  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('follow_ups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFollowUps(data || []);
    } catch (err) {
      console.error('خطأ في جلب المتابعات:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);

  // إضافة متابعة
  const handleAddFollowUp = async (newFollowUp) => {
    try {
      const { data, error } = await supabase
        .from('follow_ups')
        .insert([newFollowUp])
        .select();

      if (error) throw error;

      setFollowUps([...(data || []), ...followUps]);
      setIsModalOpen(false);
      alert('✅ تم حفظ المتابعة بنجاح');
    } catch (err) {
      console.error('خطأ في الحفظ:', err);
      alert('❌ فشل الحفظ: ' + err.message);
    }
  };

  // حذف متابعة
  const deleteFollowUp = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه المتابعة؟')) return;
    try {
      const { error } = await supabase
        .from('follow_ups')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFollowUps(followUps.filter(f => f.id !== id));
    } catch (err) {
      console.error('خطأ في الحذف:', err);
      alert('فشل الحذف: ' + err.message);
    }
  };

  // إحصائيات ديناميكية
  const stats = [
    {
      title: 'إجمالي المتابعات',
      count: followUps.length,
      color: 'text-gray-800'
    },
    {
      title: 'قيد المتابعة',
      count: followUps.filter(f => f.status === 'pending').length,
      color: 'text-amber-600'
    },
    {
      title: 'جاري التنفيذ',
      count: followUps.filter(f => f.status === 'in_progress').length,
      color: 'text-blue-600'
    },
    {
      title: 'مكتملة',
      count: followUps.filter(f => f.status === 'done').length,
      color: 'text-emerald-600'
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'done':        return 'bg-emerald-100 text-emerald-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'pending':     return 'bg-amber-100 text-amber-800';
      default:            return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'done':        return 'مكتمل';
      case 'in_progress': return 'جاري التنفيذ';
      case 'pending':     return 'قيد المتابعة';
      default:            return status;
    }
  };

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* العنوان */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          ⭐ {t('navigation.follow_up')}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm"
        >
          + إضافة متابعة جديدة
        </button>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 bg-white shadow-md border border-[#e8dcc8] rounded-xl"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* الجدول */}
      <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#e8dcc8] bg-[#faf6ec]">
          <h3 className="font-bold text-base text-gray-800">
            متابعة العملاء: التسجيل في القيمة المضافة
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-[#faf6ec] border-b border-[#e8dcc8]">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-700">العميل</th>
                <th className="p-4 text-sm font-semibold text-gray-700">حجم الأعمال</th>
                <th className="p-4 text-sm font-semibold text-gray-700">تاريخ التجاوز</th>
                <th className="p-4 text-sm font-semibold text-gray-700">الإجراء</th>
                <th className="p-4 text-sm font-semibold text-gray-700">الحالة</th>
                <th className="p-4 text-sm font-semibold text-gray-700">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e9d8]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    ⏳ جاري التحميل من Supabase...
                  </td>
                </tr>
              ) : followUps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    لا توجد متابعات حتى الآن. اضغط "+ إضافة متابعة جديدة" للبدء.
                  </td>
                </tr>
              ) : (
                followUps.map((item) => (
                  <tr key={item.id} className="hover:bg-[#faf6ec] transition-colors">
                    <td className="p-4 font-medium text-gray-900">{item.client}</td>
                    <td className="p-4 text-gray-600">
                      {item.work_volume ? `${Number(item.work_volume).toLocaleString()} ج.م` : '---'}
                    </td>
                    <td className="p-4 text-gray-600">
                      <code className="bg-[#faf6ec] px-2 py-1 rounded text-sm">
                        {item.exceeded_date || '---'}
                      </code>
                    </td>
                    <td className="p-4 text-gray-600">{item.action || '---'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteFollowUp(item.id)}
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

      {/* نافذة إضافة متابعة */}
      <AddFollowUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddFollowUp}
      />
    </div>
  );
};

export default FollowUpPage;