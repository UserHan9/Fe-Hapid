import React, { useState } from 'react';
import SidebarUser from '../components/SidebarUser';

const PemenangUser = () => {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="flex">
      <SidebarUser />
      <div>{emailSent ? <h1>Email telah berhasil dikirim oleh admin.</h1> : <h1 className="text-3xl font-bold mb-4 ml-10 mt-7">info selanjutnya akan diupdate di halaman ini oleh admin</h1>}</div>
    </div>
  );
};

export default PemenangUser;
