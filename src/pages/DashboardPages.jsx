import React from 'react'
import AdminDashboard from '../views/Dashboard/AdminDashboard'

const DashboardPages = () => {
  return (
    <div className='bg-green-300'>
    <div className="hero min-h-screen">
    <AdminDashboard/>
    <div className="flex-col lg:flex-row-reverse w-full">
      <div className='px-64'>
        <h1 className="text-5xl font-bold">Halo Admin!</h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
    </div>
  </div>
  </div>
  )
}

export default DashboardPages