import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Pemenang = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    attachment: null,
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
      toast.success('Email sent successfully!');
      navigate('/Pemenang'); // Navigate to "/Pemenang" after successful email sending
    } catch (error) {
      console.error(error.response.data);
      toast.error('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-10">
        <h1 className="text-3xl font-bold mb-4 ml-2 mt-1">Sertifikat Pemenang</h1>
        <form onSubmit={handleSubmit} className="mt-4 max-w-[700px]">
          <div className="mb-2">
            <label htmlFor="nama_kelas" className="block text-lg font-medium text-gray-700">
              Nama Kelas
            </label>
            <input
              type="text"
              name="nama_kelas"
              id="nama_kelas"
              value={emailData.nama_kelas}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="to" className="block text-lg font-medium text-gray-700">
              Recipient Email
            </label>
            <input
              type="email"
              name="to"
              id="to"
              value={emailData.to}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="subject" className="block text-lg font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={emailData.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={emailData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="attachment" className="block text-lg font-medium text-gray-700">
              Attachment/Sertifikat
            </label>
            <input
              type="file"
              name="attachment"
              id="attachment"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block sm:text-sm file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="nama_lomba" className="block text-lg font-medium text-gray-700">
              Nama Lomba
            </label>
            <input
              type="text"
              name="nama_lomba"
              id="nama_lomba"
              value={emailData.nama_lomba}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="keterangan" className="block text-lg font-medium text-gray-700">
              Keterangan
            </label>
            <input
              type="text"
              name="keterangan"
              id="keterangan"
              value={emailData.keterangan}
              onChange={handleChange}
              className="max-w-[600px] border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pemenang;
