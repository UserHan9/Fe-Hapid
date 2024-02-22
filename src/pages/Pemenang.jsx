import React from 'react';
import Sidebar from '../components/Sidebar';

const Pemenang = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center items-center gap-3 w-[900px] ml-10">
        <div className="card w-[500px] bg-base-100 shadow-xl h-[400px]">
          <figure className="px-10 pt-10">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl w-[300px]" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>
              Pemenang dari permainan <span>Muhammad Hafidz</span>
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Detail</button>
            </div>
          </div>
        </div>
        <div className="card w-[500px] bg-base-100 shadow-xl h-[400px]">
          <figure className="px-10 pt-10">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl w-[300px]" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>Pemenang dari permainan Handball, dapat sepatu?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Detail</button>
            </div>
          </div>
        </div>
        <div className="card w-[500px] bg-base-100 shadow-xl h-[400px]">
          <figure className="px-10 pt-10">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl w-[300px]" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>Pemenang dari permainan Handball, dapat sepatu?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pemenang;
