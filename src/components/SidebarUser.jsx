import React, { useState } from 'react';
// icons for sidebar
import { BsArrowLeftCircle } from 'react-icons/bs';
import { TbBinaryTree } from 'react-icons/tb';
import { MdOutlineDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BsBrowserEdge } from 'react-icons/bs';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  document.title = 'UserDashboard';

  const Menus = [
    { title: 'Dashboard', icon: <BsBrowserEdge />, path: '/DashboardPages' },
    { title: 'Pages', icon: <MdOutlineDashboard />, path: '/DaftarLomba' },
    { title: 'Media', spacing: true },
    {
      title: 'Projects',
    },
    { title: 'Analytics' },
    { title: 'Profile', spacing: true },
    { title: 'Setting' },
    { title: 'Logout' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex">
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? 'w-72' : 'w-20'} duration-300 relative`}>
        <BsArrowLeftCircle className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />

        <div className="inline-flex">
          <TbBinaryTree className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && 'rotate-[360deg]'}`} />

          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'}`}>SIMEET</h1>
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <li key={index} className={`text-green-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? 'mt-9' : 'mt-2'}`} onClick={() => handleNavigate(menu.path)}>
              {menu.icon ? <span className="mr-2">{menu.icon}</span> : <img src="" alt="" className={`text-dark-purple transition-all duration-300 ${!open && 'filter grayscale'}`} />}
              <span className={`text-base font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
