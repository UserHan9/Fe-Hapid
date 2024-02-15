import React from 'react';
import Sidebar from '../components/Sidebar';

const DaftarLombaUser = () => {
  return (
    <div className="bg-green-200">
      <div className="hero min-h-screen">
        <Sidebar />
        <div className="flex-col lg:flex-row-reverse w-full">
          <div className="px-64">
            <h1 className="text-5xl font-bold">Halo User! Anda berada di daftar lomba</h1>
            <p className="py-6 w-64">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarLombaUser;
