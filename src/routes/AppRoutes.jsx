import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import TaxReturnsPage from '../pages/TaxReturns/TaxReturnsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* الصفحة الرئيسية → تحويل تلقائي إلى /tax-returns */}
        <Route path="/" element={<Navigate to="/tax-returns" replace />} />

        {/* الصفحة الموجودة حالياً */}
        <Route path="/tax-returns" element={<TaxReturnsPage />} />

        {/* أي مسار غير معروف → إعادة توجيه */}
        <Route path="*" element={<Navigate to="/tax-returns" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;