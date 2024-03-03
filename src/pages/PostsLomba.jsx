import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostsLomba = () => {
  const [namaLomba, setNamaLomba] = useState('');
  const [namaPJ, setNamaPJ] = useState('');
  const [kontak, setKontak] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('nama_pj', namaPJ);
    formData.append('kontak', kontak);
    formData.append('nama_lomba', namaLomba);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/buat-lomba', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      if (data.status) {
        setMessage(data.message);
        setNamaLomba('');
        setNamaPJ('');
        setKontak('');
        setImage(null);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Data Lomba Berhasil Disimpan',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-32 py-14 mx-2">
        <h1 className="text-3xl font-bold mb-6 ml-3">Posts Lomba - Create Lomba Untuk Peserta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="text-2xl mb-2">Masukan Nama Lomba</p>
            <input type="text" value={namaLomba} onChange={(e) => setNamaLomba(e.target.value)} className="bg-green-100 rounded-md px-9 py-4 text-[19px] border" placeholder="Nama Lomba" />
          </div>
          <div className="mb-3">
            <p className="text-2xl mb-2">Masukan Nama PJ</p>
            <input type="text" className="bg-green-100 rounded-md px-9 py-4 text-[19px] border" placeholder="Nama PJ" value={namaPJ} onChange={(e) => setNamaPJ(e.target.value)} />
          </div>
          <div className="mb-3">
            <p className="text-2xl mb-2">Kontak</p>
            <input type="text" className="bg-green-100 rounded-md px-9 py-4 text-[19px] border" placeholder="Kontak" value={kontak} onChange={(e) => setKontak(e.target.value)} />
          </div>
          <div className="mb-5">
            <p className="text-2xl mb-2">Masukan image : </p>
            <input type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs text-[19px]" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button type="submit" className="bg-green-300 px-5 py-3 rounded-md text-[18px]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostsLomba;
