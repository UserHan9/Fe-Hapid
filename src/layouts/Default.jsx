import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Default = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      {/* <Link to="/Default">Homepage</Link> */}
      </div>
  )
}

export default Default