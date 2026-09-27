import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../lib/supabaseClient';

const ClientsPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب العملاء من Supabase
  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (err) {
      console.error('خطأ في جلب العملاء:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // حذف عميل
  const deleteClient = async (clientId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العميل؟')) return;

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);

      if (error) throw error;
      
      // تحديث القائمة محلياً
      setClients(clients.filter(c => c.id !== clientId));
      alert('تم حذف العميل بنجاح');
    } catch (err) {
      console.error('خطأ في الحذف:', err);
      alert('فشل حذف العميل: ' + err.message);
    }
  };

  // فلترة العملاء
  const filteredClients = clients.filter(c =>
    (c.client_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.code?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.file_number?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          👥 {t.clients.list_title}
        </h1>

        <input
          type="text"
          placeholder={t.clients.search_placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full md:w-[300px] border border-[#e8dcc8] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          onClick={() => navigate('/clients/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm"
        >
          + {t.clients.add_new}
        </button>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* الجدول */}
      <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead className="bg-[#faf6ec] border-b border-[#e8dcc8]">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700">{t.clients.client_name}</th>
              <th className="p-4 text-sm font-semibold text-gray-700">{t.clients.client_code}</th>
              <th className="p-4 text-sm font-semibold text-gray-700">{t.clients.file_number}</th>
              <th className="p-4 text-sm font-semibold text-gray-700">{t.actions.actions_col}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0e9d8]">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  ⏳ جاري التحميل من Supabase...
                </td>
              </tr>
            ) : filteredClients.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  {searchTerm ? 'لا توجد نتائج مطابقة للبحث' : 'لا توجد بيانات عملاء حتى الآن. اضغط "إضافة عميل جديد" للبدء.'}
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-[#faf6ec] transition-colors">
                  <td className="p-4 text-gray-900 font-medium">{client.client_name || '---'}</td>
                  <td className="p-4 text-gray-600">{client.code}</td>
                  <td className="p-4 text-gray-600">{client.file_number}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/clients/details/${client.code}`)}
                        className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-md transition-all shadow-sm"
                      >
                        {t.actions.view_data}
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-all shadow-sm"
                      >
                        {t.actions.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* عداد العملاء */}
      {!loading && clients.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          إجمالي العملاء: <strong>{clients.length}</strong>
          {searchTerm && ` | نتائج البحث: ${filteredClients.length}`}
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
