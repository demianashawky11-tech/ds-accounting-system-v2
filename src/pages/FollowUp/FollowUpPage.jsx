import React from 'react';
import { useTranslation } from 'react-i18next';

const FollowUpPage = () => {
  const { t } = useTranslation();

  const stats = [
    { title: "مواعيد اليوم", count: "05", color: "text-blue-600" },
    { title: "إقرارات مستحقة", count: "03", color: "text-red-600" },
    { title: "مهام متأخرة", count: "02", color: "text-orange-600" },
    { title: "بلغوا حد التسجيل (VAT)", count: "04", color: "text-emerald-600" },
  ];

  return (
    <div className="p-4 md:p-6 w-full h-full">

      {/* العنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('navigation.follow_up')}
        </h1>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 bg-white shadow-md border border-[#e8dcc8] rounded-xl"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* الجدول */}
      <div className="bg-white shadow-md border border-[#e8dcc8] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#e8dcc8] bg-[#faf6ec]">
          <h3 className="font-bold text-base text-gray-800">
            متابعة العملاء: التسجيل في القيمة المضافة
          </h3>
        </div>
        <table className="w-full text-right border-collapse">
          <thead className="bg-[#faf6ec] border-b border-[#e8dcc8]">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700">العميل</th>
              <th className="p-4 text-sm font-semibold text-gray-700">حجم الأعمال</th>
              <th className="p-4 text-sm font-semibold text-gray-700">تاريخ التجاوز</th>
              <th className="p-4 text-sm font-semibold text-gray-700">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0e9d8]">
            <tr className="hover:bg-[#faf6ec] transition-colors">
              <td className="p-4 font-medium text-gray-900">شركة الرواد للتجارة</td>
              <td className="p-4 text-gray-600">480,000 ج.م</td>
              <td className="p-4 text-gray-600">2026-07-01</td>
              <td className="p-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm rounded-md transition-all shadow-sm">
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