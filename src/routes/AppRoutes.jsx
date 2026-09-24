import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import TaxReturnsPage from '../pages/TaxReturns/TaxReturnsPage'; // المسار الصحيح

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/tax-returns" element={<TaxReturnsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;