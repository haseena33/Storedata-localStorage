// EditProfilePage.tsx
import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from "./ViewProfile" 
import { useThemeContext } from '../Theme/Theme';
interface EditProfileProps {
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
}

const EditProfilePage: React.FC<EditProfileProps> = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState<UserProfile>(user);
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
    navigate("/viewProfile");
  };

  const handleChange = () => {
    navigate("/edit-password");
  }
  
  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={editedUser.firstName}
            onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={editedUser.lastName}
            onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
            InputLabelProps={{shrink:true,}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            value={editedUser.dob as string}
            onChange={(e) => setEditedUser({ ...editedUser, dob: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={editedUser.email}
              onChange={(e)=>setEditedUser({...editedUser,email:e.target.value})}
              InputProps={{readOnly:true,}}
              sx={{
                '& .MuiInputBase-input[readonly]': {
                   backgroundColor: '#f4f4f4', 
                  color: '#929292', 
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type='password'
              value={editedUser.password}
              onChange={(e)=>setEditedUser({...editedUser,password:e.target.value})}
              InputProps={{readOnly:true,}}
              sx={{
                '& .MuiInputBase-input[readonly]': {
                   backgroundColor: '#f4f4f4', 
                  color: '#aaaaaa', 
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              value={editedUser.phoneNumber}
              onChange={(e)=>setEditedUser({...editedUser,phoneNumber:e.target.value})}
              InputProps={{readOnly:true,}}
              sx={{
                '& .MuiInputBase-input[readonly]': {
                   backgroundColor: '#f4f4f4', 
                  color: '#aaaaaa', 
                },
              }}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={editedUser.address}
              onChange={(e)=>setEditedUser({...editedUser, address:e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={editedUser.city}
              onChange={(e)=>setEditedUser({...editedUser,city:e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={editedUser.state}
              onChange={(e)=>setEditedUser({...editedUser,state:e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={editedUser.country}
              onChange={(e)=>setEditedUser({...editedUser,country:e.target.value})}
              required
            />
          </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave} style={{backgroundColor:themeColor}}>
            Save Changes
          </Button>
          <Button variant="contained" color="primary" onClick={handleChange} style={{backgroundColor:themeColor,marginLeft:"40px"}}>
            Change Password
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProfilePage;
