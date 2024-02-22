import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Saran = () => {
  const [pesan, setPesan] = useState('');
  const [chats, setChats] = useState([]);

  const handleChange = (e) => {
    setPesan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data pesan ke backend
    axios.post('/chats', { pesan })
      .then(response => {
        // Tambahkan pesan baru ke state chats
        setChats([...chats, pesan]);
        // Reset input pesan
        setPesan('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <h1>Saran Lomba</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={pesan} onChange={handleChange} />
          <button type="submit">Kirim</button>
        </form>
        <div>
          {chats.map((chat, index) => (
            <div key={index}>{chat}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Saran;
