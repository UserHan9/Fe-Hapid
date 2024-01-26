import React, { useState, useEffect } from 'react';
  import Api from '../../Api';
  import Cookies from 'js-cookie';
  import { useNavigate } from 'react-router-dom';
  import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import toast from 'react-hot-toast';
  import Logo from '../../assets/images/Logo-Harmoni.png';

  const Login = () => {
    // State hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Navigation hook
    const navigate = useNavigate();

    // Effect hook to check for existing token
    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
        navigate('/');
      }
    }, [navigate]);

    // Login handler
  // ...

  // Login handler
  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await Api.post('/api/login', {
        email,
        password,
      });

      const { token, user, permissions, roles } = response.data;

      // Save token to cookies
      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user));
      Cookies.set("permissions", JSON.stringify(permissions));
      Cookies.set("role", roles[0]);

      // Save token to localStorage
      localStorage.setItem("token", token);

      console.log("Permissions:", permissions);

      toast.success("Login Successfully!", {
        position: "top-center",
        duration: 4000,
      });

        const userRole = roles[0];

        switch (userRole) {
          case "admin":
            navigate("/AdminDashboard");
            break;
          case "user":
            navigate("/UserDashboard");
            break;
          default:
            console.error("Role not recognized:", userRole);
            navigate("/default-dashboard");
        }
      } catch (error) {
        if (error.response) {
          setErrors(error.response.data.message);
        } else if (error.request) {
          setErrors("Network error. Please try again later.");
        } else {
          setErrors("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

  // ...
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
                Welcome To Si-Meet <span className="text-gray-700 mt-2">Harmoni Tech</span>
              </h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <div className="flex items-center text-justify">
                  <span className="md:w-6">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    id="email"
                    type="text"
                    className="form-control w-full border p-2 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="flex items-center text-justify">
                  <span className="md:w-6">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    id="password"
                    type="password"
                    className="form-control w-full border p-2 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-2 bg-green-400 hover:bg-green-800 rounded-md mb-4 text-[20px]"
                disabled={loading}
              >
                {loading ? 'Sedang-Login, Sabar...' : 'Log in'}
              </button>
              <p className="text-gray-600 cursor-default px-2 text-[18px] font-semibold">Silahkan Login..</p>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default Login;