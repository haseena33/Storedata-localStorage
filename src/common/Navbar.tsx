
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar >
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 ,textAlign:"center"}}>
          Navbar
        </Typography>
        <Button color="inherit" component={Link} to="/signup">
          Sign Up
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
