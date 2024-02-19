import React, { useState, useEffect } from 'react';
import SidebarUser from '../components/SidebarUser';
import axios from 'axios';

const PendaftaranLomba = () => {
  const [lombaData, setLombaData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLombaData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jadwal/show');
        // Memeriksa jika respons adalah array sebelum mengatur state
        if (Array.isArray(response.data)) {
          setLombaData(response.data);
        } else {
          setError(new Error('Data fetched is not an array'));
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchLombaData();
  }, []);

  return (
    <div className='flex'>
      <SidebarUser />
      <div>
        {error && <p>There was an error: {error.message}</p>}
        {lombaData.map((lomba) => (
          <div key={lomba.id} className="card w-[500px] bg-base-100 shadow-xl h-[400px]">
            <figure className="px-10 pt-10">
              <img src={lomba.image_url} alt="Lomba" className="rounded-xl w-[300px]" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{lomba.nama_pj}</h2>
              <p>{lomba.kontak}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendaftaranLomba;
