import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Mendapatkan nilai peran dari cookie
    const role = Cookies.get('role');
    // Periksa apakah pengguna memiliki peran admin
    setIsAdmin(role && JSON.parse(role).includes('admin')); // Mengubah kondisi di sini
    
    console.log('Role:', role); // Tambahkan console log di sini
  }, []);

  if (!isAdmin) {
    return <div>Anda tidak memiliki izin untuk mengakses halaman ini.</div>;
  }

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
