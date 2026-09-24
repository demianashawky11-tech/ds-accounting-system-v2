import React from 'react';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { t } = useTranslation();

  const cards = [
    { titleKey: 'dashboard.total_clients', value: '142', sub: '+ 12%', color: '#3b82f6' },
    { titleKey: 'dashboard.pending_invoices', value: '18', sub: '5 فواتير جديدة', color: '#f59e0b' },
    { titleKey: 'dashboard.uploaded_docs', value: '1,240', sub: '+ 48 هذا الأسبوع', color: '#10b981' },
    { titleKey: 'dashboard.monthly_revenue', value: '$24,500', sub: '+ 18.2%', color: '#8b5cf6' }
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', color: '#1e293b', marginBottom: '5px' }}>
          {t('navigation.dashboard')}
        </h2>
        <p style={{ color: '#64748b', margin: 0 }}>
          {t('dashboard.welcome')} {t('dashboard.sub_text')}
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {cards.map((card, idx) => (
          <div key={idx} style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            borderTop: `4px solid ${card.color}`,
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px' }}>
              {t(card.titleKey)}
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 5px 0' }}>
              {card.value}
            </p>
            <span style={{ fontSize: '12px', color: card.color, fontWeight: '500' }}>
              {card.sub}
            </span>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', textAlign: 'center' }}>
        <h4 style={{ color: '#1e293b', marginBottom: '10px' }}>
          {t('dashboard.recent_activities')}
        </h4>
        <p style={{ color: '#94a3b8', margin: 0 }}>
          {t('dashboard.no_alerts')}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;