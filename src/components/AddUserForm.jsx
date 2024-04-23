import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MendaftarLomba = ({ updateRiwayatDaftar }) => {
  const { id } = useParams(); // Mengambil ID Lomba dari URL
  const [formData, setFormData] = useState({
    nama_peserta: '',
    nama_kelas: '',
    jumlah_pemain: '',
    jurusan: '',
    kontak: '',
    nama_lomba: '',
    buat_lomba_id: id, // Menggunakan ID Lomba dari URL
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lomba/create`, formData);
      alert('Data berhasil disimpan');
      console.log(response.data);
      setFormData({
        nama_peserta: '',
        nama_kelas: '',
        jumlah_pemain: '',
        jurusan: '',
        kontak: '', 
        nama_lomba: '',
        buat_lomba_id: id,
      });

      // Update riwayat daftar setelah berhasil mendaftar
      updateRiwayatDaftar(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama Lomba:
            <input type="text" placeholder="Nama Lomba akan sesuai seperti yang anda pilih di card Daftar" name="nama_peserta" value={formData.nama_lomba} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama Perwakilan:
            <input type="text" name="nama_peserta" value={formData.nama_peserta} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kelas:
            <input type="text" name="nama_kelas" value={formData.nama_kelas} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jumlah Pemain:
            <input type="number" name="jumlah_pemain" value={formData.jumlah_pemain} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jurusan:
            <input type="text" name="jurusan" value={formData.jurusan} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kontak:
            <input type="text" name="kontak" value={formData.kontak} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <input type="hidden" name="buat_lomba_id" value={formData.buat_lomba_id} />
        <div className='flex gap-3'>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        <Link to="/PendaftarLomba" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Kembali</Link>
        </div>
      </form>
    </div>
  );
};

export default MendaftarLomba;
