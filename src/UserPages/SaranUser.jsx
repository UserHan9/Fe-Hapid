import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SidebarUser from '../components/SidebarUser'; // Hapus salah satu impor ini jika tidak diperlukan

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
      setChats(response.data.messages);
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
        id: response.data.id, // Anda perlu menyesuaikan ini dengan ID yang dikembalikan dari API
        message: pesan,
        user_id: response.data.user_id,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
        user_name: 'user',
      };

      setChats([...chats, newChat]);
      setPesan('');
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan');
    }
  };

  return (
    <div className="flex">
      <SidebarUser />
      <div className="container pt-10 lg:flex lg:flex-row lg:gap-x-3">
        <div className="max-w-4xl justify-center mx-auto lg:w-1/2">
          <p className="text-lg font-bold ml-10 ">Masukan Saran :</p>
          <div className="mb-6 lg:mt-5">
            <label htmlFor="saran" className="block mb-2 text-lg font-medium text-gray-900 ml-10 ">
              Saran :
            </label>
            <textarea id="saran" rows="4" name="saran" className=" ml-10 block p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border " placeholder="Masukan saran yang membangun..." value={pesan} onChange={handleChange}></textarea>
            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 mt-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-10 ">
              Submit
            </button>
          </div>
        </div>
        <div className="overflow-y-auto h-[600px] sm:rounded-lg mx-auto items-center lg:w-1/2 p-5" ref={chatContainerRef}>
          <h1 className="font-semibold mb-10 text-2xl">Pesan yang telah dikirim : </h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengirim
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pesan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chats.map((chat, index) => (
                <tr key={chat.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{chat.user_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{chat.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Saran;
