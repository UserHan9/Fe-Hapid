import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MendaftarLomba = () => {
  const { id } = useParams(); // Mengambil ID Lomba dari URL
  const [formData, setFormData] = useState({
    nama_peserta: '',
    nama_kelas: '',
    jumlah_pemain: '',
    jurusan: '',
    kontak: '',
    nama_lomba: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lomba/create`, { ...formData, buat_lomba_id: id });
      alert('Data berhasil disimpan');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nama Peserta:
        <input type="text" name="nama_peserta" value={formData.nama_peserta} onChange={handleChange} />
      </label>
      <label>
        Kelas:
        <input type="text" name="nama_kelas" value={formData.nama_kelas} onChange={handleChange} />
      </label>
      <label>
        Jumlah Pemain:
        <input type="number" name="jumlah_pemain" value={formData.jumlah_pemain} onChange={handleChange} />
      </label>
      <label>
        Jurusan:
        <input type="text" name="jurusan" value={formData.jurusan} onChange={handleChange} />
      </label>
      <label>
        Kontak:
        <input type="text" name="kontak" value={formData.kontak} onChange={handleChange} />
      </label>
      <input type="hidden" name="nama_lomba" value={formData.nama_lomba} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MendaftarLomba;
