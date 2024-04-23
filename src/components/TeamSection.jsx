import React from 'react';
import image from '../assets/images/gweh.jpg';
import Rehan from '../assets/images/Rehan.jpg';
import Nabil from '../assets/images/nabil.jpg';
import Aura from '../assets/images/auraformal.jpg';
const TeamSection = () => {
  return (
    <>
      <div>
        <h1 className="text-5xl font-bold text-center mt-20 mb-10">Teams</h1>
        <div className="hero min-h-screen bg-base-300">
          <div className="hero-content text-center sm:block lg:flex">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-8 pt-8 mt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Hafidz</h2>
                <p>Sebagai front end developer</p>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-8 pt-8">
                <img src={Rehan} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Raihan</h2>
                <p>Sebagai back end developer</p>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-8 pt-8">
                <img src={Nabil} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Nabil</h2>
                <p>Sebagai Analis</p>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-8 pt-8">
                <img src={Aura} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Aura</h2>
                <p>Sebagai Designer Web</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamSection;
