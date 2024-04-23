import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pemenang = () => {
  const [dataPemenang, setDataPemenang] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/pemenangs')
      .then((response) => {
        setDataPemenang(response.data);
      })
      .catch((error) => {
        console.error('Error fetching winners:', error);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4 ml-10 mt-5">Data Pemenang</h1>
        <table className="table-auto ml-10">
          <thead>
            <tr>
              <th className="px-4 py-2 text-[23px] text-center">Nama Lomba</th>
              <th className="px-4 py-2 text-[23px] text-center">Tanggal</th>
              <th className="px-4 py-2 text-[23px] text-center">Waktu</th>
              <th className="px-4 py-2 text-[23px] text-center">Tempat</th>
              <th className="px-4 py-2 text-[23px] text-center">Kelas Pemenang</th>
              <th className="px-4 py-2 text-[23px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPemenang.map((pemenang, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.nama_lomba}</td>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.tanggal}</td>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.waktu}</td>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.tempat}</td>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.kelas_pemenang}</td>
                <td className="border px-4 py-2 text-[18px] text-center">
                  <Link to="/PemenangLomba">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Kirim Sertifikat</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pemenang;
