import React, { useState } from 'react';
import { BsArrowLeftCircle, BsBrowserEdge } from 'react-icons/bs';
import { TbBinaryTree } from 'react-icons/tb';
import { MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Api from '../Api'; // Pastikan Anda mengimpor dan mengonfigurasi Api dengan benar
import Cookies from 'js-cookie'; // Pastikan Anda mengimpor Cookies dengan benar
import { toast } from 'react-hot-toast'; // Pastikan Anda mengimpor dan mengonfigurasi Toast dengan benar
import { MdOutlineSchedule } from 'react-icons/md';
import { IoMailOpenOutline, IoPersonAdd } from 'react-icons/io5';
import { PiMedalBold } from 'react-icons/pi';
import { FaRegBell } from 'react-icons/fa6';
import { PiBookOpenBold } from 'react-icons/pi';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();
  document.title = 'AdminDashboard';

  const handleLogout = async () => {
    try {
      await Api.post('/api/logout');
      // Hapus cookies yang diset pada saat login
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('permissions');
      Cookies.remove('role');

      // Hapus token dari localStorage (jika perlu)
      localStorage.removeItem('token');

      // Tampilkan untuk notifikasi sukses

      toast.success('Logout Succesfullyy!!', {
        position: 'top-center',
        style: {
          borderRadius: '0.5rem',
          backgroundColor: '#10B981', // Warna hijau
          padding: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: 'white',
        },
      });

      navigate('/');
    } catch (error) {
      console.error('Terjadi kesalahan saat logout:', error);
      // Tangani kesalahan atau tampilkan notifikasi kesalahan
      toast.error('Terjadi Kesalahan saat Logout', {
        position: 'top-right',
        duration: 4000,
      });
    }
  };

  const Menus = [
    { title: 'Dashboard', icon: <BsBrowserEdge />, path: '/DashboardPages' },
    { title: 'Data Peserta', icon: <PiBookOpenBold />, path: '/DataLomba' },
    { title: 'Jadwal Lomba', icon: <MdOutlineSchedule />, path: '/JadwalLomba' },
    { title: 'Create Account', spacing: true, icon: <IoPersonAdd />, path: '/UserAccount' },
    { title: 'Pemenang', icon: <PiMedalBold />, path: '/Pemenang' },
    { title: 'Kotak Saran', icon: <IoMailOpenOutline />, path: '/Saran' },
    { title: 'Posts Lomba', icon: <IoMailOpenOutline />, path: '/PostsLomba' },
    { title: 'Riwayat Daftar', icon: <FaRegBell />, spacing: true, path: '/RiwayatDaftar' },
    { title: 'Keseluruhan Data', icon: <FaRegBell />, path: '/RiwayatDaftar' },
    { title: 'Logout', icon: <MdOutlineLogout />, onsubmit: handleLogout },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex">
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? 'w-72' : 'w-20'} duration-300 relative`}>
        <BsArrowLeftCircle className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />

        <div className="inline-flex">
          <TbBinaryTree className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && 'rotate-[360deg]'}`} />

          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'}`}>SIMEET</h1>
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-green-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? 'mt-9' : 'mt-2'}`}
              onClick={() => (menu.onsubmit ? menu.onsubmit() : handleNavigate(menu.path))}
            >
              {menu.icon ? <span className="mr-2">{menu.icon}</span> : <img src="" alt="" className={`text-dark-purple transition-all duration-300 ${!open && 'filter grayscale'}`} />}
              <span className={`text-base font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
