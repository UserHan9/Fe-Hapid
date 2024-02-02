import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../Api';
import Cookies from 'js-cookie';  // Pastikan diimport
import toast from 'react-hot-toast';  // Pastikan diimport
import { RiBookOpenLine } from "react-icons/ri";
import DashboardPages from '../../pages/DashboardPages';
import { IoHome } from "react-icons/io5";
import { MdDataSaverOff } from "react-icons/md";
import { MdOutlineSchedule } from "react-icons/md";
import { PiMedalBold } from "react-icons/pi";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import Sidebar from '../../components/Sidebar';


const AdminDashboard = () => {
  const navigate = useNavigate();

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

      toast.success('Logout Successfully!', {
        position: 'top-right',
        duration: 4000,
      });

      // Redirect ke halaman login setelah logout
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Handle error or show an error toast
      toast.error('Logout Error', {
        position: 'top-right',
        duration: 4000,
      });
    }
  };

  return ( <div className='flex'>
          <Sidebar/>
            {/* <div className="px-2 py-2 mt-14">
              <button className="py-2 mx-auto w-full  bg-gray-400 hover:bg-gray-600 rounded-xl"
                onClick={handleLogout}>
                <CiLogout className="inline-block text-sm mr-2" />
                Logout
              </button>
            </div> */}
            <h1 className='text-2xl px-6 py-10'>Ini punya admin dan masih kasaran</h1>
            </div>
  );
};

export default AdminDashboard;
