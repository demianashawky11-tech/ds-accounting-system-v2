import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// استيراد الصفحات
import DashboardPage from '../pages/Dashboard/DashboardPage';
import FollowUpPage from '../pages/FollowUp/FollowUpPage';
import ClientsPage from '../pages/Clients/ClientsPage';
import AddClientPage from '../pages/Clients/AddClientPage';
import ClientDetailsPage from '../pages/Clients/ClientDetailsPage';
import TaxReturnsPage from '../pages/TaxReturns/TaxReturnsPage';
import ReturnDetails from '../pages/TaxReturns/ReturnDetails';
import DocumentsPage from '../pages/Documents/DocumentsPage';
import CalendarPage from '../pages/Calendar/CalendarPage';
import TasksPage from '../pages/Tasks/TasksPage';
import ReportsPage from '../pages/Reports/ReportsPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import LoginPage from '../pages/Login/LoginPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* صفحة تسجيل الدخول (بدون Layout) */}
      <Route path="/login" element={<LoginPage />} />

      {/* الصفحات داخل MainLayout */}
      <Route element={<MainLayout />}>
        {/* الصفحة الرئيسية → لوحة التحكم */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* الصفحات الأساسية */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/follow-up" element={<FollowUpPage />} />

        {/* العملاء */}
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/add" element={<AddClientPage />} />
        <Route path="/clients/:id" element={<ClientDetailsPage />} />

        {/* الإقرارات الضريبية */}
        <Route path="/tax-returns" element={<TaxReturnsPage />} />
        <Route path="/tax-returns/:id" element={<ReturnDetails />} />

        {/* الأرشيف والمستندات */}
        <Route path="/documents" element={<DocumentsPage />} />

        {/* التقويم والمهام */}
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/tasks" element={<TasksPage />} />

        {/* التقارير والإعدادات */}
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* الصفحات الناقصة حالياً → سنبنيها لاحقاً */}
        {/* <Route path="/legal-cases" element={<LegalCasesPage />} /> */}
        {/* <Route path="/employees" element={<EmployeesPage />} /> */}
        {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
        {/* <Route path="/import-export" element={<ImportExportPage />} /> */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}

        {/* أي مسار غير معروف → صفحة 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;