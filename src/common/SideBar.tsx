import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {Toolbar,List,ListItem,ListItemButton} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import Grid from "@mui/material/Grid";
import { CirclePicker } from "react-color";
import { useThemeContext } from "../Theme/Theme";
// import UserDetailsPopover from "../pages/Edit";
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from "react";
const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const { themeColor, setThemeColor } = useThemeContext();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [selectedUser, setSelectedUser] = React.useState<{ name: string; last: string; id: number } | null>(null);
  const theme = useTheme();
  // const navigate = useNavigate();
  // const [profile,setProfile]=React.useState(false);

  // useEffect(() => {
  //   if (profile) {
  //     const storedFormDataString = localStorage.getItem('formData');
  //     if (storedFormDataString) {
  //       const storedFormData = JSON.parse(storedFormDataString);

  //     setSelectedUser({
  //       name: `${storedFormData.firstName} ${storedFormData.lastName}`,
  //       last: storedFormData.email,
  //       id: storedFormData.phoneNumber,
  //     });
  //     setProfile(false);
  //   }
  // }
  // }, [profile]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleThemeButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorChange = (color: any) => {
    console.log("Selected color: ", color.hex);
    setThemeColor(color.hex);
    setAnchorEl(null);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    // setSelectedUser(null)
  };

  // const handleEditUser = (id: number) => {
  //   console.log(`Editing user with id: ${id}`);
  //     navigate ("/signup",{ state: { editMode: true } })
  // };
  // const handleProfile=(e:any)=>{
    // setAnchorEl(e.currentTarget);
    // setProfile(e.currentTarget);
  // }
  return (
    <Box sx={{ display: "flex", backgroundColor: themeColor }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: themeColor }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ textAlign: "center" }}></Typography>
          <Button variant="contained" color="primary" onClick={handleThemeButtonClick} style={{backgroundColor:themeColor}}>
            Theme
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Grid container justifyContent="center" alignItems="center" p={2}>
              <CirclePicker onChange={handleColorChange} />
            </Grid>
          </Popover>
          <Button variant="contained" color="primary" component={Link} to="/" style={{backgroundColor:themeColor}}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Dashboard", "Profile"].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: "flex", flex: 1 }}>
              {text === "Dashboard" ? (
                <ListItemButton
                  component={Link}
                  to="/dashboard"
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SpaceDashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              ) : (
                text === "Profile" && (
                  <ListItemButton
                    component={Link}
                    to="/viewProfile"
                    // onClick={handleProfile }
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <AccountCircleIcon />
                      </ListItemIcon>
                    <ListItemText primary="profile" sx={{ opacity: open ? 1 : 0 }} />
                    {/* {selectedUser && (
                      <UserDetailsPopover
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                        onEditUser={handleEditUser}
                        anchorEl={anchorEl}
                      />
                    )} */}
                  </ListItemButton>
                )
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <DrawerHeader />
    </Box>
  );
};

export default SideBar;
