import React, { useState } from 'react';

const NavbarComponent = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex justify-end items-center bg-white shadow-xl text-white p-4">
      <div className="mr-2 relative">
        <img alt="User Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" onClick={toggleDropdown} className="w-10 h-10 rounded-full cursor-pointer" />
        {showDropdown && (
          <div className="absolute bg-white shadow-lg rounded w-36 top-full right-0 mt-2">
            <div className="text-gray-700 p-2 cursor-pointer hover:bg-gray-100" onClick={toggleDropdown}>
              Profile
            </div>
            <div className="text-gray-700 p-2 cursor-pointer hover:bg-gray-100" onClick={onLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
