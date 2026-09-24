import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const menuItems = [
    { path: '/dashboard', key: 'dashboard', icon: '🏠' },
    { path: '/follow-up', key: 'follow_up', icon: '⭐' },
    { path: '/clients', key: 'clients', icon: '👥' },
    { path: '/tax-returns', key: 'tax_returns', icon: '📄' },
    { path: '/documents', key: 'documents', icon: '📁' },
    { path: '/calendar', key: 'calendar', icon: '📅' },
    { path: '/legal-cases', key: 'legal_cases', icon: '⚖️' },
    { path: '/tasks', key: 'tasks', icon: '✅' },
    { path: '/employees', key: 'employees', icon: '👨‍💼' },
    { path: '/reports', key: 'reports', icon: '📊' },
    { path: '/notifications', key: 'notifications', icon: '🔔' },
    { path: '/import-export', key: 'import_export', icon: '📤' },
    { path: '/settings', key: 'settings', icon: '⚙️' },
    { path: '/profile', key: 'profile', icon: '👤' },
  ];

  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      height: '100vh',
      padding: '20px 15px',
      boxShadow: isRtl ? '-2px 0 5px rgba(0,0,0,0.05)' : '2px 0 5px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '10px 0', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #334155', marginBottom: '20px', textAlign: 'center' }}>
        {t('main_menu')}
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // خاصية end تضمن عدم نشاط الرابط إلا إذا كان المسار مطابقاً تماماً
            end={item.path === '/clients'} 
            style={({ isActive }) => ({
              padding: '10px 15px',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '6px',
              backgroundColor: isActive ? '#3b82f6' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s',
            })}
          >
            <span style={{ marginRight: '10px', marginLeft: '10px' }}>{item.icon}</span>
            {t(`navigation.${item.key}`)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;