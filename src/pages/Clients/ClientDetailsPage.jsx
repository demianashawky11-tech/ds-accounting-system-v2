import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const ClientDetailsPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('code', code)
          .single();

        if (error) throw error;
        setClient(data);
      } catch (err) {
        console.error('خطأ في جلب بيانات العميل:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (code) fetchClient();
  }, [code]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        ⏳ جاري تحميل البيانات من Supabase...
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="p-10 text-center">
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 inline-block">
          ⚠️ {error || 'لم يتم العثور على العميل'}
        </div>
        <br />
        <button
          onClick={() => navigate('/clients')}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
        >
          ← العودة للقائمة
        </button>
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
        تفاصيل العميل: {client.client_name}
      </h1>

      {/* التبويبات */}
      <div className="flex flex-wrap gap-2 mb-6 border-b-2 border-[#e8dcc8]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-base font-semibold transition-all rounded-t-lg ${
              activeTab === tab.id
                ? tab.color === 'blue'
                  ? 'text-blue-600 bg-white border-b-2 border-blue-500 -mb-0.5 shadow-sm'
                  : tab.color === 'emerald'
                  ? 'text-emerald-600 bg-white border-b-2 border-emerald-500 -mb-0.5 shadow-sm'
                  : 'text-violet-600 bg-white border-b-2 border-violet-500 -mb-0.5 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-[#faf6ec]'
            }`}
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
              <InfoRow label="رقم الملف" value={client.file_number} />
              <InfoRow label="اسم الممول" value={client.client_name} />
              <InfoRow label="الكيان القانوني" value={client.legal_entity} />
              <InfoRow label="المأمورية" value={client.tax_authority} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-blue-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              بيانات التواصل
            </h3>
            <div className="space-y-3">
              <InfoRow label="العنوان" value={client.address} />
              <InfoRow label="الممثل القانوني" value={client.legal_representative} />
              <InfoRow label="الرقم القومي" value={client.national_id} />
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
              <InfoRow label="البطاقة الضريبية" value={client.tax_card} />
              <InfoRow label="سارية حتى" value={client.tax_card_expiry} />
              <InfoRow label="النشاط" value={client.activity} />
              <InfoRow label="السجل التجاري" value={client.commercial_register} />
              <InfoRow label="تاريخ القيد" value={client.registration_date} />
              <InfoRow label="ساري حتى" value={client.commercial_expiry} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8dcc8]">
            <h3 className="text-lg font-bold text-emerald-600 mb-4 pb-2 border-b border-[#f0e9d8]">
              الضرائب
            </h3>
            <div className="space-y-3">
              <InfoRow label="ضريبة القيمة المضافة" value={client.vat_number} />
              <InfoRow label="ضريبة المرتبات" value={client.salary_tax} />
              <InfoRow label="الخصم تحت حساب الضريبة" value={client.withholding_tax} />
              <InfoRow label="الدفعات المقدمة" value={client.advance_payments} />
              <InfoRow label="حالة الملف" value={client.file_status} />
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
              <InfoRow label="اسم المستخدم" value={client.portal_username} />
              <InfoRow label="كلمة المرور" value={client.portal_password ? '••••••••' : null} />
              <InfoRow label="كلمة مرور ضريبة المرتبات" value={client.salary_password ? '••••••••' : null} />
              <InfoRow label="كلمة مرور البورتال" value={client.portal_login_password ? '••••••••' : null} />
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
  <div className="flex justify-between items-center py-2 border-b border-dashed border-[#f0e9d8] last:border-0">
    <span className="text-sm text-gray-500 font-medium">{label}:</span>
    <span className="text-sm text-gray-900 font-semibold">{value || '---'}</span>
  </div>
);

export default ClientDetailsPage;