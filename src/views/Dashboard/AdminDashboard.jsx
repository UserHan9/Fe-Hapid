import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

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
    return (
      <div className="text-2xl">
        <div className='flex text-center'>
    <div className='mx-auto mt-[300px]'>
    <div className='text-3xl'>Anda tidak memiliki izin untuk mengakses halaman ini.
    <h1 className='mt-5'>Error 404 Not Found</h1>
    <div>
      <Link to="/DashboardUser"><button className='btn bg-yellow-500 text-[20px] mt-5'>Kembali Ke Halaman Utama</button></Link>
      </div>
    </div>
    </div>
    </div>
      </div>
    );
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
