import React from 'react'
import image from '../assets/images/WhatsApp Image 2023-12-07 at 16.43.26_9fda8fe2.jpg'

const TeamSection = () => {
  return (
    <>
    <div className="hero min-h-screen bg-base-300">
    <div className="hero-content text-center">
    <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-8 pt-8">
    <img src={image} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Hafidz</h2>
    <p>As a front end engineer in this Team</p>
  </div>
</div>
</div>
</div>
</>
  )
}

export default TeamSection