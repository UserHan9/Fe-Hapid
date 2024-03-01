import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { IoPersonAdd } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const UserAccount = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      // Mendapatkan permissions dari cookies
      const permissions = JSON.parse(Cookies.get('permissions'));

      // Memeriksa apakah user memiliki permission users.index
      if (permissions && permissions['users.index']) {
        const response = await axios.get(`http://127.0.0.1:8000/api/users?page=${currentPage}`);
        setUsers(response.data.data);
        setTotalPages(response.data.last_page);
      } else {
        // Tampilkan pesan bahwa user tidak memiliki izin
        console.error('User tidak memiliki izin untuk mengakses data pengguna');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Yakin Hapus?',
        text: 'Data akan dihapus dari database',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Hapus saja!',
      });
      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/users/destroy/${id}`);
        fetchData();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="overflow-x-auto mx-auto my-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-4 ml-6 mt-5">Data Pengguna</h1>
            <Link to="/DataKelas">
              <button className="px-3 py-5 bg-green-300 font-semibold rounded-xl mb-6 flex">
                <IoPersonAdd className="mt-1 mx-2" />
                Tambah data
              </button>
            </Link>
          </div>
          <table className="table w-full mt-10 ml-3">
            <thead>
              <tr>
                <th className="text-[23px] text-center">ID</th>
                <th className="text-[23px] text-center">Nama</th>
                <th className="text-[23px] text-center">Email</th>
                <th className="text-[23px] text-center">Role</th>
                <th className="text-[23px] text-center">Dibuat Pada</th>
                <th className="text-[23px] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-[18px] border text-center">{user.id}</td>
                  <td className="text-[18px] border text-center">{user.name}</td>
                  <td className="text-[18px] border text-center">{user.email}</td>
                  <td className="text-[18px] border text-center">{user.role}</td>
                  <td className="text-[18px] border text-center">{user.created_at}</td>
                  <td className="text-[18px] border text-center">
                    <button onClick={() => handleDelete(user.id)} className="text-red-500">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-5">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)} className="font-semibold  mx-1 px-5 py-3 rounded-full bg-green-300">
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
