import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/images/Logo-Harmoni.png';

const CreateUser = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', user);
      console.log(response.data);
      Swal.fire({
        title: 'Sukses!',
        text: 'Data peserta berhasil ditambahkan.',
        icon: 'success',
      });
      setUser({ name: '', email: '', password: '', password_confirmation: '' });
      navigate('/UserAccount'); // Navigate to UserAccount after successful creation
    } catch (error) {
      console.error(error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-6 ml-3 mt-5">Create-account - SI-Classmeet</h1>
        <div className="bg-green-100 shadow-xl rounded-md p-6 flex">
          <img src={image} alt="" className="max-w-[350px]" />
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex items-center">
              <label className="font-semibold text-[18px] flex-1">Name:</label>
              <input placeholder="Input Username" className="bg-green-100 rounded-md px-10 py-2 flex-1 border" type="text" name="name" value={user.name} onChange={handleChange} required />
            </div>
            <div className="flex items-center">
              <label className="font-semibold text-[18px] flex-1">Email:</label>
              <input placeholder="Input @Email" className="bg-green-100 rounded-md px-10 py-2 flex-1 border" type="email" name="email" value={user.email} onChange={handleChange} required />
            </div>
            <div className="flex items-center">
              <label className="font-semibold text-[18px] flex-1">Password:</label>
              <input placeholder="Input Password" className="bg-green-100 rounded-md px-10 py-2 flex-1 border" type="password" name="password" value={user.password} onChange={handleChange} required />
            </div>
            <div className="flex items-center">
              <label className="font-semibold text-[18px] flex-1 mr-2">Confirm Password:</label>
              <input placeholder="Confirm Password" className="bg-green-100 rounded-md px-10 py-2 flex-1 border" type="password" name="password_confirmation" value={user.password_confirmation} onChange={handleChange} required />
            </div>
            <button type="submit" className="bg-green-300 px-5 py-3 rounded-md text-[18px] font-semibold mt-3">
              Create User
            </button>
            <Link to="/UserAccount">
              <p className="btn bg-green-400 text-gray-600 cursor-pointer px-2 text-[18px] font-semibold">Kembali Ke Halaman Data user</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
