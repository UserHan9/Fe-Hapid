import React from 'react';
import Layout from '../components/Layout';

const DashboardUser = () => {
  return (
    <Layout>
      <div className="hero mx-auto my-auto min-h-screen h-screen">
        <div className="flex-col lg:flex-row-reverse w-full">
          <div className="px-64">
            <h1 className="text-5xl font-bold">
              Halo User, Selamat datang di <span className="text-green-300">SIMEET</span>
            </h1>
            <p className="py-6 text-2xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardUser;
