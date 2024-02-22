import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Nama Lomba:</p>
          <input type="text" placeholder="Volly" name="nama_lomba" value={newUser.nama_lomba} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 placeholder:text-center text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Nama Peserta:</p>
          <input type="text" placeholder="Mekabot" name="nama_peserta" value={newUser.nama_peserta} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 placeholder:text-center text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Kelas:</p>
          <input type="text" placeholder="11 PPLG 3" name="nama_kelas" value={newUser.nama_kelas} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 placeholder:text-center text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Jurusan:</p>
          <input type="text" placeholder="PPLG" name="jurusan" value={newUser.jurusan} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 placeholder:text-center text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Kontak:</p>
          <input type="text" placeholder="0989089XXXX" name="kontak" value={newUser.kontak} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 placeholder:text-center text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Jumlah Pemain:</p>
          <input type="text" placeholder="12" name="jumlah_pemain" value={newUser.jumlah_pemain} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 placeholder:text-center text-[17px]" />
        </label>
        <div className="flex gap-4">
          <button type="submit" className="btn bg-green-400 text-gray-600 cursor-pointer px-2 text-[18px] font-semibold">
            Daftar
          </button>
          <Link to="/PendaftarLomba">
            <p className="btn bg-green-400 text-gray-600 cursor-pointer px-2 text-[18px] font-semibold">Kembali Ke Halaman Daftar</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
