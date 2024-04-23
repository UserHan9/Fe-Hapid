import React from 'react';
import image from '../assets/images/Logo-Harmoni.png';
import futsal from '../assets/images/Final da 6ª Copa Paraí de Futsal – 2014.jpg';
import { Link } from 'react-router-dom';

const CardComponent = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-center py-10">
        Lomba <span>Yang</span>
        <span className="text-green-400 font-semibold text-5xl"> Tersedia</span>
      </h1>
      <div className="p-4 lg:flex md:block gap-10 justify-center mb-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
          <img className="w-full h-56 object-cover" src={image} alt="hehe" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 text-left">Volly</h3>
            <p className="text-sm text-gray-600 text-left">Volly adalah..</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
          <img className="w-full h-56 object-cover object-center" src={futsal} alt="hehe" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 text-left">Futsal</h3>
            <p className="text-sm text-gray-600 text-left">Futsal adalah..</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
          <img className="w-full h-56 object-cover object-center" src={image} alt="hehe" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 text-left">Handball</h3>
            <p className="text-sm text-gray-600 text-left">Handbal adalah..</p>
          </div>
        </div>
      </div>
      <Link to="/login">
        <button className="px-5 py-3 btn bg-yellow-500 text-[18px] mb-10 text-clip">Lihat Lebih banyak...</button>
      </Link>
    </div>
  );
};

export default CardComponent;
