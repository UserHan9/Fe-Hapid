// NavbarComponent.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const NavbarComponent = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex justify-end items-center bg-white shadow-xl text-white p-4 w-full">
      <div className="mr-2 relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={toggleDropdown} className="w-8 h-8 rounded-full cursor-pointer bg-slate-700">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
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
