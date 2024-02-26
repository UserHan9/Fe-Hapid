import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarUser from '../components/SidebarUser';
import { FaSearch } from 'react-icons/fa';
const JadwalLombaUser = () => {
  const [jadwal, setJadwal] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/jadwal/show');
      setJadwal(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredJadwal = jadwal.filter((item) => item.nama_lomba.toLowerCase().includes(searchKeyword.toLowerCase()));

  return (
    <div className="flex">
      <SidebarUser />
      <div className="ml-10">
        <h1 className="text-3xl font-bold mb-6 mx-10 my-7">Jadwal Lomba Bermain - Jadwal Main</h1>
        <div className="flex justify-end items-center mb-3 mr-3">
          <FaSearch className="mt-4 ml-10" />
          <input type="text" placeholder="Search by nama lomba..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="border p-2 rounded-md ml-7 mt-5" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredJadwal.map((item) => (
            <div key={item.id} className="border p-4 rounded-md ml-7 mt-5">
              <h2 className="font-bold mb-2 text-2xl">{item.nama_lomba}</h2>
              <p className="font-semibold">Tanggal: {item.tanggal}</p>
              <p>Waktu: {item.waktu}</p>
              <p>Kelas: {item.kelas}</p>
              <p>Tempat: {item.tempat}</p>
              <p>Keterangan: {item.keterangan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JadwalLombaUser;
