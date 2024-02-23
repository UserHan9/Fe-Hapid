import React, { useState, useEffect } from 'react';
import SidebarUser from '../components/SidebarUser';
import axios from 'axios';

const SaranUser = () => {
  const [pesan, setPesan] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/chats/message');
      setChats(response.data.messages);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setPesan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/chats', { message: pesan })
      .then((response) => {
        setChats([...chats, response.data.message]);
        setPesan('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex">
      <SidebarUser />
      <div>
        <h1>Saran Kotajk</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={pesan} onChange={handleChange} />
          <button type="submit">Kirim</button>
        </form>
        <div>
          {chats.map((pesan, index) => (
            <div key={index}>{pesan}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaranUser;
