import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarUser from '../components/SidebarUser';

const RiwayatDaftarUser = () => {
  const [riwayatDaftar, setRiwayatDaftar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/riwayat-daftar');
        setRiwayatDaftar(response.data);
      } catch (error) {
        console.error('Error fetching riwayat daftar:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <SidebarUser />
      <div className="ml-8">
        <h1 className="text-2xl font-bold mb-4">Riwayat Daftar User</h1>
        <ul>
          {riwayatDaftar.map((riwayat) => (
            <li key={riwayat.id}>{riwayat.nama_peserta} - {riwayat.nama_lomba}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RiwayatDaftarUser;
