import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient';

const DashboardPage = () => {
  const { t } = useTranslation();

  const [stats, setStats] = useState({
    clients: 0,
    pendingReturns: 0,
    overdueReturns: 0,
    documents: 0,
    pendingTasks: 0,
    todayAppointments: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب كل الإحصائيات
  const fetchAllStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date().toISOString().split('T')[0];

      // جلب كل البيانات بالتوازي (أسرع!)
      const [
        clientsRes,
        pendingReturnsRes,
        overdueReturnsRes,
        documentsRes,
        pendingTasksRes,
        todayAppointmentsRes,
        recentClientsRes,
        recentReturnsRes,
        recentTasksRes,
      ] = await Promise.all([
        supabase.from('clients').select('*', { count: 'exact', head: true }),
        supabase.from('tax_returns').select('*', { count: 'exact', head: true }).eq('status', 'due_today'),
        supabase.from('tax_returns').select('*', { count: 'exact', head: true }).eq('status', 'overdue'),
        supabase.from('documents').select('*', { count: 'exact', head: true }),
        supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('due_date', today),
        supabase.from('clients').select('client_name, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('tax_returns').select('client_name, return_type, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('tasks').select('title, created_at').order('created_at', { ascending: false }).limit(3),
      ]);

      setStats({
        clients: clientsRes.count || 0,
        pendingReturns: pendingReturnsRes.count || 0,
        overdueReturns: overdueReturnsRes.count || 0,
        documents: documentsRes.count || 0,
        pendingTasks: pendingTasksRes.count || 0,
        todayAppointments: todayAppointmentsRes.count || 0,
      });

      // تجميع آخر الأنشطة
      const activities = [];
      (recentClientsRes.data || []).forEach(c => {
        activities.push({
          type: 'client',
          icon: '👤',
          text: `عميل جديد: ${c.client_name}`,
          date: c.created_at,
        });
      });
      (recentReturnsRes.data || []).forEach(r => {
        activities.push({
          type: 'return',
          icon: '📄',
          text: `إقرار جديد: ${r.client_name} - ${r.return_type}`,
          date: r.created_at,
        });
      });
      (recentTasksRes.data || []).forEach(t => {
        activities.push({
          type: 'task',
          icon: '✅',
          text: `مهمة جديدة: ${t.title}`,
          date: t.created_at,
        });
      });

      // ترتيب حسب التاريخ (الأحدث أولاً)
      activities.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentActivities(activities.slice(0, 5));

    } catch (err) {
      console.error('خطأ في جلب الإحصائيات:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  // تنسيق التاريخ (قبل كم)
  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 30) return `منذ ${diffDays} يوم`;
    return date.toLocaleDateString('ar-EG');
  };

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* الهيدر */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t('navigation.dashboard')}
        </h1>
        <p className="text-gray-500">
          {t('dashboard.welcome')} {t('dashboard.sub_text')}
        </p>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* شبكة الكروت */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* إجمالي العملاء */}
        <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl p-5 border-t-4 border-t-blue-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">👥</span>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">عملاء</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">إجمالي العملاء</p>
          <p className="text-3xl font-bold text-gray-900">
            {loading ? '...' : stats.clients}
          </p>
        </div>

        {/* الإقرارات المستحقة */}
        <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl p-5 border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">📄</span>
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">مستحق</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">إقرارات مستحقة اليوم</p>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? '...' : stats.pendingReturns}
          </p>
        </div>

        {/* الإقرارات المتأخرة */}
        <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl p-5 border-t-4 border-t-red-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">⚠️</span>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">متأخر</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">إقرارات متأخرة</p>
          <p className="text-3xl font-bold text-red-600">
            {loading ? '...' : stats.overdueReturns}
          </p>
        </div>

        {/* المستندات */}
        <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl p-5 border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">📁</span>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">أرشيف</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">المستندات المرفوعة</p>
          <p className="text-3xl font-bold text-emerald-600">
            {loading ? '...' : stats.documents}
          </p>
        </div>

      </div>

      {/* شبكة ثانية - صف ثاني */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

        {/* المهام المعلقة */}
        <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl p-5 border-t-4 border-t-violet-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">✅</span>
            <span className="text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded-full">مهام</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">مهام معلقة</p>
          <p className="text-3xl font-bold text-violet-600">
            {loading ? '...' : stats.pendingTasks}
          </p>
        </div>

        {/* مواعيد اليوم */}
        <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl p-5 border-t-4 border-t-rose-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">📅</span>
            <span className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-full">مواعيد</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">مواعيد اليوم</p>
          <p className="text-3xl font-bold text-rose-600">
            {loading ? '...' : stats.todayAppointments}
          </p>
        </div>

      </div>

      {/* آخر الأنشطة */}
      <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#e8dcc8] bg-[#faf6ec]">
          <h3 className="font-bold text-base text-gray-800">
            📋 آخر العمليات والتحديثات
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            ⏳ جاري التحميل من Supabase...
          </div>
        ) : recentActivities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            لا توجد أنشطة حتى الآن. ابدأ بإضافة عميل أو إقرار!
          </div>
        ) : (
          <div className="divide-y divide-[#f0e9d8]">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-[#faf6ec] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <span className="text-gray-700 font-medium">{activity.text}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(activity.date)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;