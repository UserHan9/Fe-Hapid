import React from 'react';
import NavbarComponent from './NavbarComponent';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <NavbarComponent />
        {children}
      </div>
    </div>
  );
};

export default Layout;
