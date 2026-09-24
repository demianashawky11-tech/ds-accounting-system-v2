import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext'; // استيراد الـ Hook

const ClientsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage(); // استدعاء الترجمة من الـ Context
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('myClients') || '[]');
    setClients(savedClients);
  }, [location]);

  // دالة حذف العميل
  const deleteClient = (clientCode) => {
    // استخدمنا t هنا أيضاً لترجمة نص التنبيه
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      const updatedClients = clients.filter(c => c.code !== clientCode);
      setClients(updatedClients);
      localStorage.setItem('myClients', JSON.stringify(updatedClients));
    }
  };

  // فلترة العملاء
  const filteredClients = clients.filter(c => 
    (c.clientName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.code?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.fileNumber?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>👥 {t.clients.list_title}</h2> {/* تم تحديث العنوان */}
        
        <input 
          type="text" 
          placeholder={t.clients.search_placeholder} // تم تحديث مكان البحث
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <button 
          onClick={() => navigate('/clients/add')} 
          style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          ➕ {t.clients.add_new}
        </button>
      </div>
      
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'right' }}>
            <th style={{ padding: '12px' }}>{t.clients.client_name}</th>
            <th style={{ padding: '12px' }}>{t.clients.client_code}</th>
            <th style={{ padding: '12px' }}>{t.clients.file_number}</th>
            <th style={{ padding: '12px' }}>{t.actions.actions_col}</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>{client.clientName || '---'}</td>
              <td style={{ padding: '12px' }}>{client.code}</td>
              <td style={{ padding: '12px' }}>{client.fileNumber}</td>
              <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => navigate(`/clients/details/${client.code}`)} 
                  style={{ padding: '6px 12px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {t.actions.view_data}
                </button>
                <button 
                  onClick={() => deleteClient(client.code)} 
                  style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {t.actions.delete}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsPage;