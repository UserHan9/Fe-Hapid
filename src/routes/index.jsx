import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import DaftarlombaPages from '../pages/DaftarlombaPages.jsx';
import DashboardPages from '../pages/DashboardPages.jsx';
import DaftarLombaUser from '../UserPages/DaftarLombaUser.jsx';
import AddUser from '../pages/AddUser.jsx';
import Default from '../layouts/Default.jsx';

//import loader component
const Loader = lazy(() => import('../components/Loader.jsx'));

//import view Login
const Login = lazy(() => import('../views/Auth/Login.jsx'));
//Homepages/landing-page
const Homepages = lazy(() => import('../pages/HomePages.jsx'));

//import view dashboard
const UserDashboard = lazy(() => import('../views/Dashboard/UserDashboard.jsx'));
const AdminDashboard = lazy(() => import('../views/Dashboard/AdminDashboard.jsx'));

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/" */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Homepages />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
      {/* Route untuk admin */}
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/UserDashboard" element={<UserDashboard />} />
      <Route path="/DaftarLomba" element={<DaftarlombaPages />} />
      <Route path="/DashboardPages" element={<DashboardPages />} />
      <Route path="/AddUser" element={<AddUser />} />
      {/* Route untuk User */}
      <Route path="/LombaPages" element={<DaftarLombaUser />} />
    </Routes>
  );
}
