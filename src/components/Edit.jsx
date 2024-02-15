// Edit.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Edit = ({ user, setIsModalOpen, fetchData }) => {
  const defaultUser = {
    nama_lomba: '',
    nama_peserta: '',
    nama_kelas: '',
    jurusan: '',
    kontak: '',
    jumlah_pemain: '',
  };

  const [editedUser, setEditedUser] = useState(user || defaultUser);

  const handleEditUser = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/lomba/update/${user.id}`, editedUser);
      fetchData();
      Swal.fire({
        title: 'Sukses!',
        text: 'Data peserta berhasil diubah.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error editing user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to edit user.',
        icon: 'error',
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <h3 className="font-bold text-lg">Edit Peserta</h3>
        <form onSubmit={handleEditUser}>
          <div className="mb-4">
            <label className="block mb-2">Nama Lomba:</label>
            <input type="text" value={editedUser.nama_lomba} onChange={(e) => setEditedUser({ ...editedUser, nama_lomba: e.target.value })} className="w-full p-2 border" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Nama Perwakilan:</label>
            <input type="text" value={editedUser.nama_peserta} onChange={(e) => setEditedUser({ ...editedUser, nama_peserta: e.target.value })} className="w-full p-2 border" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Kelas:</label>
            <input type="text" value={editedUser.nama_kelas} onChange={(e) => setEditedUser({ ...editedUser, nama_kelas: e.target.value })} className="w-full p-2 border" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Jurusan:</label>
            <input type="text" value={editedUser.jurusan} onChange={(e) => setEditedUser({ ...editedUser, jurusan: e.target.value })} className="w-full p-2 border" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Kontak:</label>
            <input type="text" value={editedUser.kontak} onChange={(e) => setEditedUser({ ...editedUser, kontak: e.target.value })} className="w-full p-2 border" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Jumlah Pemain:</label>
            <input type="text" value={editedUser.jumlah_pemain} onChange={(e) => setEditedUser({ ...editedUser, jumlah_pemain: e.target.value })} className="w-full p-2 border" />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">
              Edit
            </button>
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
