import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const DaftarlombaPages = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Cy Ganderton', Jurusan: 'Animasi', favoriteColor: 'Blue' },
    { id: 2, name: 'Hart Hagerty', Jurusan: 'PPLG', favoriteColor: 'Purple' },
    { id: 3, name: 'Brice Swyre', Jurusan: 'Teknik Otomotif', favoriteColor: 'Red' },
  ]);

  // TODO: Tambahkan fungsi-fungsi CRUD di sini

  const handleEdit = (userId) => {
    // TODO: Logika untuk meng-handle edit
    console.log(`Edit user with ID ${userId}`);
  };

  const handleDelete = (userId) => {
    // TODO: Logika untuk meng-handle delete
    console.log(`Delete user with ID ${userId}`);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="overflow-x-auto mx-auto my-8">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Jurusan</th>
              <th>Favorite Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.Jurusan}</td>
                <td>{user.favoriteColor}</td>
                <td>
                  <button className="mr-3" onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TODO: Tambahkan formulir atau modal untuk Create dan Update di sini */}
      </div>
    </div>
  );
};

export default DaftarlombaPages;
