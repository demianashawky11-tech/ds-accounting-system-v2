import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// المكون الخارجي لضمان استقرار الكتابة
const InputField = ({ label, name, type = "text", readOnly = false, value, onChange, hasError }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '18px', width: '100%' }}>
    <label style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'right', marginRight: '20px' }}>
      {label}
    </label>
    <input 
      type={type} 
      name={name} 
      value={value || ''} 
      onChange={onChange}
      readOnly={readOnly}
      style={{ 
        width: '300px', 
        padding: '10px', 
        border: hasError ? '2px solid red' : '1px solid #000', 
        borderRadius: '4px',
        backgroundColor: readOnly ? '#f3f4f6' : '#fff'
      }} 
    />
  </div>
);

const AddClientPage = () => {
  const navigate = useNavigate(); // إضافة navigate للانتقال بعد الحفظ
  const [activeTab, setActiveTab] = useState('basic');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    code: `CLI-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // التحقق من الحقول الإجبارية
    const requiredFields = ['code', 'clientName', 'fileNumber'];
    const missing = requiredFields.filter(field => !formData[field]);

    if (missing.length > 0) {
      alert("يرجى ملء الحقول الإجبارية (رقم الملف، إسم الممول)");
      return;
    }

    // منطق الحفظ في localStorage
    const existingClients = JSON.parse(localStorage.getItem('myClients') || '[]');
    const updatedClients = [...existingClients, formData];
    localStorage.setItem('myClients', JSON.stringify(updatedClients));
    
    console.log("تم حفظ بيانات العميل:", formData);
    alert("تم حفظ بيانات العميل بنجاح!");
    
    // الانتقال لصفحة العملاء بعد الحفظ
    navigate('/clients');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>إضافة عميل جديد</h2>

      {/* التبويبات */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        {['basic', 'tax', 'portal'].map((id, index) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ fontSize: '18px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer',
            color: activeTab === id ? '#000' : '#888', borderBottom: activeTab === id ? '3px solid #000' : 'none' }}>
            {['البيانات الأساسية', 'البيانات الضريبية', 'البوابة والتوكن'][index]}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        width: '100%',
        maxWidth: '800px', 
        marginRight: '0', 
        marginLeft: 'auto' 
      }}>
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

        <button type="submit" style={{ 
          marginTop: '20px', 
          padding: '12px 60px', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          backgroundColor: '#abcfe8', 
          border: '1px solid #000', 
          cursor: 'pointer',
          marginRight: '220px' 
        }}>
          حفظ
        </button>
      </form>
    </div>
  );
};

export default AddClientPage;