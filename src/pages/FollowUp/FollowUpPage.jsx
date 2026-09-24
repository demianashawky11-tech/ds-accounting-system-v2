import React from 'react';
import { useTranslation } from 'react-i18next';

const FollowUpPage = () => {
  const { t } = useTranslation();

  const stats = [
    { title: "مواعيد اليوم", count: "05", color: "#2563eb" },
    { title: "إقرارات مستحقة", count: "03", color: "#dc2626" },
    { title: "مهام متأخرة", count: "02", color: "#d97706" },
    { title: "بلغوا حد التسجيل (VAT)", count: "04", color: "#059669" },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>
        {t('navigation.follow_up')}
      </h2>
      
      {/* بطاقات الإحصائيات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>{stat.title}</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: stat.color }}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* الجدول المحدث مع التاريخ والإجراء */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px', color: '#334155' }}>
          متابعة العملاء: التسجيل في القيمة المضافة
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
              <th style={{ padding: '12px 0' }}>العميل</th>
              <th style={{ padding: '12px 0' }}>حجم الأعمال</th>
              <th style={{ padding: '12px 0' }}>تاريخ التجاوز</th>
              <th style={{ padding: '12px 0' }}>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '16px 0' }}>شركة الرواد للتجارة</td>
              <td style={{ padding: '16px 0' }}>480,000 ج.م</td>
              <td style={{ padding: '16px 0' }}>2026-07-01</td>
              <td style={{ padding: '16px 0' }}>
                <button style={{ 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  padding: '6px 12px', 
                  borderRadius: '6px', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  بدء التسجيل
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowUpPage;