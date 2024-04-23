import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaFileExport } from "react-icons/fa6";
import { CSVLink, CSVDownload } from "react-csv";
import SidebarUser from '../components/SidebarUser';

const base_url = 'http://127.0.0.1:8000/api/jadwal/show'

const ExportData = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await axios.get(base_url)
    setData(response.data.data)
    console.log(response.data.data)
  }

  // const exportToExcel = () => {
  //   const xls = json2xls(data)
  //   const fileName = "data-lomba.xlsx"
  //   fs.writeFileSync(fileName, xls, 'binary')
  //   window.open(fileName)
  // }
  return (
    <div className="flex">
    <SidebarUser/>
    <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 ml-3">Data Lomba - Export Data Lomba User</h1>
        <div className="flex justify-end items-center mb-3 mr-3">
        <CSVLink data={data} filename={"Data-Lomba.csv"}>
        <button className='text-[22px] flex  text-slate-100 font-semibold bg-slate-600 p-3 rounded-xl'>
          <div>
        <FaFileExport className='mt-1 mx-2'/>
          </div>
           Export Data 
           </button>
        </CSVLink>
      
        </div>
        <table className="table w-full mt-10 ml-5">
          <thead>
            <tr className="font-extrabold">
             
              <th className="text-[23px] text-center">Nama Lomba</th>
              <th className="text-[23px] text-center">Tempat</th>
              <th className="text-[23px] text-center">Kelas</th>
              <th className="text-[23px] text-center">Tanggal</th>
              <th className="text-[23px] text-center">Waktu</th>
              <th className="text-[23px] text-center">Keterangan</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {data.map((user) => (
              <tr key={user.id}>
              
                <td className="text-[20px] border text-center">{user.nama_lomba}</td>
                <td className="text-[20px] border text-center">{user.tempat}</td>
                <td className="text-[20px] border text-center">{user.kelas}</td>
                <td className="text-[20px] border text-center">{user.tanggal}</td>
                <td className="text-[20px] border text-center">{user.waktu}</td>
                <td className="text-[20px] border text-center">{user.keterangan}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExportData