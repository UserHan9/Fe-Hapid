import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../Api';
import Cookies from 'js-cookie';  // Pastikan diimport
import toast from 'react-hot-toast';  // Pastikan diimport

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

  return (
    <>
      <div className="drawer lg:drawer-open shadow-lg  ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open Sidebar
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-56 min-h-full bg-slate-500 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/DashboardPages">
                <a className="btn">Dashboard</a>
              </Link>
            </li>
            <li>
              <Link to="/DaftarLomba">
                <a className="btn">Daftar Lomba</a>
              </Link>
            </li>
            <div className="px-2 py-2 mt-auto">
              <button className="py-2 mx-auto w-full  bg-gray-400 hover:bg-gray-600 rounded-xl"
                onClick={handleLogout}>
                <CiLogout className="inline-block text-sm mr-2" />
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
