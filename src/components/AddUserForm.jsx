import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddUserForm = () => {
  const [newUser, setNewUser] = useState({
    nama_lomba: '',
    nama_peserta: '',
    nama_kelas: '',
    jurusan: '',
    kontak: '',
    jumlah_pemain: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/lomba/create', newUser);
      Swal.fire({
        title: 'Selamat! anda baru saja mendaftarkan diri',
        text: 'Pendaftaran Berhasil.',
        icon: 'success',
      });
      setNewUser({
        nama_lomba: '',
        nama_peserta: '',
        nama_kelas: '',
        jurusan: '',
        kontak: '',
        jumlah_pemain: '',
      });
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add user.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      <h1 className="text-2xl mb-4 font-bold">Form Pendaftaran :</h1>
      <form onSubmit={handleSubmit}>
        <p className="text-[18px] mb-2">Nama Lomba:</p>
        <div className="mb-4">
          <label>
            <input type="text" placeholder="Volly" name="nama_lomba" className="input input-bordered input-accent w-full max-w-xs" value={newUser.nama_lomba} onChange={handleInputChange} />
          </label>
        </div>
        <p className="text-[18px] mb-2">Nama Perwakilan:</p>
        <div className="mb-4">
          <label>
            <input type="text" placeholder="Mekabot" name="nama_peserta" className="input input-bordered input-accent w-full max-w-xs" value={newUser.nama_peserta} onChange={handleInputChange} />
          </label>
        </div>
        <label className="block mb-4">
          Kelas:
          <input type="text" name="nama_kelas" value={newUser.nama_kelas} onChange={handleInputChange} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Jurusan:
          <input type="text" name="jurusan" value={newUser.jurusan} onChange={handleInputChange} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Kontak:
          <input type="text" name="kontak" value={newUser.kontak} onChange={handleInputChange} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <label className="block mb-4">
          Jumlah Pemain:
          <input type="text" name="jumlah_pemain" value={newUser.jumlah_pemain} onChange={handleInputChange} className="block w-full border-gray-300 rounded-lg p-2" />
        </label>
        <div className="flex gap-4">
          <button type="submit" className="btn bg-green-400 text-gray-600 cursor-pointer px-2 text-[18px] font-semibold">
            Daftar
          </button>
          <Link to="/PendaftarLomba">
            <FontAwesomeIcon />
            <p className="btn bg-green-400 text-gray-600 cursor-pointer px-2 text-[18px] font-semibold">Kembali Ke Halaman Daftar</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
