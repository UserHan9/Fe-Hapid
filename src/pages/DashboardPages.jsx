import { useState, useEffect } from 'react';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Cookies from 'js-cookie';

const DashboardPages = () => {
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

  const totalRegistrants = 3;
  const totalWinners = 1;
  const TotalPertandingan = 4;
  return (
    <div className="flex bg-green-50">
      <Sidebar />
      <div className="flex">
        <div className="hero min-h-screen">
          <div className="flex-col lg:flex-row-reverse w-full">
            <div className="px-32">
              <div className="m-10">
                <h1 className="text-5xl font-bold text-center ml-5">Hallo, Admin 🤚</h1>
                <p className="py-6 text-center text-2xl w-[500px] ml-32">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              </div>
              <div className="flex justify-center gap-10">
                <div className="mt-8">
                  <h2 className="text-3xl font-bold">Data Pendaftar</h2>
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <p className="text-2xl">Total Pendaftar: {totalRegistrants}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-3xl font-bold">Data Match</h2>
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <p className="text-2xl">Total Pertandingan: {TotalPertandingan}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-3xl font-bold">Data Pemenang</h2>
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <p className="text-2xl">Total Pemenang: {totalWinners}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
