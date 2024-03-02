import React from 'react';
import image from '../assets/images/smkpk.png';
import CardComponent from './CardComponent';

const AboutSection = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="p-3">
          <h1 className="text-5xl font-bold">
            About <span className="text-green-400 font-semibold text-5xl">Us</span>
          </h1>
          <div className="max-w-[37rem]">
            <p className="py-6 text-[28px]">Si Meet adalah sebuah sistem untuk mempermudah anda untuk mengatur atau manage acara clasmeet, dimana kami menyediakan beberapa fitur untuk mempermudah dalama mengelola acara classmeet ini.</p>
          </div>
          <span className="text-2xl font-semibold mt-5">
            {/* Lihat Bebarapa Lomba yang <span> Sedang berlangsung</span> */}
            {/* <CardComponent /> */}
          
          </span>
        </div>
      </div>
    </div>
  );
};
export default AboutSection;
