import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar'; // Menggunakan Sidebar

const Saran = () => {
  const [pesan, setPesan] = useState('');
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://127.0.0.1:8000/api/chats/message', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(
        response.data.messages.map((message) => ({
          id: message.id,
          user_id: message.user_id,
          message: message.message,
          user_name: 'admin',
        }))
      );
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan');
    }
  };

  const handleChange = (e) => {
    setPesan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('User tidak terautentikasi');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/chats',
        { message: pesan },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newChat = {
        id: response.data.message.id,
        user_id: response.data.message.user_id,
        message: pesan,
        user_name: response.data.user_name,
      };

      setChats([newChat, ...chats]);
      setPesan('');
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan, bisa jadi token anda habis, anda bisa coba untuk login kembali');
    }
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
        await axios.delete(`http://127.0.0.1:8000/api/chats/${id}`);
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="overflow-y-auto max-h-[600px] mb-4" ref={chatContainerRef}>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">No</th>
                {/* <th className="px-4 py-2 text-center">Pengirim</th> */}
                <th className="px-4 py-2 text-center">Pesan</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {chats.map((chat, index) => (
                <tr key={chat.id}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  {/* <td className="border px-4 py-2 text-center">{chat.user_name}</td> */}
                  <td className="border px-4 py-2 text-center">{chat.message}</td>
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleDelete(chat.id)} className="bg-red-500 text-white px-2 rounded-full">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input type="text" placeholder="Type here" className="flex-1 border p-2" value={pesan} onChange={handleChange} />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2">
            Kirim
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Saran;

