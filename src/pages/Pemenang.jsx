import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Pemenang = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    attachment: null, // File attachment
    nama_lomba: '',
    keterangan: '',
    nama_kelas: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmailData({ ...emailData, [name]: name === 'attachment' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('to', emailData.to);
    formData.append('subject', emailData.subject);
    formData.append('message', emailData.message);
    formData.append('attachment', emailData.attachment);
    formData.append('nama_lomba', emailData.nama_lomba);
    formData.append('keterangan', emailData.keterangan);
    formData.append('nama_kelas', emailData.nama_kelas);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pemenang-lomba', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-10">
        <h1 className="text-2xl text-gray-600">Input Email Sent To :</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="to" value={emailData.to} onChange={handleChange} placeholder="Recipient Email" className="border border-gray-300 rounded-md p-2 mt-2" required />
          <input type="text" name="subject" value={emailData.subject} onChange={handleChange} placeholder="Subject" className="border border-gray-300 rounded-md p-2 mt-2" required />
          <textarea name="message" value={emailData.message} onChange={handleChange} placeholder="Message" className="border border-gray-300 rounded-md p-2 mt-2" required />
          <input type="file" name="attachment" onChange={handleChange} className="border border-gray-300 rounded-md p-2 mt-2" />
          <input type="text" name="nama_lomba" value={emailData.nama_lomba} onChange={handleChange} placeholder="Nama Lomba" className="border border-gray-300 rounded-md p-2 mt-2" required />
          <input type="text" name="keterangan" value={emailData.keterangan} onChange={handleChange} placeholder="Keterangan" className="border border-gray-300 rounded-md p-2 mt-2" required />
          <input type="text" name="nama_kelas" value={emailData.nama_kelas} onChange={handleChange} placeholder="Nama Kelas" className="border border-gray-300 rounded-md p-2 mt-2" required />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pemenang;
