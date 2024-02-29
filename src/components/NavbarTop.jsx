import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavbarTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar bg-base-100 shadow-lg ${isScrolled ? 'backdrop-blur-md transition-all duration-300 fixed top-0 left-0 right-0 z-50' : ''}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <div>Item 1</div>
            </li>
            <li>
              <div>Parent</div>
              <ul className="p-2">
                <li>
                  <div>Submenu 1</div>
                </li>
                <li>
                  <div>Submenu 2</div>
                </li>
              </ul>
            </li>
            <li>
              <div>Item 3</div>
            </li>
          </ul>
        </div>
        <div className="btn btn-ghost text-xl text-[25px] text-green-500">
          Harmoni <span className="text-gray-400">Tech</span>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu text-[17px] menu-horizontal px-1">
          <li>
            <div>Home</div>
          </li>
          <li>
            <div>
              <div>About</div>
            </div>
          </li>
          <li>
            <div>
              <div>Teams</div>
            </div>
          </li>
          <li>
            <div>Contact</div>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login">
          <div className="btn hover:bg-green-500 text-[17px] ">Login</div>
        </Link>
      </div>
    </div>
  );
};

export default NavbarTop;
  