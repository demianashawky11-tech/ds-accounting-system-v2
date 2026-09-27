import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const InputField = ({ label, name, type = "text", readOnly = false, value, onChange, hasError }) => (
  <div className="flex items-center justify-end mb-4 w-full gap-4">
    <label className="text-base font-bold text-right text-gray-700 w-44">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-[300px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
        hasError ? 'border-red-500' : 'border-[#e8dcc8]'
      } ${readOnly ? 'bg-gray-100' : 'bg-white'}`}
    />
  </div>
);

const AddClientPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: `CLI-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // التحقق من الحقول الإجبارية
    const requiredFields = ['code', 'clientName', 'fileNumber'];
    const missing = requiredFields.filter(field => !formData[field]);

    if (missing.length > 0) {
      alert('يرجى ملء الحقول الإجبارية (رقم الملف، اسم الممول)');
      return;
    }

    setLoading(true);

    try {
      // إعداد البيانات للـ Supabase
      const clientData = {
        code: formData.code,
        client_name: formData.clientName,
        file_number: formData.fileNumber,
        legal_entity: formData.legalEntity || null,
        tax_authority: formData.taxAuthority || null,
        address: formData.address || null,
        legal_representative: formData.legalRepresentative || null,
        national_id: formData.nationalId || null,
        phone: formData.phone || null,
        email: formData.email || null,
        email_password: formData.emailPassword || null,
        tax_card: formData.taxCard || null,
        tax_card_expiry: formData.taxCardExpiry || null,
        activity: formData.activity || null,
        commercial_register: formData.commercialRegister || null,
        registration_date: formData.registrationDate || null,
        commercial_expiry: formData.commercialExpiry || null,
        vat_number: formData.vatNumber || null,
        salary_tax: formData.salaryTax || null,
        withholding_tax: formData.withholdingTax || null,
        advance_payments: formData.advancePayments || null,
        file_status: formData.fileStatus || null,
        portal_username: formData.portalUsername || null,
        portal_password: formData.portalPassword || null,
        salary_password: formData.salaryPassword || null,
        portal_login_password: formData.portalLoginPassword || null,
        token: formData.token || null,
      };

      // الحفظ في Supabase
      const { error } = await supabase
        .from('clients')
        .insert([clientData]);

      if (error) {
        console.error('خطأ Supabase:', error);
        throw error;
      }

      alert('✅ تم حفظ بيانات العميل بنجاح في قاعدة البيانات!');
      navigate('/clients');

    } catch (err) {
      console.error('خطأ في الحفظ:', err);
      alert('❌ فشل الحفظ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'البيانات الأساسية' },
    { id: 'tax', label: 'البيانات الضريبية' },
    { id: 'portal', label: 'البوابة والتوكن' },
  ];

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        إضافة عميل جديد
      </h2>

      {/* التبويبات */}
      <div className="flex justify-center gap-10 mb-10 border-b-2 border-[#e8dcc8] pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-lg font-bold transition-all ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-4 border-blue-600 pb-2'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-end w-full max-w-3xl ml-auto mr-auto">
        {activeTab === 'basic' && (
          <>
            <InputField label="كود العميل" name="code" value={formData.code} onChange={handleInputChange} readOnly={true} />
            <InputField label="رقم الملف" name="fileNumber" value={formData.fileNumber} onChange={handleInputChange} hasError={submitted && !formData.fileNumber} />
            <InputField label="إسم الممول - الشخص الإعتباري" name="clientName" value={formData.clientName} onChange={handleInputChange} hasError={submitted && !formData.clientName} />
            <InputField label="الكيان القانوني" name="legalEntity" value={formData.legalEntity} onChange={handleInputChange} />
            <InputField label="المأمورية التابع لها" name="taxAuthority" value={formData.taxAuthority} onChange={handleInputChange} />
            <InputField label="العنوان" name="address" value={formData.address} onChange={handleInputChange} />
            <InputField label="الممثل القانوني" name="legalRepresentative" value={formData.legalRepresentative} onChange={handleInputChange} />
            <InputField label="الرقم القومي" name="nationalId" value={formData.nationalId} onChange={handleInputChange} />
            <InputField label="رقم التليفون" name="phone" value={formData.phone} onChange={handleInputChange} />
            <InputField label="البريد الإلكتروني" name="email" value={formData.email} onChange={handleInputChange} />
            <InputField label="كلمة المرور للإيميل" name="emailPassword" value={formData.emailPassword} onChange={handleInputChange} />
          </>
        )}

        {activeTab === 'tax' && (
          <>
            <InputField label="البطاقة الضريبية" name="taxCard" value={formData.taxCard} onChange={handleInputChange} />
            <InputField label="البطاقة الضريبية سارية حتى" name="taxCardExpiry" type="date" value={formData.taxCardExpiry} onChange={handleInputChange} />
            <InputField label="النشاط" name="activity" value={formData.activity} onChange={handleInputChange} />
            <InputField label="السجل التجاري" name="commercialRegister" value={formData.commercialRegister} onChange={handleInputChange} />
            <InputField label="تاريخ القيد" name="registrationDate" type="date" value={formData.registrationDate} onChange={handleInputChange} />
            <InputField label="سارى حتى" name="commercialExpiry" type="date" value={formData.commercialExpiry} onChange={handleInputChange} />
            <InputField label="ضريبة القيمة المضافة" name="vatNumber" value={formData.vatNumber} onChange={handleInputChange} />
            <InputField label="ضريبة المرتبات" name="salaryTax" value={formData.salaryTax} onChange={handleInputChange} />
            <InputField label="الخصم تحت حساب الضريبة" name="withholdingTax" value={formData.withholdingTax} onChange={handleInputChange} />
            <InputField label="الدفعات المقدمة" name="advancePayments" value={formData.advancePayments} onChange={handleInputChange} />
            <InputField label="حالة الملف" name="fileStatus" value={formData.fileStatus} onChange={handleInputChange} />
          </>
        )}

        {activeTab === 'portal' && (
          <>
            <InputField label="إسم المستخدم للبوابة الإلكترونية" name="portalUsername" value={formData.portalUsername} onChange={handleInputChange} />
            <InputField label="كلمة المرور" name="portalPassword" value={formData.portalPassword} onChange={handleInputChange} />
            <InputField label="كلمة المرور لضريبة المرتبات" name="salaryPassword" value={formData.salaryPassword} onChange={handleInputChange} />
            <InputField label="كلمة المرور للبورتال" name="portalLoginPassword" value={formData.portalLoginPassword} onChange={handleInputChange} />
            <InputField label="التوكن" name="token" value={formData.token} onChange={handleInputChange} />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-8 px-16 py-3 text-lg font-bold rounded-lg shadow-md transition-all ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
          }`}
        >
          {loading ? '⏳ جاري الحفظ...' : '💾 حفظ البيانات'}
        </button>
      </form>
    </div>
  );
};

export default AddClientPage;