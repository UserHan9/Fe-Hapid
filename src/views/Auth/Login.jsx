import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../Api';
import Cookies from 'js-cookie';
import { faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import Logo from '../../assets/images/Logo-Harmoni.png';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await Api.post('api/login', { email, password });
      const { success, id, name, email: userEmail, roles, permissions } = response.data;

      if (success) {
        // Simpan token, user, permissions, dan role ke cookies
        const token = response.data.token;
        Cookies.set('token', token);
        Cookies.set('user', JSON.stringify({ id, name, email: userEmail, roles }));
        Cookies.set('permissions', JSON.stringify(permissions));
        Cookies.set('roles', JSON.stringify(roles));
        console.log(token); //Log untuk melihat response
        console.log(response.data);
        // Simpan token, user, permissions, dan role ke local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id, name, email: userEmail, roles }));
        localStorage.setItem('permissions', JSON.stringify(permissions));
        localStorage.setItem('roles', JSON.stringify(roles));

        // Navigasi ke halaman sesuai peran user
        if (roles.includes('admin')) {
          navigate('/DashboardPages');
        } else {
          navigate('/DashboardUser');
        }

        toast.success('Login Succesfully!!🔥', {
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
      } else {
        setErrors('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Kesalahan login:', error);

      if (error.response) {
        setErrors(error.response.data.message);
      } else if (error.request) {
        setErrors('Error jaringan. Silakan coba lagi nanti.');
      } else {
        // setErrors('Terjadi kesalahan yang tidak terduga');
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
          <form
            className="max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleLogin(formData.get('email'), formData.get('password'));
            }}
          >
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
                <input id="email" type="text" name="email" className="form-control w-full border p-2 rounded-lg" placeholder="Masukkan Alamat Email" />
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
                <input id="password" type="password" name="password" className="form-control w-full border p-2 rounded-lg" autoComplete="off" placeholder="Masukkan Kata Sandi Anda" />
              </div>
            </div>
            <button type="submit" className="w-full py-2 bg-green-400 hover:bg-green-800 rounded-md mb-4 text-[20px]" disabled={loading}>
              {loading ? 'Sedang masuk, harap tunggu...' : 'Masuk'}
            </button>
            {errors && <p className="text-red-500 shrink-0 font-semibold p-0 m-0">{errors}</p>}
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
