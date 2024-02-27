import { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); 
  const navigate = useNavigate();

  // const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // const isPasswordValid = (password: string) =>
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  // const handleChange = (e: any) => {
  //   if (e.target.name === 'email') {
  //     setEmail(e.target.value);
  //   } else if (e.target.name === 'password') {
  //     setPassword(e.target.value);
  //   }
  // };
//   const handleLogin = () => {
//     const storedUser = JSON.parse(localStorage.getItem('formData') || '{}');
//   console.log(storedUser,"storedUser")
//     if (storedUser && storedUser.email === email && storedUser.password === password) {
//       navigate('/dashboard');
//     } else {
//       alert('Invalid credentials. Please try again.');
//     }
//   };

const handleSubmit = (e: any) => {
  e.preventDefault();

  const storedUsersString = localStorage.getItem('users');
  const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];

  const user = storedUsers.find((u: any) => u.email === email && u.password === password);

  if (user) {
    setShowError(true);
    console.log('Login successful!');
    navigate('/dashboard');
    localStorage.setItem('loggedInUser', JSON.stringify(user));

  } else {
    setShowError(false);
    alert('Invalid credentials. Please try again.');
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className='h1'>Login</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </Grid>
          {showError && (
            <Grid item xs={12}>
              <Typography color="error">{showError}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
          {showError }
            <Button type="submit" variant="contained" color="primary" className='button'>
              Login
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                Sign up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
