import React, { useState, useEffect } from 'react';
import SidebarUser from '../components/SidebarUser';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PendaftaranLomba = () => {
  const [dataLomba, setDataLomba] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLomba, setSelectedLomba] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buat-lomba/show');
        setDataLomba(response.data.data); // Mengambil array data dari respons
        setLoading(false); // Set loading menjadi false setelah data diambil
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <SidebarUser />
      <div className="flex justify-center items-center gap-5 w-[1200px] ml-10 overflow-x-auto">
        {loading ? ( // Tampilkan skeleton loader jika loading masih true
          <>
            {[...Array(3)].map(
              (
                _,
                index // Ubah angka sesuai dengan jumlah data yang akan ditampilkan
              ) => (
                <div key={index} className="flex flex-col gap-x-10 gap-10 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              )
            )}
          </>
        ) : (
          dataLomba.map((lomba) => (
            <div key={lomba.id} className="card w-[500px] bg-base-200 shadow-xl h-[400px]" onClick={() => setSelectedLomba(lomba.nama_lomba)}>
              <figure className="px-2 pt-10">
                <img src={`http://127.0.0.1:8000/storage/post_img/${lomba.image}`} alt="Lomba-image" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">PJ : {lomba.nama_pj}</h2>
                <h3 className="text-[18px] font-semibold">Lomba : {lomba.nama_lomba}</h3>
                <p className="font-semibold">Kontak : {lomba.kontak}</p>
                <div className="card-actions">
                  <Link to="/MendaftarLomba">
                    <button className="btn btn-primary mt-2">Daftar</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendaftaranLomba;
