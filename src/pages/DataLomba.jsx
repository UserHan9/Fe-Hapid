import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from '../components/Sidebar';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const DataLomba = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ namelomba: '', namapeserta: '', kelas: '', jurusan: '', kontak: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Ambil data dari API saat komponen dipasang
    Axios.get('http://localhost:8000/api/lomba/show') // Sesuaikan URL dengan URL API Laravel Anda
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID ${userId}`);
    // Implementasikan logika edit - buat permintaan PUT untuk memperbarui data pengguna
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID ${userId}`);
    // Implementasikan logika hapus - buat permintaan DELETE untuk menghapus pengguna
    Axios.delete(`http://localhost:8000/api/lomba/destroy/${userId}`) // Sesuaikan URL dengan URL API Laravel Anda
      .then(() => {
        // Setelah penghapusan berhasil, perbarui daftar pengguna
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    // Implementasikan logika tambah - buat permintaan POST untuk membuat pengguna baru
    Axios.post('http://localhost:8000/api/lomba/create', newUser) // Sesuaikan URL dengan URL API Laravel Anda
      .then((response) => {
        // Setelah penambahan berhasil, perbarui daftar pengguna
        setUsers([...users, response.data]);
        setNewUser({ namelomba: '', namapeserta: '', kelas: '', jurusan: '', kontak: '' });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };
  
  return (
    <div className='flex'>
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 ml-3">Data Lomba - Data Peserta</h1>
        <table className="table w-full mt-10">
          {/* (lanjutkan dengan kode tabel yang telah disediakan) */}
        </table>
        <div className="flex justify-between items-center mt-5">
          <button className="btn" onClick={() => setIsModalOpen(true)}>Tambah Peserta</button>
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
                <label className="block mb-2">Nama Peserta:</label>
                <input
                  type="text"
                  value={newUser.namapeserta}
                  onChange={(e) => setNewUser({ ...newUser, namapeserta: e.target.value })}
                  className="w-full mb-4 p-2 border"
                />
                <label className="block mb-2">Kelas:</label>
                <input
                  type="text"
                  value={newUser.kelas}
                  onChange={(e) => setNewUser({ ...newUser, kelas: e.target.value })}
                  className="w-full mb-4 p-2 border"
                />
                <label className="block mb-2">Jurusan:</label>
                <select
                  value={newUser.jurusan}
                  onChange={(e) => setNewUser({ ...newUser, jurusan: e.target.value })}
                  className="w-full mb-4 p-2 border"
                >
                  <option value="">Pilih Jurusan</option>
                  <option value="PPLG">PPLG</option>
                  <option value="ANIMASI">Animasi</option>
                  <option value="BCF">BCF</option>
                  <option value="TPFL">TPFL</option>
                  <option value="TO">TO</option>
                </select>
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

export default DataLomba;
