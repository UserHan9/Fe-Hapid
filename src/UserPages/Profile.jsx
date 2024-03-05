import React, { useState, useEffect } from 'react';
import SidebarUser from '../components/SidebarUser';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profiles/1'); // Ganti 1 dengan ID profil yang ingin Anda tampilkan
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <SidebarUser />
      <div>
        <h2>Profile</h2>
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <img src={profileData.image} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
