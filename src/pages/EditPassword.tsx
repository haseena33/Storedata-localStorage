// EditPasswordPage.tsx
import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { UserProfile } from "./ViewProfile" 
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../Theme/Theme';

interface EditPasswordProps {
    user: UserProfile;
    onSave: (updatedUser: UserProfile) => void;
    onCancel: () => void;
  
  }

const EditPassword :React.FC<EditPasswordProps>= ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState(user);
  const navigate = useNavigate();
  const { themeColor } = useThemeContext();

  const handleSave = () => {
    // Update the edited values in local storage with the corresponding id
    const storedUsersString = localStorage.getItem("users");
    const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];

    const updatedUsers = storedUsers.map((storedUser: UserProfile) => {
      if (storedUser.id === editedUser.id) {
        // Update the user with the edited values
        return editedUser;
      } else {
        return storedUser;
      }
    });

    // Save the updated array of users back to local storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Save the edited user to the parent component (optional)
    onSave(editedUser);

    // Redirect back to the profile page after saving
    navigate("/edit-profile");
  };

  const handleCancel = () => {
    // Perform any additional cancel logic if needed
    onCancel();

    // Redirect back to the profile page after canceling
    navigate("/edit-profile");
  };

  return (
    <div className="edit-password-container">
      <h1>Edit Password</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={editedUser.password}
            onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            value={editedUser.phoneNumber}
            onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave }
          style={{backgroundColor:themeColor}}>
            Save Changes
          </Button>
          <Button variant="contained" color="primary" onClick={handleCancel} 
          style={{ marginLeft: '40px' ,backgroundColor:themeColor}}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditPassword;
