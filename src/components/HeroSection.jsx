import React from 'react';
import image from '../assets/images/Hold.png';

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-screen-xl mx-auto">
        <div className="">
          <div className="lg:w-full">
            <img src={image} className="w-full max-w-sm rounded-lg bg-base-300" alt="Logo Harmoni" />
          </div>
        </div>
        <div className="lg:w-1/2 lg:pr-8">
          <h1 className="text-5xl font-bold">Selamat Datang Di</h1>
          <span className="text-5xl font-bold text-green-400 py-3">SIMEET</span>
          <p className="py-6 text-[20px]">
            Berkolaborasi dan Mengatur Lomba dengan Lebih Mudah dan Efisien. Aplikasi kami membantu Anda mengelola kompetisi dari awal hingga akhir, mulai dari pendaftaran peserta hingga penentuan pemenang.{' '}
          </p>
          <button className="btn bg-green-400">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
