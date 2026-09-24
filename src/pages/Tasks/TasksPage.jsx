import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddTaskModal from '../../components/modals/AddTaskModal'; 

const TasksPage = () => {
  const { t } = useTranslation();
  
  // 1. تحويل المهام إلى State لتتمكني من إضافة مهام جديدة
  const [tasks, setTasks] = useState([
    { id: 1, title: 'إعداد إقرار الربع الثاني', employee: 'أحمد علي', dueDate: '2026-07-10', priority: 'عالية', status: 'in_progress' },
    { id: 2, title: 'مراجعة قيود اليومية', employee: 'سارة محمود', dueDate: '2026-07-05', priority: 'متوسطة', status: 'pending' },
    { id: 3, title: 'تسجيل فواتير المشتريات', employee: 'خالد عمر', dueDate: '2026-07-08', priority: 'منخفضة', status: 'completed' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة النافذة

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.employee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // وظيفة لحفظ المهمة الجديدة
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text-h)', margin: 0 }}>✅ {t('tasks.title')}</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          + {t('tasks.add_new')}
        </button>
      </div>

      {/* شريط البحث والفلترة */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder={t('actions.search')} 
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 2, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
        />
        <select onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <option value="all">كل الحالات</option>
          <option value="pending">معلقة</option>
          <option value="in_progress">قيد التنفيذ</option>
          <option value="completed">مكتملة</option>
        </select>
      </div>

      <div style={{ backgroundColor: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--code-bg)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px', textAlign: 'start' }}>{t('tasks.task_name')}</th>
              <th style={{ padding: '16px', textAlign: 'start' }}>{t('tasks.employee')}</th>
              <th style={{ padding: '16px', textAlign: 'start' }}>{t('tasks.due_date')}</th>
              <th style={{ padding: '16px', textAlign: 'start' }}>{t('tasks.priority')}</th>
              <th style={{ padding: '16px', textAlign: 'start' }}>{t('tasks.status')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px' }}>{task.title}</td>
                <td style={{ padding: '16px' }}>{task.employee}</td>
                <td style={{ padding: '16px' }}>{task.dueDate}</td>
                <td style={{ padding: '16px' }}>{task.priority}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '6px', fontSize: '12px',
                    backgroundColor: task.status === 'completed' ? '#dcfce7' : '#fef3c7' 
                  }}>
                    {t(`tasks.${task.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* استدعاء النافذة */}
      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddTask} />
    </div>
  );
};

export default TasksPage;