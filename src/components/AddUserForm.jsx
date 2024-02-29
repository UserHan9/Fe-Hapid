import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AddUserForm = () => {
  const [newUser, setNewUser] = useState({
    nama_kelas: '',
    jumlah_pemain: '',
    nama_peserta: '',
    jurusan: '',
    kontak: '',
    buat_lomba_id: 3, // Sesuaikan dengan id lomba yang sedang berlangsung
  });

  const [namaLomba, setNamaLomba] = useState('');

  useEffect(() => {
    // Fetch nama lomba dari API saat komponen dimuat
    fetchNamaLomba();
  }, []);

  const fetchNamaLomba = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/lomba'); // Ubah URL dengan endpoint yang benar
      setNamaLomba(response.data.nama_lomba);
    } catch (error) {
      console.error('Error fetching nama lomba:', error);
    }
  };

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
      await axios.post('http://127.0.0.1:8000/api/lomba/create', newUser); // Ubah URL dengan endpoint yang benar
      Swal.fire({
        title: 'Sukses!',
        text: 'Pendaftaran berhasil.',
        icon: 'success',
      });
      setNewUser({
        nama_kelas: '',
        jumlah_pemain: '',
        nama_peserta: '',
        jurusan: '',
        kontak: '',
        buat_lomba_id: 1, // Reset nilai buat_lomba_id setelah pendaftaran
      });
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Gagal mendaftar.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      <h1 className="text-2xl mb-4 font-bold">Form Pendaftaran :</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Nama Kelas:</p>
          <input type="text" name="nama_kelas" value={newUser.nama_kelas} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Jumlah Pemain:</p>
          <input type="text" name="jumlah_pemain" value={newUser.jumlah_pemain} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Nama Peserta:</p>
          <input type="text" name="nama_peserta" value={newUser.nama_peserta} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Jurusan:</p>
          <input type="text" name="jurusan" value={newUser.jurusan} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 text-[17px]" />
        </label>
        <label className="flex flex-col mb-1">
          <p className="text-[16px]">Kontak:</p>
          <input type="text" name="kontak" value={newUser.kontak} onChange={handleInputChange} className="border-green-500 border rounded-lg p-2 w-full max-w-96 text-[17px]" />
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
