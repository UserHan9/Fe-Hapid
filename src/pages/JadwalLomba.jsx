import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const JadwalLomba = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nama_lomba: '', tempat: '', kelas: '', tanggal: '', waktu: '', keterangan: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/jadwal/show');
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUserId(user.id);
    setNewUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/jadwal/update/${selectedUserId}`, newUser);
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/jadwal/destroy/${userId}`);
      await fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/jadwal/create', newUser);
      await fetchData();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      setNewUser({ nama_lomba: '', tempat: '', kelas: '', tanggal: '', waktu: '', keterangan: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleWaktuChange = (event) => {
    const regex = /^[0-9]{2}:[0-9]{2}$/;
    const value = event.target.value;
    if (regex.test(value) || value === '') {
      setNewUser({ ...newUser, waktu: value });
      setErrorMessage('');
    } else {
      setErrorMessage('Format waktu harus HH:mm (misal: 12:30)');
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = users.filter((user) => user.nama_lomba.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 ml-3">Data Jadwal Lomba - Data Peserta</h1>
        <div className="flex justify-end items-center mb-3 mr-3">
          <FaSearch className="mx-3" />
          <input type="text" placeholder="Cari Nama Lomba" className="border rounded p-2 mr-2" value={searchTerm} onChange={handleSearch} />
        </div>
        <table className="table w-full mt-10 ml-5">
          <thead>
            <tr className="font-extrabold">
              <th className="text-[23px] text-center">ID</th>
              <th className="text-[23px] text-center">Nama Lomba</th>
              <th className="text-[23px] text-center">Tempat</th>
              <th className="text-[23px] text-center">Kelas</th>
              <th className="text-[23px] text-center">Tanggal</th>
              <th className="text-[23px] text-center">Waktu</th>
              <th className="text-[23px] text-center">Keterangan</th>
              <th className="text-[23px] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="text-[18px] border text-center">{user.id}</td>
                <td className="text-[18px] border text-center">{user.nama_lomba}</td>
                <td className="text-[18px] border text-center">{user.tempat}</td>
                <td className="text-[18px] border text-center">{user.kelas}</td>
                <td className="text-[18px] border text-center">{user.tanggal}</td>
                <td className="text-[18px] border text-center">{user.waktu}</td>
                <td className="text-[18px] border text-center">{user.keterangan}</td>
                <td className="text-[18px] border text-center">
                  <div className="flex">
                    <button className="mr-3 flex mb-2" onClick={() => handleEdit(user)}>
                      <CiEdit className="mr-1" />
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="flex">
                      <MdDelete className="mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-5">
          <button className="btn ml-5 text-[18px]" onClick={() => setIsModalOpen(true)}>
            Tambah Jadwal
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-96">
              <h3 className="font-bold text-lg mb-4">Tambah Peserta Baru</h3>
              <form onSubmit={selectedUserId ? handleUpdate : handleAddUser}>
                <label className="block mb-2">Nama Lomba:</label>
                <select value={newUser.nama_lomba} onChange={(e) => setNewUser({ ...newUser, nama_lomba: e.target.value })} className="w-full mb-4 p-2 border">
                  <option value="">Pilih Nama Lomba</option>
                  <option value="Futsal">Futsal</option>
                  <option value="Volly">Volly</option>
                  <option value="Handball">Handball</option>
                </select>
                <label className="block mb-2">Tempat:</label>
                <select value={newUser.tempat} onChange={(e) => setNewUser({ ...newUser, tempat: e.target.value })} className="w-full mb-4 p-2 border">
                  <option value="">Pilih Tempat</option>
                  <option value="Lapangan SMKN 1 Ciomas">Lapangan SMKN 1 Ciomas </option>
                  <option value="AULA SMKN 1 CIOMAS">AULA SMKN 1 CIOMAS </option>
                </select>
                <label className="block mb-2">Kelas:</label>
                <input type="text" value={newUser.kelas} onChange={(e) => setNewUser({ ...newUser, kelas: e.target.value })} className="w-full mb-4 p-2 border" />
                <label className="block mb-2">Tanggal:</label>
                <input type="date" value={newUser.tanggal} onChange={(e) => setNewUser({ ...newUser, tanggal: e.target.value })} className="w-full mb-4 p-2 border" />
                <label className="block mb-2">Waktu</label>
                <input type="time" value={newUser.waktu} onChange={handleWaktuChange} className="w-full mb-4 p-2 border" />
                {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
                <label className="block mb-2">Keterangan:</label>
                <select value={newUser.keterangan} onChange={(e) => setNewUser({ ...newUser, keterangan: e.target.value })} className="w-full mb-4 p-2 border">
                  <option value="">Pilih Keterangan</option>
                  <option className="text-green-300" value="Berlangsung">
                    Berlangsung
                  </option>
                  <option value="Selesai">Selesai</option>
                </select>

                <button type="submit" className="btn bg-green-500 text-white mx-1">
                  {selectedUserId ? 'Update' : 'Simpan'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="btn bg-red-500 mx-1 text-white mt-5">
                  Batal
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JadwalLomba;
