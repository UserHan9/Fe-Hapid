import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
const DataKelas = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Raihan indra', Jurusan: 'Animasi', JumlahSiswa: '32' },
    { id: 2, name: 'Hafidz Furqon', Jurusan: 'PPLG', JumlahSiswa: '34' },
    { id: 3, name: 'Nabil Attala', Jurusan: 'Teknik Otomotif', JumlahSiswa: '35' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', Jurusan: '', JumlahSiswa: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID ${userId}`);
  };


  const handleDelete = (userId) => {
    console.log(`Delete user with ID ${userId}`);
  };

  const handleAddUser = () => {
    console.log('Add new user');
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: '', Jurusan: '', JumlahSiswa: 0 });
    setIsModalOpen(false);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6">Data Kelas - Data Users</h1>
        <table className="table w-full mt-10">
          <thead>
            <tr>
              <th className="text-[23px] text-center">ID</th>
              <th className="text-[23px] text-center">Nama Kelas</th>
              <th className="text-[23px] text-center">Jurusan</th>
              <th className="text-[23px] text-center">Jumlah Siswa</th>
              <th className="text-[23px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="text-[19px] border text-center">{user.id}</td>
                <td className="text-[19px] border text-center">{user.name}</td>
                <td className="text-[19px] border text-center">{user.Jurusan}</td>
                <td className="text-[19px] border text-center">{user.JumlahSiswa}</td>
                <td className="text-[19px] border text-center">
                  <div className="flex">
                <button className="mr-3 flex mb-2" onClick={() => handleEdit(user.id)} >
                    <CiEdit className='mr-1'/>
                    Edit</button>
                  <button onClick={() => handleDelete(user.id)} className='flex'>
                    <MdDelete className='mr-1'/>
                    Delete</button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-5">
          <button className="btn" onClick={() => setIsModalOpen(true)}>Tambah User</button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-96">
              <h3 className="font-bold text-lg mb-4">Tambah User Baru</h3>
              <form onSubmit={handleAddUser}>
                <label className="block mb-2">Nama:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full mb-4 p-2 border"
                />
                <label className="block mb-2">Jurusan:</label>
                <input
                  type="text"
                  value={newUser.Jurusan}
                  onChange={(e) => setNewUser({ ...newUser, Jurusan: e.target.value })}
                  className="w-full mb-4 p-2 border"
                />
                <label className="block mb-2">Jumlah Siswa:</label>
                <input
                  type="number"
                  value={newUser.JumlahSiswa}
                  onChange={(e) => setNewUser({ ...newUser, JumlahSiswa: parseInt(e.target.value, 10) })}
                  className="w-full mb-4 p-2 border"
                />
                <button type="submit" className="btn bg-green-500 text-white mx-1">Simpan</button>
              <button onClick={() => setIsModalOpen(false)} className="btn bg-red-500 mx-1 text-white mt-5">Batal</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataKelas;
