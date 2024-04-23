import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SidebarUser from '../components/SidebarUser';

const PendaftaranLomba = () => {
  const [dataLomba, setDataLomba] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/buat-lomba/show?page=${currentPage}`);
        setDataLomba(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex'>
      <SidebarUser/>
        <div className="mt-20">
          <div className="flex justify-center items-center gap-5 w-[1120px] ml-10 overflow-x-auto">
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex flex-col gap-x-10 gap-10 w-52">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                ))}
              </>
            ) : (
              dataLomba.map((lomba) => (
                <div key={lomba.id} className="card w-[500px] bg-base-200 shadow-xl h-[400px]">
                  <figure className="px-2 pt-10">
                    <img src={`http://127.0.0.1:8000/storage/post_img/${lomba.image}`} alt="Lomba-image" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{lomba.nama_pj}</h2>
                    <h3 className="text-[18px] font-semibold"> {lomba.nama_lomba}</h3>
                    <p className="font-semibold">{lomba.kontak}</p>
                    <div className="card-actions">
                      <Link to={`/MendaftarLomba/${lomba.id}`}>
                        <button className="btn btn-primary mt-2">Daftar</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center items-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`font-semibold mx-1 px-5 py-3 rounded-full ${currentPage === index + 1 ? 'bg-green-300' : 'bg-gray-200'}`}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
    </div>
      
  );
};

export default PendaftaranLomba;
