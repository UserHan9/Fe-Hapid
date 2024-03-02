import React from 'react';
import image from '../assets/images/Logo-Harmoni.png';
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
            <h3 className="text-lg font-semibold text-gray-800">Futsal</h3>
            <p className="text-sm text-gray-600">Futsal</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
          <img className="w-full h-56 object-cover object-center" src={image} alt="hehe" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Volly</h3>
            <p className="text-sm text-gray-600">Rooow</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
          <img className="w-full h-56 object-cover object-center" src={image} alt="hehe" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Handball</h3>
            <p className="text-sm text-gray-600">Rooow</p>
          </div>
        </div>
      </div>
      <button className="px-5 py-3 btn bg-yellow-500 text-[18px] mb-10 text-clip">Lihat Lebih banyak...</button>
    </div>
  );
};

export default CardComponent;
