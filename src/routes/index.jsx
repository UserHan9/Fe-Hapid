import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import DataKelas from '../pages/DataKelas.jsx';
import DashboardPages from '../pages/DashboardPages.jsx';
import DaftarLombaUser from '../UserPages/DaftarLombaUser.jsx';
import DataLomba from '../pages/DataLomba.jsx';
import JadwalLomba from '../pages/JadwalLomba.jsx';
import Pemenang from '../pages/Pemenang.jsx';
import Saran from '../pages/Saran.jsx';
import RiwayatDaftar from '../pages/RiwayatDaftar.jsx';

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
      <Route path="/DashboardPages" element={<DashboardPages />} />
      <Route path="/DataKelas" element={<DataKelas />} />
      <Route path="/DataLomba" element={<DataLomba />} />
      <Route path="/JadwalLomba" element={<JadwalLomba/>} />
      <Route path="/Pemenang" element={<Pemenang/>} />
      <Route path="/Saran" element={<Saran/>} />
      <Route path="/RiwayatDaftar" element={<RiwayatDaftar/>} />
      {/* Route untuk User */}
      <Route path="/LombaPages" element={<DaftarLombaUser />} />
      <Route path="/UserDashboard" element={<UserDashboard />} />
    </Routes>
  );
}
