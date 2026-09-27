import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import AddTaxReturnModal from '../../components/modals/AddTaxReturnModal';
import { supabase } from '../../lib/supabaseClient';

const TaxReturnsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب الإقرارات من Supabase
  const fetchReturns = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('tax_returns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReturns(data || []);
    } catch (err) {
      console.error('خطأ في جلب الإقرارات:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  // إضافة إقرار جديد
  const handleAddReturn = async (newReturn) => {
    try {
      const { data, error } = await supabase
        .from('tax_returns')
        .insert([newReturn])
        .select();

      if (error) throw error;

      // تحديث القائمة محلياً
      setReturns([...(data || []), ...returns]);
      setIsModalOpen(false);
      alert('✅ تم حفظ الإقرار بنجاح');
    } catch (err) {
      console.error('خطأ في الحفظ:', err);
      alert('❌ فشل الحفظ: ' + err.message);
    }
  };

  // إحصاءات ديناميكية
  const totalReturns = returns.length;
  const overdueReturns = returns.filter(r => r.status === 'overdue').length;
  const dueTodayReturns = returns.filter(r => r.status === 'due_today').length;
  const missingDocs = 0;

  // فلترة
  const filteredReturns = returns.filter(r =>
    r.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.return_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'overdue':    return 'bg-red-100 text-red-700';
      case 'due_today':  return 'bg-amber-100 text-amber-800';
      case 'filed':      return 'bg-emerald-100 text-emerald-700';
      case 'upcoming':   return 'bg-blue-100 text-blue-700';
      default:           return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'overdue':    return 'متأخر';
      case 'due_today':  return 'مستحق اليوم';
      case 'filed':      return 'تم التقديم';
      case 'upcoming':   return 'قادم';
      default:           return status;
    }
  };

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">الإقرارات الضريبية</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all shadow-sm"
        >
          + إنشاء إقرار جديد
        </button>
      </div>

      {/* مربع البحث */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 بحث باسم العميل أو نوع الإقرار..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow-md border border-[#e8dcc8] rounded-xl">
          <p className="text-sm text-gray-500">إجمالي الإقرارات</p>
          <p className="text-xl font-bold text-gray-800">{totalReturns}</p>
        </div>
        <div className="p-4 bg-white shadow-md border border-[#e8dcc8] rounded-xl">
          <p className="text-sm text-gray-500">مستحق هذا الشهر</p>
          <p className="text-xl font-bold text-gray-800">{dueTodayReturns}</p>
        </div>
        <div className="p-4 bg-white shadow-md border border-[#e8dcc8] rounded-xl">
          <p className="text-sm text-gray-500">متأخر</p>
          <p className="text-xl font-bold text-red-600">{overdueReturns}</p>
        </div>
        <div className="p-4 bg-white shadow-md border border-[#e8dcc8] rounded-xl">
          <p className="text-sm text-gray-500">ينقصها مستندات</p>
          <p className="text-xl font-bold text-orange-500">{missingDocs}</p>
        </div>
      </div>

      {/* الجدول */}
      <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead className="bg-[#faf6ec] border-b border-[#e8dcc8]">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700">العميل</th>
              <th className="p-4 text-sm font-semibold text-gray-700">النوع</th>
              <th className="p-4 text-sm font-semibold text-gray-700">الفترة</th>
              <th className="p-4 text-sm font-semibold text-gray-700">تاريخ الاستحقاق</th>
              <th className="p-4 text-sm font-semibold text-gray-700">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0e9d8]">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  ⏳ جاري التحميل من Supabase...
                </td>
              </tr>
            ) : filteredReturns.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  {searchTerm ? 'لا توجد نتائج مطابقة' : 'لا توجد إقرارات حتى الآن. اضغط "+ إنشاء إقرار جديد" للبدء.'}
                </td>
              </tr>
            ) : (
              filteredReturns.map((item) => (
                <tr key={item.id} className="hover:bg-[#faf6ec] transition-colors">
                  <td className="p-4 font-medium text-gray-900">{item.client_name}</td>
                  <td className="p-4 text-gray-600">{item.return_type}</td>
                  <td className="p-4 text-gray-600">{item.period || '---'}</td>
                  <td className="p-4 text-gray-600">
                    <code className="bg-[#faf6ec] px-2 py-1 rounded text-sm">
                      {item.due_date || '---'}
                    </code>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* عداد */}
      {!loading && returns.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          إجمالي الإقرارات: <strong>{returns.length}</strong>
          {searchTerm && ` | نتائج البحث: ${filteredReturns.length}`}
        </div>
      )}

      {/* نافذة الإضافة */}
      <AddTaxReturnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddReturn}
      />
    </div>
  );
};

export default TaxReturnsPage;