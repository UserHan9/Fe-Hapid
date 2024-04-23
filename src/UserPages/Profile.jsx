import React, { useState, useEffect } from 'react';
import SidebarUser from '../components/SidebarUser';
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    image: '',
  });

  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${user.id}`);
          setProfile(response.data);
          setFormData({ ...formData, id: response.data.id });
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
      fetchProfileData();
    }
  }, [user]);

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('image', formData.image);

    try {
      await axios.put(`http://127.0.0.1:8000/api/profiles/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditing(false);
      setProfile({ ...profile, image: URL.createObjectURL(formData.image) });
      alert('Image updated successfully');
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  return (
    <div className="flex">
      <SidebarUser />
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        {profile ? (
          <div className="card w-[500px] bg-base-200 shadow-xl h-[400px]">
            <div className="card-body items-center text-center">
              <img src={`http://127.0.0.1:8000/${profile.image}`} alt="Profile" className="rounded-full w-20 h-20 mx-auto mt-4" />
              <h2 className="card-title">Nama : {profile.name}</h2>
              <h3 className="text-[18px] font-semibold">Email : {profile.email}</h3>
              {editing ? (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="image">Update Image:</label>
                  <input type="file" id="image" name="image" onChange={handleImageChange} />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <button onClick={() => setEditing(true)}>Edit</button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
