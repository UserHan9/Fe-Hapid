import React, { useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { TbBinaryTree } from 'react-icons/tb';
import { MdOutlineDashboard, MdOutlineLogout, MdSchedule } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import { BsBrowserEdge } from 'react-icons/bs';
import Api from '../Api'; // Pastikan Anda mengimpor dan mengonfigurasi Api dengan benar
import Cookies from 'js-cookie'; // Pastikan Anda mengimpor Cookies dengan benar
import { toast } from 'react-hot-toast'; // Pastikan Anda mengimpor dan mengonfigurasi Toast dengan benar
import 'react-toastify/dist/ReactToastify.css';
import { PiMedalBold } from 'react-icons/pi';
import { IoMailOpenOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa6';
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidFileExport } from "react-icons/bi";

const SidebarUser = () => {
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
    { title: 'Dashboard', icon: <MdOutlineDashboard />, path: '/DashboardUser' },
    { title: 'Profile', icon: <BsBrowserEdge />, path: '/ProfileDashboard' },
    { title: 'Daftar-Lomba', icon: <FaClipboardList />, path: '/PendaftarLomba' },
    { title: 'Jadwal-Lomba', icon: <MdSchedule />,  spacing: true, path: '/JadwalLombaUser' },
    { title: 'Pemenang', icon: <PiMedalBold />, path: '/PemenangUser' },
    { title: 'Kotak-Saran', icon: <IoMailOpenOutline />, path: '/SaranUser' },
    { title: 'Riwayat Daftar', icon: <FaRegBell />, spacing: true, path: '/RiwayatUser' },
    { title: 'Export Data', icon: <BiSolidFileExport />, path: '/ExportUser' },
    { title: 'Logout', icon: <MdOutlineLogout />, onsubmit: handleLogout },
  ];

 const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="sticky overflow-y-auto h-full flex">
    <div className={`bg-dark-purple h-screen overflow-y-auto p-5 pt-8 ${open ? 'w-[320px]' : 'w-20'} duration-300 relative`} style={{ paddingRight: open ? '' : '0' }}>


        <div className="inline-flex">
          <TbBinaryTree className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && 'rotate-[360deg]'} ${!open && 'hidden'}`} />
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'}`}>SIMEET</h1>
          <CiMenuBurger className={`fill-white text-dark rounded-full absolute right-3 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
          {/* <BsArrowLeftCircle className={`bg-white text-dark-purple l rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} /> */}
         

        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-green-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? 'mt-9' : 'mt-2'}`}
              onClick={() => (menu.onsubmit ? menu.onsubmit() : handleNavigate(menu.path))}
            >
              {menu.icon ? <span className="mr-2 mb-2">{menu.icon}</span> : <img src="" alt="" className={`text-dark-purple transition-all duration-300 ${!open && 'filter grayscale'}`} />}
              <span className={`text-[18px] mb-2 font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <NavbarComponent /> */}
    </div>
  );
};


export default SidebarUser;
