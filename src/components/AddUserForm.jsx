import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUserForm = ({ setIsModalOpen, fetchData }) => {
  const [newUser, setNewUser] = useState({
    nama_lomba: '',
    nama_peserta: '',
    nama_kelas: '',
    jurusan: '',
    kontak: '',
    jumlah_pemain: '',
  });

  const handleAddUser = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/lomba/create', newUser);
      fetchData();
      Swal.fire({
        title: 'Sukses!',
        text: 'Data peserta berhasil ditambahkan.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add user.',
        icon: 'error',
      });
    }

    setNewUser({
      nama_lomba: '',
      nama_peserta: '',
      nama_kelas: '',
      jurusan: '',
      kontak: '',
      jumlah_pemain: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      <form onSubmit={handleAddUser}>
        <label className="block mb-4">
          Nama Lomba:
          <input type="text" value={newUser.nama_lomba} onChange={(e) => setNewUser({ ...newUser, nama_lomba: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Nama Perwakilan:
          <input type="text" value={newUser.nama_peserta} onChange={(e) => setNewUser({ ...newUser, nama_peserta: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Kelas:
          <input type="text" value={newUser.nama_kelas} onChange={(e) => setNewUser({ ...newUser, nama_kelas: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Jurusan:
          <input type="text" value={newUser.jurusan} onChange={(e) => setNewUser({ ...newUser, jurusan: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Kontak:
          <input type="text" value={newUser.kontak} onChange={(e) => setNewUser({ ...newUser, kontak: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Jumlah Pemain:
          <input type="text" value={newUser.jumlah_pemain} onChange={(e) => setNewUser({ ...newUser, jumlah_pemain: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <button type="submit" className="bg-green-400 px-4 py-2 rounded-lg">
          Simpan
        </button>
        <button type="button" className="ml-2 bg-red-400 px-4 py-2 rounded-lg" onClick={() => setIsModalOpen(false)}>
          Batal
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
