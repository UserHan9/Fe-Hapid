import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Saran = () => {
  const [pesan, setPesan] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/chats/message');
      setChats(response.data.messages); // Mengambil array pesan dari respons
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setPesan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/chats', { message: pesan }) // Menggunakan key 'message' sesuai dengan yang diharapkan oleh backend
      .then(response => {
        setChats([...chats, response.data.message]); // Mengambil pesan dari respons
        setPesan('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDelete = async (index) => { // Menghapus pesan berdasarkan index
    try {
      await axios.delete(`http://127.0.0.1:8000/api/chats/${index}`); // Menggunakan index sebagai parameter untuk menghapus pesan
      setChats(chats.filter((_, i) => i !== index)); // Menghapus pesan dari state chats
    } catch (error) {
      console.error('Error:', error);
    }
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
          {chats.map((pesan, index) => (
            <div key={index}>
              {pesan}
              <button onClick={() => handleDelete(index)}>Hapus</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Saran;
