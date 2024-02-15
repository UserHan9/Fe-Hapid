import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';
import Edit from '../components/Edit';

const DataLomba = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nama_lomba: '',
    nama_peserta: '',
    nama_kelas: '',
    jurusan: '',
    kontak: '',
    jumlah_pemain: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null); // Menyimpan data user yang akan diedit
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/lomba/show?page=${currentPage}`);
      setUsers(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (user) => {
    setEditUser(user); // Set data user yang akan diedit ke state editUser
    setIsModalOpen(true); // Buka modal edit
  };

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

    setIsModalOpen(false); // Tutup modal edit
    setEditUser(null); // Reset editUser setelah pengeditan selesai
  };

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

  const handleAddUser = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/lomba/create', newUser);
      fetchData();
      Swal.fire({
        title: 'Sukses!',
        text: 'Data peserta berhasil ditambahkan.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add user.',
        icon: 'error',
      });
    }

    setNewUser({
      nama_lomba: '',
      nama_peserta: '',
      nama_kelas: '',
      jurusan: '',
      kontak: '',
      jumlah_pemain: '',
    });
    setIsModalOpen(false);
    setEditUser(null); // Reset editUser setelah penambahan user selesai
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 ml-3">Data Lomba - Data Peserta</h1>
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
            {users.map((user) => (
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
        <div className="flex justify-center items-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)} className="mx-1 px-3 py-1 bg-gray-300">
              {index + 1}
            </button>
          ))}
        </div>
        <div className="flex justify-center items-center mt-5">
          <button className="bg-green-400 px-4 py-2 rounded-lg" onClick={() => setIsModalOpen(true)}>
            Tambah User
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            {editUser ? (
              <Edit user={editUser} setIsModalOpen={setIsModalOpen} fetchData={fetchData} handleEditUser={handleEditUser} />
            ) : (
              <div className="bg-white p-8 rounded-lg">
              <form onSubmit={handleAddUser}>
                <label className="block mb-4">
                  Nama Lomba:
                  <input type="text" value={newUser.nama_lomba} onChange={(e) => setNewUser({ ...newUser, nama_lomba: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
                </label>
                <label className="block mb-4">
                  Nama Perwakilan:
                  <input type="text" value={newUser.nama_peserta} onChange={(e) => setNewUser({ ...newUser, nama_peserta: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
                </label>
                <label className="block mb-4">
                  Kelas:
                  <input type="text" value={newUser.nama_kelas} onChange={(e) => setNewUser({ ...newUser, nama_kelas: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
                </label>
                <label className="block mb-4">
                  Jurusan:
                  <input type="text" value={newUser.jurusan} onChange={(e) => setNewUser({ ...newUser, jurusan: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
                </label>
                <label className="block mb-4">
                  Kontak:
                  <input type="text" value={newUser.kontak} onChange={(e) => setNewUser({ ...newUser, kontak: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
                </label>
                <label className="block mb-4">
                  Jumlah Pemain:
                  <input type="text" value={newUser.jumlah_pemain} onChange={(e) => setNewUser({ ...newUser, jumlah_pemain: e.target.value })} className="block w-full border-gray-300 rounded-lg p-2" />
                </label>
                <button type="submit" className="bg-green-400 px-4 py-2 rounded-lg">
                  Simpan
                </button>
                <button type="button" className="ml-2 bg-red-400 px-4 py-2 rounded-lg" onClick={() => setIsModalOpen(false)}>
                  Batal
                </button>
              </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataLomba;