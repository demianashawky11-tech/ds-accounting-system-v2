import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CalendarPage = () => {
  const { t } = useTranslation();
  
  // حالات النظام
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all'); // الفلتر
  const [searchQuery, setSearchQuery] = useState(''); // البحث

  const appointments = [
    { id: 1, client: 'شركة الهدى للتجارة', task: 'إقرار القيمة المضافة', dueDate: '2026-07-15', status: 'upcoming' },
    { id: 2, client: 'مؤسسة النور للمقاولات', task: 'ضريبة الدخل السنوية', dueDate: '2026-07-03', status: 'due_today' },
    { id: 3, client: 'مصنع الشرق للبلاستيك', task: 'إقرار الخصم والإضافة', dueDate: '2026-06-25', status: 'overdue' },
    { id: 4, client: 'شركة الإبداع', task: 'تجديد السجل التجاري', dueDate: '2026-08-01', status: 'upcoming' },
  ];

  // 1. دمج الفلترة والبحث معاً (هذا ما يجعل النظام مرناً)
  const processedData = appointments.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.task.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 2. الترتيب
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

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', color: 'var(--text-h)', marginBottom: '24px' }}>📅 {t('calendar.title') || 'التقويم والمواعيد'}</h2>

      {/* شريط الأدوات الذكي */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="🔍 بحث باسم العميل أو المهمة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 2, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
        />
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}
        >
          <option value="all">كل الحالات</option>
          <option value="due_today">مستحق اليوم</option>
          <option value="overdue">متأخر</option>
          <option value="upcoming">قادم</option>
        </select>
      </div>

      {/* الجدول */}
      <div style={{ backgroundColor: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'start' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--code-bg)', borderBottom: '1px solid var(--border)' }}>
              {['client', 'task', 'dueDate', 'status'].map((key) => (
                <th key={key} onClick={() => handleSort(key)} style={{ padding: '16px', color: 'var(--text-h)', fontWeight: '600', cursor: 'pointer' }}>
                  {key === 'client' ? 'العميل' : key === 'task' ? 'المهمة' : key === 'dueDate' ? 'تاريخ الاستحقاق' : 'الحالة'}
                  {sortConfig.key === key && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px', color: 'var(--text-h)' }}>{item.client}</td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}>{item.task}</td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}><code>{item.dueDate}</code></td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500',
                      backgroundColor: item.status === 'due_today' ? '#fef3c7' : item.status === 'overdue' ? '#fee2e2' : '#dcfce7',
                      color: item.status === 'due_today' ? '#92400e' : item.status === 'overdue' ? '#991b1b' : '#166534'
                    }}>
                      {item.status === 'due_today' ? 'مستحق اليوم' : item.status === 'overdue' ? 'متأخر' : 'قادم'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text)' }}>لا توجد نتائج تطابق بحثك</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarPage;