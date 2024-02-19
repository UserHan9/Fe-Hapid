import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const PostsLomba = () => {
  const [namaLomba, setNamaLomba] = useState('');
  const [namaPJ, setNamaPJ] = useState('');
  const [kontak, setKontak] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buat-lomba');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('nama_pj', namaPJ);
    formData.append('kontak', kontak);
    formData.append('nama_lomba', namaLomba);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/buat-lomba', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      if (data.status) {
        setMessage(data.message);
        setNamaLomba('');
        setNamaPJ('');
        setKontak('');
        setImage(null);
        // Setelah sukses submit, ambil data terbaru dari server
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/buat-lomba/show');
            setPosts(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div>
        <h2>Buat Lomba</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nama Lomba:</label>
            <input
              type='text'
              value={namaLomba}
              onChange={(e) => setNamaLomba(e.target.value)}
            />
          </div>
          <div>
            <label>Nama PJ:</label>
            <input
              type='text'
              value={namaPJ}
              onChange={(e) => setNamaPJ(e.target.value)}
            />
          </div>
          <div>
            <label>Kontak:</label>
            <input
              type='text'
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
            />
          </div>
          <div>
            <label>Gambar Lomba:</label>
            <input type='file' onChange={handleImageChange} />
          </div>
          <button type='submit'>Submit</button>
        </form>
        {message && <p>{message}</p>}
        
        {/* Tampilkan card untuk setiap entri */}
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
            <h3>{post.nama_lomba}</h3>
            <p>Nama PJ: {post.nama_pj}</p>
            <p>Kontak: {post.kontak}</p>
            <img src={`http://127.0.0.1:8000/storage/post_img/${post.image}`} alt={post.nama_lomba} style={{ maxWidth: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsLomba;
