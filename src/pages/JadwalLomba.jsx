import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const JadwalLomba = () => {
  const [users, setUsers] = useState([
    { id: 1, namelomba: 'Volly', Tempat: 'Lapangan SMKN 1 Ciomas', kelas: '11 BCF 1 VS 12 PPLG 3', tanggal: '2024-02-03', kontak: '08123456789' },
    { id: 2, namelomba: 'Handball', Tempat: 'Lapangan SMKN 1 Ciomas', kelas: '12 PPLG 3 VS 10 PPLG 3 ', tanggal: '2024-02-04', kontak: '08765432123' },
    { id: 3, namelomba: 'Futsal', Tempat: 'Lapangan SMKN 1 Ciomas', kelas: '10 PPLG 3 VS 10 PPLG 1', tanggal: '2024-02-05', kontak: '08111223344' },
  ]);

  const [newUser, setNewUser] = useState({ namelomba: '', Tempat: '', kelas: '', tanggal: '', kontak: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID ${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID ${userId}`);
  };

  const handleAddUser = (event) => {
    event.preventDefault(); // Mencegah pengajuan formulir bawaan
  
    console.log('Add new user');
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ namelomba: '', Tempat: '', kelas: '', tanggal: '', kontak: '' });
    setIsModalOpen(false);
  };
  
  return (
    <div className='flex'>
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 ml-3">Data Lomba - Data Peserta</h1>
        <table className="table w-full mt-10 ml-3">
          <thead>
            <tr>
              <th className="text-[23px] text-center">ID</th>
              <th className="text-[23px] text-center">Lomba</th>
              <th className="text-[23px] text-center">Tempat</th>
              <th className="text-[23px] text-center">Kelas</th>
              <th className="text-[23px] text-center">Tanggal</th>
              <th className="text-[23px] text-center">Kontak</th>
              <th className="text-[23px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="text-[18px] border text-center">{user.id}</td>
                <td className="text-[18px] border text-center">{user.namelomba}</td>
                <td className="text-[18px] border text-center">{user.Tempat}</td>
                <td className="text-[18px] border text-center">{user.kelas}</td>
                <td className="text-[18px] border text-center">{user.tanggal}</td>
                <td className="text-[18px] border text-center">{user.kontak}</td>
                <td className="text-[18px] border text-center">
                  <div className="flex">
                    <button className="mr-3 flex mb-2" onClick={() => handleEdit(user.id)}>
                      <CiEdit className='mr-1'/>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className='flex'>
                      <MdDelete className='mr-1'/>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-5">
          <button className="btn ml-3" onClick={() => setIsModalOpen(true)}>Tambah Peserta</button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-96">
              <h3 className="font-bold text-lg mb-4">Tambah Peserta Baru</h3>
              <form onSubmit={handleAddUser}>
                <label className="block mb-2">Nama Lomba:</label>
                <input
                  type="text"
                  value={newUser.namelomba}
                  onChange={(e) => setNewUser({ ...newUser, namelomba: e.target.value })}
                  className="w-full mb-4 p-2 border"
                />
                 <label className="block mb-2">Tempat:</label>
                 <select
                  value={newUser.Tempat}
                  onChange={(e) => setNewUser({ ...newUser, Tempat: e.target.value })}
                  className="w-full mb-4 p-2 border"
                >
                  <option value="">Pilih Tempat</option>
                  <option value="Lapangan SMKN 1 Ciomas">Lapangan SMKN 1 Ciomas	</option>
                  <option value="AULA SMKN 1 CIOMAS">AULA SMKN 1 CIOMAS	</option>
                </select>
                <label className="block mb-2">Kelas:</label>
                <input
                  type="text"
                  value={newUser.kelas}
                  onChange={(e) => setNewUser({ ...newUser, kelas: e.target.value })}
                  className="w-full mb-4 p-2 border"
                />
                <label className="block mb-2">Tanggal:</label>
                <input
                  type="date"
                  value={newUser.tanggal}
                  onChange={(e) => setNewUser({ ...newUser, tanggal: e.target.value })}
                  className="w-full mb-4 p-2 border"
                />
                <label className="block mb-2">Kontak:</label>
                <input
                  type="text"
                  value={newUser.kontak}
                  onChange={(e) => setNewUser({ ...newUser, kontak: e.target.value })}
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

export default JadwalLomba;
