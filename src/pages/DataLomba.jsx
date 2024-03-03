// Import dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';
import Edit from '../components/Edit';

// Define DataLomba component
const DataLomba = () => {
  // State variables
  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data on initial load and when currentPage changes
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/lomba/show');
      setUserData(response.data);
      setTotalPages(1); // Since we are not paginating data in this example, totalPages is always 1
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle edit action
  const handleEdit = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  // Function to handle edit user
  const handleEditUser = async (editedUser) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/lomba/update/${editedUser.id}`, editedUser);
      fetchData();
      Swal.fire({
        title: 'Sukses!',
        text: 'Data peserta berhasil diubah.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error editing user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to edit user.',
        icon: 'error',
      });
    }

    setIsModalOpen(false);
    setEditUser(null);
  };

  // Function to handle delete action
  const handleDelete = async (userId) => {
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
        await axios.delete(`http://127.0.0.1:8000/api/lomba/destroy/${userId}`);
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

  // Render component
  return (
    <div className="flex">
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 ml-3">Data Lomba - SI-Classmeet</h1>
        <table className="table w-full mt-10">
          <thead>
            <tr>
              <th className="text-[23px] text-center">ID</th>
              <th className="text-[23px] text-center">Nama Lomba</th>
              <th className="text-[23px] text-center">Nama Perwakilan</th>
              <th className="text-[23px] text-center">Kelas</th>
              <th className="text-[23px] text-center">Jurusan</th>
              <th className="text-[23px] text-center">Kontak</th>
              <th className="text-[23px] text-center">Jumlah Siswa</th>
              <th className="text-[23px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="text-[18px] border text-center">{user.id}</td>
                <td className="text-[18px] border text-center">{user.nama_lomba}</td>
                <td className="text-[18px] border text-center">{user.nama_peserta}</td>
                <td className="text-[18px] border text-center">{user.nama_kelas}</td>
                <td className="text-[18px] border text-center">{user.jurusan}</td>
                <td className="text-[18px] border text-center">{user.kontak}</td>
                <td className="text-[18px] border text-center">{user.jumlah_pemain}</td>
                <td className="text-[18px] border text-center">
                  <div className="flex">
                    <button className="mr-3 flex mb-2" onClick={() => handleEdit(user)}>
                      <CiEdit className="mr-1" />
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="flex">
                      <MdDelete className="mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <Edit user={editUser} setIsModalOpen={setIsModalOpen} fetchData={fetchData} />}
    </div>
  );
};

// Export component
export default DataLomba;
