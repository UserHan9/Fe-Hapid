import React from 'react';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hallo, Admin 🤚</h1>
            <p className="py-6">Jika anda berada disini itu berarti anda adalah admin, mari lihat fitur-fitur yang telah kami buat. anda bisa akses tepat berada di sidebar kami</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
