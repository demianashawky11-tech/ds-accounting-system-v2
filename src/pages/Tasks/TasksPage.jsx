import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddTaskModal from '../../components/modals/AddTaskModal';
import { supabase } from '../../lib/supabaseClient';

const TasksPage = () => {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب المهام من Supabase
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('خطأ في جلب المهام:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // إضافة مهمة جديدة
  const handleAddTask = async (newTask) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select();

      if (error) throw error;

      setTasks([...(data || []), ...tasks]);
      setIsModalOpen(false);
      alert('✅ تم حفظ المهمة بنجاح');
    } catch (err) {
      console.error('خطأ في الحفظ:', err);
      alert('❌ فشل الحفظ: ' + err.message);
    }
  };

  // حذف مهمة
  const deleteTask = async (taskId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه المهمة؟')) return;
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('خطأ في الحذف:', err);
      alert('فشل الحذف: ' + err.message);
    }
  };

  // فلترة
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch =
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.employee?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // ألوان الحالة
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':   return 'bg-emerald-100 text-emerald-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'pending':     return 'bg-amber-100 text-amber-800';
      default:            return 'bg-gray-100 text-gray-700';
    }
  };

  // ألوان الأولوية
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'عالية':    return 'text-red-600 font-semibold';
      case 'متوسطة':   return 'text-amber-600 font-semibold';
      case 'منخفضة':   return 'text-emerald-600 font-semibold';
      default:         return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          ✅ {t('tasks.title')}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm"
        >
          + {t('tasks.add_new')}
        </button>
      </div>

      {/* البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder={t('actions.search')}
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
          <option value="pending">معلقة</option>
          <option value="in_progress">قيد التنفيذ</option>
          <option value="completed">مكتملة</option>
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
                <th className="p-4 text-sm font-semibold text-gray-700">{t('tasks.task_name')}</th>
                <th className="p-4 text-sm font-semibold text-gray-700">{t('tasks.employee')}</th>
                <th className="p-4 text-sm font-semibold text-gray-700">{t('tasks.due_date')}</th>
                <th className="p-4 text-sm font-semibold text-gray-700">{t('tasks.priority')}</th>
                <th className="p-4 text-sm font-semibold text-gray-700">{t('tasks.status')}</th>
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
              ) : filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    لا توجد مهام مطابقة
                  </td>
                </tr>
              ) : (
                filteredTasks.map(task => (
                  <tr key={task.id} className="hover:bg-[#faf6ec] transition-colors">
                    <td className="p-4 font-medium text-gray-900">{task.title}</td>
                    <td className="p-4 text-gray-600">{task.employee}</td>
                    <td className="p-4 text-gray-600">
                      <code className="bg-[#faf6ec] px-2 py-1 rounded text-sm">{task.due_date}</code>
                    </td>
                    <td className={`p-4 ${getPriorityStyle(task.priority)}`}>
                      {task.priority}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(task.status)}`}>
                        {t(`tasks.${task.status}`)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteTask(task.id)}
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
      {!loading && tasks.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          إجمالي المهام: <strong>{tasks.length}</strong>
        </div>
      )}

      {/* نافذة إضافة مهمة */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
      />
    </div>
  );
};

export default TasksPage;