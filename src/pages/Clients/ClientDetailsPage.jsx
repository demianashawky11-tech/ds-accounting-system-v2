import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClientDetailsPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('myClients') || '[]');
    const foundClient = savedClients.find(c => c.code === code);
    setClient(foundClient);
  }, [code]);

  if (!client) {
    return (
      <div className="p-10 text-center text-gray-500">
        جاري تحميل البيانات...
      </div>
    );
  }

  const tabs = [
    { id: 'basic',  label: 'البيانات الأساسية', color: 'blue' },
    { id: 'tax',    label: 'البيانات الضريبية', color: 'emerald' },
    { id: 'portal', label: 'البوابة والتوكن',   color: 'violet' },
  ];

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* زر العودة */}
      <button
        onClick={() => navigate('/clients')}
        className="mb-6 px-4 py-2 bg-white border border-[#e8dcc8] rounded-lg text-gray-700 hover:bg-[#faf6ec] transition-all shadow-sm"
      >
        ← العودة للقائمة
      </button>

      {/* العنوان */}
      <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6">
        تفاصيل العميل: {client.clientName}
      </h1>

      {/* التبويبات */}
      <div className="flex gap-2 mb-6 border-b-2 border-[#e8dcc8]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-3 text-base font-semibold transition-all rounded-t-lg
              ${activeTab === tab.id
                ? `text-${tab.color}-600 bg-white border-b-2 border-${tab.color}-500 -mb-0.5 shadow-sm`
                : 'text-gray-500 hover:text-gray-700 hover:bg-[#faf6ec]'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوى التبويبات */}
      {activeTab === 'basic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-blue-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              البيانات الأساسية
            </h3>
            <div className="space-y-3">
              <InfoRow label="كود العميل" value={client.code} />
              <InfoRow label="رقم الملف" value={client.fileNumber} />
              <InfoRow label="اسم الممول" value={client.clientName} />
              <InfoRow label="الكيان القانوني" value={client.legalEntity} />
              <InfoRow label="المأمورية" value={client.taxAuthority} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-blue-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              بيانات التواصل
            </h3>
            <div className="space-y-3">
              <InfoRow label="العنوان" value={client.address} />
              <InfoRow label="الممثل القانوني" value={client.legalRepresentative} />
              <InfoRow label="الرقم القومي" value={client.nationalId} />
              <InfoRow label="الهاتف" value={client.phone} />
              <InfoRow label="البريد الإلكتروني" value={client.email} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-emerald-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              البيانات الضريبية
            </h3>
            <div className="space-y-3">
              <InfoRow label="البطاقة الضريبية" value={client.taxCard} />
              <InfoRow label="سارية حتى" value={client.taxCardExpiry} />
              <InfoRow label="النشاط" value={client.activity} />
              <InfoRow label="السجل التجاري" value={client.commercialRegister} />
              <InfoRow label="تاريخ القيد" value={client.registrationDate} />
              <InfoRow label="ساري حتى" value={client.commercialExpiry} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-emerald-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              الضرائب
            </h3>
            <div className="space-y-3">
              <InfoRow label="ضريبة القيمة المضافة" value={client.vatNumber} />
              <InfoRow label="ضريبة المرتبات" value={client.salaryTax} />
              <InfoRow label="الخصم تحت حساب الضريبة" value={client.withholdingTax} />
              <InfoRow label="الدفعات المقدمة" value={client.advancePayments} />
              <InfoRow label="حالة الملف" value={client.fileStatus} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-violet-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              البوابة الإلكترونية
            </h3>
            <div className="space-y-3">
              <InfoRow label="اسم المستخدم" value={client.portalUsername} />
              <InfoRow label="كلمة المرور" value={client.portalPassword ? '••••••••' : null} />
              <InfoRow label="كلمة مرور ضريبة المرتبات" value={client.salaryPassword ? '••••••••' : null} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-violet-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              التوكن
            </h3>
            <div className="space-y-3">
              <InfoRow label="التوكن" value={client.token} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// مكوّن مساعد لعرض صف من المعلومات
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-1 border-b border-dashed border-[#f0e9d8] last:border-0">
    <span className="text-sm text-gray-500 font-medium">{label}:</span>
    <span className="text-sm text-gray-900 font-semibold">{value || '---'}</span>
  </div>
);

export default ClientDetailsPage;