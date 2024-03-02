// Layout.js
import React from 'react';
import NavbarComponent from './NavbarComponent';
import SidebarUser from './SidebarUser';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarUser />
      <div className="flex flex-col w-full">
        <NavbarComponent />
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
