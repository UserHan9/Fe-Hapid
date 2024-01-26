import React from 'react';
import { CiLogout } from 'react-icons/ci';

const AdminDashboard = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
  };

  return (
    <div>
      <div className="drawer lg:drawer-open shadow-lg">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-56 min-h-full bg-slate-500 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
            <div className="px-2">
              <button className="py-2 mx-auto w-full  bg-gray-400 hover:bg-gray-600 rounded-xl" onClick={handleLogout}>
                <CiLogout className="inline-block text-sm mr-2" />
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
