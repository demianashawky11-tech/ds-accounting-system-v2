import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddTaskModal = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  
  // حالة (State) لتخزين بيانات المهمة الجديدة
  const [taskData, setTaskData] = useState({
    title: '',
    employee: '',
    dueDate: '',
    priority: 'متوسطة',
    status: 'pending' // افتراضياً المهام الجديدة تكون معلقة
  });

  if (!isOpen) return null;

  // دالة التعامل مع التغيير في المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  // دالة الحفظ
  const handleSave = () => {
    onSave(taskData);
    // تصفير الحقول بعد الحفظ
    setTaskData({ title: '', employee: '', dueDate: '', priority: 'متوسطة', status: 'pending' });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '400px' }}>
        <h3 style={{ marginBottom: '20px' }}>{t('tasks.add_new')}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <input 
            name="title" value={taskData.title} onChange={handleChange}
            type="text" placeholder={t('tasks.task_name')} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
          
          <input 
            name="employee" value={taskData.employee} onChange={handleChange}
            type="text" placeholder={t('tasks.employee')} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
          
          <input 
            name="dueDate" value={taskData.dueDate} onChange={handleChange}
            type="date" 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
          
          <select 
            name="priority" value={taskData.priority} onChange={handleChange}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="عالية">عالية</option>
            <option value="متوسطة">متوسطة</option>
            <option value="منخفضة">منخفضة</option>
          </select>
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer' }}>{t('actions.cancel')}</button>
          <button onClick={handleSave} style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>{t('actions.save')}</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;