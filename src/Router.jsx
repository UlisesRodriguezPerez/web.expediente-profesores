// components/RouterComponent.jsx

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Home } from './components/home/Home';
import { AdminDashboard } from './components/home/AdminDashboard/AdminDashboard';
import { UserDashboard } from './components/home/UserDashboard/UserDashboard';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { RoleBasedRoute } from './components/routes/RoleBasedRoute';
import { OpenPeriod } from './views/adminViews/OpenPeriod/OpenPeriodView';
import { SemesterWorkloadView } from './views/adminViews/SemesterWorkload/SemesterWorkloadView';
import { CourseAndActivityView } from './views/adminViews/CourseAndActivity/CourseAndActivityView';
import { ConsultView } from './views/adminViews/Consult/ConsultView';
import { HistoryView } from './views/userViews/History/HistoryView';
import { ActivityView } from './views/userViews/Activity/ActivityView';

// temp component
const TempComponent = () => {
  return (
    <div>
      <h1>Temp component</h1>
    </div>
  );
};

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
        <Route path="/consults" element={<RoleBasedRoute requiredRoles={['admin']} component={ConsultView} />} />
        <Route path="/activities" element={<RoleBasedRoute requiredRoles={['user']} component={ActivityView} />} />
        <Route path="/history" element={<RoleBasedRoute requiredRoles={['user']} component={HistoryView} />} />
        <Route path="/profile" element={<RoleBasedRoute requiredRoles={['user']} component={TempComponent} />} />
        <Route path="/courses" element={<RoleBasedRoute requiredRoles={['user']} component={TempComponent} />} />

        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
};

