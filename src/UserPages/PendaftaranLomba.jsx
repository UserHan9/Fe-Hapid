import React, { useState, useEffect } from 'react';
import SidebarUser from '../components/SidebarUser';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PendaftaranLomba = () => {
  const [dataLomba, setDataLomba] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buat-lomba/show');
        setDataLomba(response.data.data); // Mengambil array data dari respons
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <SidebarUser />
      <div className="flex justify-center items-center gap-5 w-[1200px] ml-10">
        {dataLomba.map((lomba) => (
          <div key={lomba.id} className="card w-[500px] bg-base-200 shadow-xl h-[400px]">
            <figure className="px-2 pt-10">
              <img src={`http://127.0.0.1:8000/storage/post_img/${lomba.image}`} alt="Lomba-image" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{lomba.nama_pj}</h2>
              <p>{lomba.kontak}</p>
              <div className="card-actions">
                <Link to="/MendaftarLomba"><button className="btn btn-primary">Daftar</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendaftaranLomba;
