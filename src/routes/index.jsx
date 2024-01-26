import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

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
      <Route path="/login" element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
      <Route path="/UserDashboard" element={<UserDashboard />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
