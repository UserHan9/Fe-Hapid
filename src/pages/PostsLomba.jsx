import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostsLomba = () => {
  const [namaPJ, setNamaPJ] = useState('');
  const [namaLomba, setNamaLomba] = useState('');
  const [kontak, setKontak] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama_lomba', namaLomba);
    formData.append('nama_pj', namaPJ);
    formData.append('kontak', kontak);
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/buat-lomba', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      Swal.fire('Success', 'Data lomba telah berhasil dibuat', 'success');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-32 py-20 mx-5">
        <h1 className="text-3xl font-bold mb-6 ml-3">Posts Lomba - Create Lomba Untuk Peserta</h1>
        <form onSubmit={handleSubmit} className="px-2">
          <p className="text-[20px] mb-2">Masukan Nama PJ</p>
          <input type="text" className="bg-green-100 rounded-md px-9 py-4 text-[19px] border" placeholder="Nama PJ" value={namaPJ} onChange={(e) => setNamaPJ(e.target.value)} />
          <p className="text-[20px] mb-2">Masukan Nama Lomba</p>
          <input type="text" className="bg-green-100 rounded-md px-9 py-4 text-[19px] border" placeholder="Nama Lomba" value={namaLomba} onChange={(e) => setNamaLomba(e.target.value)} />
          <div className="mb-3">
            <p className="text-[20px] mb-2">Masukan No Contact</p>
            <input className="bg-green-200 rounded-md px-9 py-4 text-[19px]" type="text" placeholder="Kontak" value={kontak} onChange={(e) => setKontak(e.target.value)} />
          </div>
          <div className="mb-3">
            <p className="text-[20px] mb-2">Masukan image : </p>
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
