import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClientDetailsPage = () => {
  const { code } = useParams(); // استقبال الكود من الرابط
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // جلب كل العملاء والبحث عن العميل صاحب الكود الحالي
    const savedClients = JSON.parse(localStorage.getItem('myClients') || '[]');
    const foundClient = savedClients.find(c => c.code === code);
    setClient(foundClient);
  }, [code]);

  if (!client) return <div style={{ padding: '40px' }}>جاري تحميل البيانات...</div>;

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={() => navigate('/clients')} style={{ marginBottom: '20px', cursor: 'pointer' }}>← العودة للقائمة</button>
      <h2 style={{ borderBottom: '2px solid #2563eb', paddingBottom: '10px' }}>تفاصيل العميل: {client.clientName}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>البيانات الأساسية</h3>
          <p><strong>كود العميل:</strong> {client.code}</p>
          <p><strong>رقم الملف:</strong> {client.fileNumber}</p>
          <p><strong>الكيان القانوني:</strong> {client.legalEntity}</p>
          <p><strong>العنوان:</strong> {client.address}</p>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>البيانات الضريبية</h3>
          <p><strong>البطاقة الضريبية:</strong> {client.taxCard}</p>
          <p><strong>السجل التجاري:</strong> {client.commercialRegister}</p>
          <p><strong>القيمة المضافة:</strong> {client.vatNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
