import React from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Pemenang = () => {
  const dataPemenang = [
    {
      nama_lomba: 'Memasak',
      nama_kelas: '11 PPLG 3 vs 11 PPLG 2',
      jumlah_pemain: 5,
      kelas_pemenang: '11 PPLG 2',
    },
    // tambahkan data pemenang lainnya sesuai kebutuhan
  ];

  // const kirimSertifikat = (namaPemenang) => {
  //   // implementasi fungsi untuk mengirim sertifikat
  //   alert(`Mengirim sertifikat untuk ${namaPemenang}`);
  // };

  return (
    <div className="flex">
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4 ml-10 mt-5">Data Pemenang</h1>
        <table className="table-auto ml-10">
          <thead>
            <tr>
              <th className="px-4 py-2 text-[23px] text-center">Nama Lomba</th>
              <th className="px-4 py-2 text-[23px] text-center">Nama Kelas</th>
              <th className="px-4 py-2 text-[23px] text-center">Jumlah Pemain</th>
              <th className="px-4 py-2 text-[23px] text-center">Kelas Pemenang</th>
              <th className="px-4 py-2 text-[23px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPemenang.map((pemenang, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.nama_lomba}</td>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.nama_kelas}</td>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.jumlah_pemain}</td>
                <td className="border px-4 py-2 text-[18px] text-center">{pemenang.kelas_pemenang}</td>
                <td className="border px-4 py-2 text-[18px] text-center">
                  <Link to="/PemenangLomba">
                    {' '}
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
