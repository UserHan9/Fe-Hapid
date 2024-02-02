import React from 'react';
import Sidebar from '../../components/SidebarUser';


const UserDashboard = () => {
  return (
    <div className='flex'>
      <Sidebar/>
    <div className="bg-green-200 w-full">
      <div className="hero min-h-screen">
        <div className="flex-col lg:flex-row-reverse w-full">
          <div className="px-20">
            <h1 className="text-5xl font-bold">Halo User!</h1>
            <p className="py-6 w-64">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;
