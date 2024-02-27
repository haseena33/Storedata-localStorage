import React, { useEffect, useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,TextField,Box,Dialog,DialogTitle,DialogContent,DialogActions,} from '@mui/material';
// import { useThemeContext } from "../Theme/Theme";

interface User {
  id: number;
  first: string;
  last: string;
  Dob: number | string;
  email: string;
  gender: string;
  phone: number;
  address: number | string;
  city: string;
  state: string;
  country: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([
    { id: 1, first: 'John ', last: "basha", Dob: '22/4/1999', email: 'john@gmail.com', gender: "male", phone: 76576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country: "India"},
    { id: 2, first: 'Haseena ', last: "Shaik", Dob: '22/4/2002', email: 'Haseena7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 3, first: 'Sweety ', last: "Shaik", Dob: '22/4/2002', email: 'Sweety7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 4, first: 'Suma ',    last: "Bandi", Dob: '22/4/2002', email:'Suma7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 5, first: 'Jyothsna ', last: "Shaik", Dob: '22/4/2002', email: 'Jyothsna7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 6, first: 'Manasa ', last: "Gantha", Dob: '22/4/2002', email: 'Manasa7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 7, first: 'Shivani ', last: "Patil", Dob: '22/4/2002', email: 'Shivani7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 8, first: 'Jyothi ', last: "Bommali", Dob: '22/4/2002', email: 'Jyothi7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 9, first: 'Sushmitha ', last: "Nallani", Dob: '22/4/2002', email: 'sushmitha7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 10, first: 'Sai', last: "Ram", Dob: '22/4/2002', email: 'Sai7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},
    { id: 11, first: 'Chintu ', last: "Shaik", Dob: '22/4/2002', email: 'Haseena7676@gmail.com', gender: "female", phone: 654576586, address: "vaddeswaram", city: "vijayawada", state: "AndhraPradesh" ,country:"India"},

  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingFirst, setEditingFirst] = useState<string>('');
  const [editedLast, setEditedLast] = useState<string>('');
  const [editedDob, setEditedDob] = useState<string | number>('');
  const [editedEmail, setEditedEmail] = useState<string | number>('');
  const [editedGender, setEditedGender] = useState<string>('');
  const [editedPhone, setEditedPhone] = useState<number>();
  const [editedAddress, setEditedAddress] = useState<string | number>('');
  const [editedCity, setEditedCity] = useState<string>('');
  const [editedState, setEditedState] = useState<string>('');
  const [editedCountry, setEditedCountry] = useState<string>('');
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  // const { themeColor } = useThemeContext(); 

  const handleEdit = (id: number) => {
    const userToEdit = userData.find((user) => user.id === id);
    if (userToEdit) {
      setEditingId(id);
      setEditingFirst(userToEdit.first);
      setEditedLast(userToEdit.last);
      setEditedEmail(userToEdit.email);
      setEditedDob(userToEdit.Dob);
      setEditedGender(userToEdit.gender);
      setEditedPhone(userToEdit.phone);
      setEditedAddress(userToEdit.address);
      setEditedCity(userToEdit.city);
      setEditedState(userToEdit.state);
      setEditedCountry(userToEdit.country);
      setEditModalOpen(true);
    }
  };
  useEffect(()=>{

  // },[themeColor]);
  });
  const handleSave = () => {
    setUserData((prevUserData) =>
      prevUserData.map((user) => {
        if (user.id === (editingId as number)) {
          return {
            ...user,
            first: editingFirst,
            last: editedLast,
            Dob: typeof editedDob === 'number' ? editedDob : user.Dob,
            email: typeof editedEmail === 'string' ? editedEmail : user.email,
            gender: typeof editedGender === 'string' ? editedGender : user.gender,
            phone: typeof editedPhone === 'number' ? editedPhone : user.phone,
            address: typeof editedAddress === 'string' ? editedAddress : user.address,
            city: typeof editedCity === 'string' ? editedCity : user.city,
            state: typeof editedState === 'string' ? editedState : user.state,
            country: typeof editedCountry === 'string' ? editedCountry : user.country,
          };
        }
        return user;
      })
    );
    setEditingId(null);
    setEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditModalOpen(false);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 3, paddingLeft: "100px"}}  >
        <h2>User Profile</h2>
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>ID</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>First Name</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Last Name</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Date of Birth</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Email</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Gender</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Phone Number</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Address</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>City</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>State</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Country</TableCell>
                <TableCell style={{ fontFamily: 'Bold', fontWeight: 'bold',fontSize:"20px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.first}</TableCell>
                  <TableCell>{user.last}</TableCell>
                  <TableCell>{user.Dob}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                      </>
                    ) : (
                      <Button onClick={() => handleEdit(user.id)}>Edit</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={isEditModalOpen} onClose={handleCancelEdit}>
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogContent sx={{ display: 'grid', gap: 3, gridTemplateColumns: '1fr 1fr' }}>
            <TextField
              label="First Name"
              value={editingFirst}
              onChange={(e) => setEditingFirst(e.target.value)}
            />
            <TextField
              label="Last Name"
              value={editedLast}
              onChange={(e) => setEditedLast(e.target.value)}
            />
            <TextField
              label="Date of Birth"
              value={editedDob}
              onChange={(e) => setEditedDob(e.target.value)}
            />
            <TextField
              label="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <TextField
              label="Gender"
              value={editedGender}
              onChange={(e) => setEditedGender(e.target.value)}
            />
            <TextField
              label="Address"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
            <TextField label="City" value={editedCity} onChange={(e) => setEditedCity(e.target.value)} />
            <TextField
              label="State"
              value={editedState}
              onChange={(e) => setEditedState(e.target.value)}
            />
            <TextField
              label="Country"
              value={editedCountry}
              onChange={(e) => setEditedCountry(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Profile;