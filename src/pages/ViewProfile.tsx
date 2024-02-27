// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../Theme/Theme';
import EditProfilePage from './Edit';
import "./ViewProfile.css";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  dob: string | number;
  email: string;
  gender: string;
  phoneNumber: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { themeColor } = useThemeContext();

  useEffect(() => {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;

    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      console.log('No user logged in');
      // Optionally, you can redirect to the login page if no user is logged in
      navigate('/');
    }
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = (updatedUser: UserProfile) => {
    // Update the user in local storage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user?.firstName} {user?.lastName}</h1>
      </div>
      {user && !isEditing && (
        <div className="profile-content">
          <div className="profile-section">
            <p>First Name: {user.firstName}</p>
              <p>Last Name:{user.lastName}</p>
              <p>Date of Birth: {user.dob}</p>
              <p>Email:{user.email}</p>
              <p>Gender:{user.gender}</p>
            <p>Phone Number:{`+${user.phoneNumber}`}</p>
              <p>Address: {user.address}</p>
              <p>City: {user.city}</p>
              <p>State: {user.state}</p>
              <p>Country:{user.country}</p>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
            style={{ backgroundColor: themeColor }}
          >
            Edit Profile
          </Button>
        </div>
      )}
      {isEditing && user && <EditProfilePage user={user} onSave={handleUpdateProfile} />}
    </div>
  );
};

export default ProfilePage;
