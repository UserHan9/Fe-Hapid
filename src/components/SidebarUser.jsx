import React, { useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { TbBinaryTree } from 'react-icons/tb';
import { MdOutlineDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BsBrowserEdge } from 'react-icons/bs';
import Api from '../Api'; // Sesuaikan dengan path ke file API Anda
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const SidebarUser = () => {
  const [open, setOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false); // State untuk menandakan proses logout sedang berlangsung
  const navigate = useNavigate();
  document.title = 'UserDashboard';

  const handleLogout = async () => {
    try {
      setLoggingOut(true); // Set state loggingOut menjadi true saat logout dimulai

      await Api.post('/api/logout');
  
      // Hapus cookies yang diset pada saat login
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('permissions');
      Cookies.remove('role');
  
      // Hapus token dari localStorage (jika perlu)
      localStorage.removeItem('token');
  
      // Tampilkan notifikasi logout di homepage
      toast.success('Keren!! Anda berhasil logout 😎', {
        position: 'top-right',
        duration: 2500,
        style: {
          borderRadius: '0.5rem',
          backgroundColor: '#10B981', // Warna hijau
          padding: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: 'white',
        },
      });

      // Set timeout untuk menandakan bahwa proses logout sudah selesai dan mengubah state loggingOut menjadi false
      setTimeout(() => {
        setLoggingOut(false);
        navigate('/login'); // Redirect ke halaman login setelah logout
      }, 3000); // Sesuaikan waktu timeout sesuai kebutuhan
    } catch (error) {
      console.error('Logout error:', error);
      // Handle error or show an error toast
      toast.error('Logout Error', {
        position: 'top-right',
        duration: 4000,
      });
      setLoggingOut(false); // Set state loggingOut menjadi false jika terjadi kesalahan pada proses logout
    }
  };
  
  const Menus = [
    { title: 'Dashboard', icon: <BsBrowserEdge />, path: '/DashboardPages' },
    { title: 'Pages', icon: <MdOutlineDashboard />, path: '/DaftarLomba' },
    { title: 'Media', spacing: true },
    { title: 'Projects' },
    { title: 'Analytics' },
    { title: 'Profile', spacing: true },
    { title: 'Setting' },
    { title: 'Logout', spacing: true, onClick: handleLogout },
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
              onClick={() => (menu.onClick ? menu.onClick() : handleNavigate(menu.path))}
            >
              {menu.icon ? <span className="mr-2">{menu.icon}</span> : <img src="" alt="" className={`text-dark-purple transition-all duration-300 ${!open && 'filter grayscale'}`} />}
              <span className={`text-base font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu.title}</span>
            </li>
          ))}
        </ul>
        {/* Tampilkan pesan "Sabar sedang logout" saat loggingOut adalah true */}
        {loggingOut && <p className="text-white text-center mt-4">Sabar sedang logout...</p>}
      </div>
    </div>
  );
};

export default SidebarUser;
