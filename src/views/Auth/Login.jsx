import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../Api';
import Cookies from 'js-cookie';
import { faEnvelope, faLock, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import Logo from '../../assets/images/Logo-Harmoni.png';

const Login = () => {
  // State hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  // Effect hook untuk memeriksa token yang sudah ada
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/'); // Sesuaikan rute jika diperlukan
    }
  }, [navigate]);

  // Handler untuk proses login
  const handleLogin = async () => {
    setLoading(true);
    setErrors(null); // Menghapus error sebelumnya

    try {
      const response = await Api.post('/api/login', {
        email,
        password,
      });

      const { token, user, permissions, roles } = response.data;

      // Simpan token ke cookies
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(user));
      Cookies.set('permissions', JSON.stringify(permissions));
      Cookies.set('role', roles && roles.length > 0 ? roles[0] : null);

      // Simpan token ke localStorage
      localStorage.setItem('token', token);

      console.log('Token',token);

      console.log('Permissions:', permissions);

      toast.success('Keren!! Bisa Login 😎', {
        position: 'top-right',
        duration: 5000,
        style: {
          borderRadius: '0.5rem',
          backgroundColor: '#10B981', // Warna hijau
          padding: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: 'white',
        },
      });

      const userRole = roles && roles.length > 0 ? roles[0] : null;

      if (userRole) {
        switch (userRole) {
          case 'admin':
            navigate('/AdminDashboard');
            break;
          case 'user':
            navigate('/UserDashboard');
            break;
          default:
            console.error('Peran tidak dikenali:', userRole);
            navigate('/default-dashboard');
        }
      } else {
        console.error('Tidak ada peran ditemukan dalam respons:', roles);
        // Tangani jika tidak ada peran dalam respons
      }
    } catch (error) {
      console.error('Kesalahan login:', error);

      if (error.response) {
        setErrors(error.response.data.message);
      } else if (error.request) {
        setErrors('Error jaringan. Silakan coba lagi nanti.');
      } else {
        setErrors('Terjadi kesalahan yang tidak terduga');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[480px] shadow-lg shadow-green-800 sm:max-w-[850px]">
        <div className="w-full h-[480px] hidden md:block">
          <div className="w-full h-full object-cover border rounded-md">
            <img className="py-[30px]" src={Logo} alt="Harmoni Tech Logo" />
          </div>
        </div>
        <div className="p-4 flex flex-col justify-around">
          <form className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Selamat Datang di Si-Meet <span className="text-gray-700 mt-2">Harmoni Tech</span>
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="flex items-center text-justify">
                <span className="md:w-6">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input id="email" type="text" className="form-control w-full border p-2 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Kata Sandi
              </label>
              <div className="flex items-center text-justify">
                <span className="md:w-6">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input id="password" type="password" className="form-control w-full border p-2 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" placeholder="Masukkan Kata Sandi Anda" />
              </div>
            </div>
            <button onClick={handleLogin} className="w-full py-2 bg-green-400 hover:bg-green-800 rounded-md mb-4 text-[20px]" disabled={loading}>
              {loading ? 'Sedang masuk, harap tunggu...' : 'Masuk'}
            </button>
            {errors && <p className="text-red-500">{errors}</p>}
            {/* Tautan untuk kembali ke halaman utama */}
            <Link to="/">
              <p className="btn bg-green-400 text-gray-600 cursor-pointer px-2 text-[18px] font-semibold">
                <FontAwesomeIcon icon={faArrowLeft} />
                Ke Halaman Utama
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
