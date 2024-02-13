import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';

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
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Tambahkan currentPage sebagai dependency untuk memperbarui data saat currentPage berubah

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
    setEditUser(user);
    setNewUser({
      nama_lomba: user.nama_lomba,
      nama_peserta: user.nama_peserta,
      nama_kelas: user.nama_kelas,
      jurusan: user.jurusan,
      kontak: user.kontak,
      jumlah_pemain: user.jumlah_pemain,
    });
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/lomba/update/${editUser.id}`, newUser);
      fetchData();
      Swal.fire({
        title: 'Data teredit',
        text: 'Data peserta berhasil diedit.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }

    setEditUser(null);
    setNewUser({
      nama_lomba: '',
      nama_peserta: '',
      nama_kelas: '',
      jurusan: '',
      kontak: '',
      jumlah_pemain: '',
    });
    setIsModalOpen(false);
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
      await fetchData();
      Swal.fire({
        title: 'Sukses!',
        text: 'Data peserta berhasil ditambahkan.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error adding user:', error);
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
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            Tambah Peserta
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-96">
              <h3 className="font-bold text-lg mb-4">{editUser ? 'Edit Peserta' : 'Tambah Peserta Baru'}</h3>
              <form onSubmit={editUser ? handleUpdateUser : handleAddUser}>
                <div className="mb-4">
                  <label className="block mb-2">Nama Lomba:</label>
                  <input type="text" value={newUser.nama_lomba} onChange={(e) => setNewUser({ ...newUser, nama_lomba: e.target.value })} className="w-full p-2 border" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Nama Peserta:</label>
                  <input type="text" value={newUser.nama_peserta} onChange={(e) => setNewUser({ ...newUser, nama_peserta: e.target.value })} className="w-full p-2 border" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Kelas:</label>
                  <input type="text" value={newUser.nama_kelas} onChange={(e) => setNewUser({ ...newUser, nama_kelas: e.target.value })} className="w-full p-2 border" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Jurusan:</label>
                  <select value={newUser.jurusan} onChange={(e) => setNewUser({ ...newUser, jurusan: e.target.value })} className="w-full p-2 border">
                    <option value="">Pilih Jurusan</option>
                    <option value="PPLG">PPLG</option>
                    <option value="ANIMASI">ANIMASI</option>
                    <option value="BCF">BCF</option>
                    <option value="TO">TO</option>
                    <option value="TPFL">TPFL</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Kontak:</label>
                  <input type="text" value={newUser.kontak} onChange={(e) => setNewUser({ ...newUser, kontak: e.target.value })} className="w-full p-2 border" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Jumlah Siswa:</label>
                  <input type="text" value={newUser.jumlah_pemain} onChange={(e) => setNewUser({ ...newUser, jumlah_pemain: e.target.value })} className="w-full p-2 border" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="btn bg-green-500 text-white mx-1">
                    {editUser ? 'Update' : 'Simpan'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn bg-red-500 mx-1 text-white">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataLomba;
