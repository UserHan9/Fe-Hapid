import React, { lazy, Suspense, Navigate } from 'react';
import { Routes, Route } from 'react-router-dom';
import DataKelas from '../pages/DataKelas.jsx';
import DashboardPages from '../pages/DashboardPages.jsx';
import DaftarLombaUser from '../UserPages/Dashboard.jsx';
import DataLomba from '../pages/DataLomba.jsx';
import JadwalLomba from '../pages/JadwalLomba.jsx';
import Pemenang from '../pages/Pemenang.jsx';
import Saran from '../pages/Saran.jsx';
import RiwayatDaftar from '../pages/RiwayatDaftar.jsx';
import Profile from '../UserPages/Profile.jsx';
import DashboardUser from '../UserPages/DashboardUser.jsx';
import PendaftaranLomba from '../UserPages/PendaftaranLomba.jsx';
import JadwalLombaUser from '../UserPages/JadwalLombaUser.jsx';
import PemenangUser from '../UserPages/PemenangUser.jsx';
import RiwayatDaftarUser from '../UserPages/RiwayatDaftarUser.jsx';
import SaranUser from '../UserPages/SaranUser.jsx';
import PostsLomba from '../pages/PostsLomba.jsx';
import AddUserForm from '../components/AddUserForm.jsx';
import UserAccount from '../pages/UserAccount.jsx';
// import ErrorPage from '../pages/404.jsx';
import PemenangLomba from '../pages/PemenangLomba.jsx';
import CreatePemenang from '../pages/CreatePemenang.jsx';
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
      <Route
        path="/MendaftarLomba/:id"
        element={
          <Suspense fallback={<Loader />}>
            <AddUserForm />
          </Suspense>
        }
      />
      <Route
        path="/CreatePemenang/:id"
        element={
          <Suspense fallback={<Loader />}>
            <CreatePemenang />
          </Suspense>
        }
      />
      {/* Route untuk admin */}
      <Route path="/DashboardAdmin" element={<AdminDashboard />} />
      <Route path="/AdminDashboard" element={<DashboardPages />} />
      <Route path="/DataKelas" element={<DataKelas />} />
      <Route path="/DataLomba" element={<DataLomba />} />
      <Route path="/JadwalLomba" element={<JadwalLomba />} />
      <Route path="/Pemenang" element={<Pemenang />} />
      <Route path="/Saran" element={<Saran />} />
      <Route path="/PostsLomba" element={<PostsLomba />} />
      <Route path="/UserAccount" element={<UserAccount />} />
      <Route path="/RiwayatDaftar" element={<RiwayatDaftar />} />
      <Route path="/Posts" element={<PostsLomba />} />
      <Route path="/PemenangLomba" element={<PemenangLomba />} />
      {/* <Route path="/CreatePemenang" element={<CreatePemenang />} /> */}
      {/* Route untuk User */}
      <Route path="/DaftarLomba" element={<DaftarLombaUser />} />
      <Route path="/DashboardUser" element={<DashboardUser />} />
      <Route path="/UserDashboard" element={<UserDashboard />} />
      <Route path="/ProfileDashboard" element={<Profile />} />
      <Route path="/PendaftarLomba" element={<PendaftaranLomba />} />
      <Route path="/JadwalLombaUser" element={<JadwalLombaUser />} />
      <Route path="/PemenangUser" element={<PemenangUser />} />
      <Route path="/RiwayatUser" element={<RiwayatDaftarUser />} />
      <Route path="/SaranUser" element={<SaranUser />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
}
