// components/RouterComponent.jsx

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Home } from './components/home/Home';
import { AdminDashboard } from './components/home/AdminDashboard/AdminDashboard';
import { UserDashboard } from './components/home/userDashboard';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { RoleBasedRoute } from './components/routes/RoleBasedRoute';
import { OpenPeriod } from './views/adminViews/OpenPeriod/OpenPeriodView';
import { SemesterWorkloadView } from './views/adminViews/SemesterWorkload/SemesterWorkloadView';
import { CourseAndActivityView } from './views/adminViews/CourseAndActivity/CourseAndActivityView';
import { PerfilAdminView } from './views/adminViews/PerfilAdmin/PerfilAdminView';
import { PerfilTeacherView } from './views/teacherViews/PerfilTeacher/PerfilTeacherView';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={Home} />} />
        <Route path="/register" element={<RoleBasedRoute requiredRoles={['admin']} component={Register} />} />
        <Route path="/admin-dashboard" element={<RoleBasedRoute requiredRoles={['admin']} component={AdminDashboard} />} />
        <Route path="/user-dashboard" element={<RoleBasedRoute requiredRoles={['user', 'admin']} component={UserDashboard} />} />
        <Route path="/open-period" element={<RoleBasedRoute requiredRoles={['admin']} component={OpenPeriod} />} />
        <Route path="/semester-workload" element={<RoleBasedRoute requiredRoles={['admin']} component={SemesterWorkloadView} />} />
        <Route path="/courses-and-activities" element={<RoleBasedRoute requiredRoles={['admin']} component={CourseAndActivityView} />} />
        <Route path="/perfil-admin" element={<RoleBasedRoute requiredRoles={['admin']} component={PerfilAdminView} />} />
        <Route path="/perfil-teacher" element={<RoleBasedRoute requiredRoles={['admin']} component={PerfilTeacherView} />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
};

