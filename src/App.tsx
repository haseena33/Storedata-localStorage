import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/SignUp/SignUp';
import Login from './pages/login/Login';
import Dashboard from './pages/Dashboard';
import SideBar from './common/SideBar';
import ProfilePage from "./pages/ViewProfile";
import { ThemeProvider } from './Theme/Theme';
import EditProfilePage from "./pages/Edit"; 
import EditPassword from "./pages/EditPassword";
import { UserProfile } from "./pages/ViewProfile" 
// interface EditProfileProps {
//   user: UserProfile;
//   onSave: (updatedUser: UserProfile) => void;
// }
const App = () => {
  const isAuthenticationRequired = true;
  const [themeColor, setThemeColor] = useState<string>("");

  return (
    <ThemeProvider themeColor={themeColor} setThemeColor={setThemeColor}>
      <Router>
        <Routes>
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
          </>

          {isAuthenticationRequired && (
            <>
              <Route
                path="/sidebar"  // Correct the route path to use a lowercase "s"
                element={
                  <>
                    <SideBar />
                  </>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <>
                    <SideBar />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/viewProfile"
                element={
                  <>
                    <SideBar />
                    <ProfilePage />
                  </>
                }
              />
              <Route
  path="/edit-profile"
  element={
    <>
      <SideBar />
      {/* Replace UserProfile with the actual user data */}
      <EditProfilePage
        user={{ /* Provide the actual user data */ }}
        onSave={(updatedUser: UserProfile) => {
          // Handle the logic for saving the updated user data
          console.log("Updated user:", updatedUser);
        }}
      />
    </>
  }
/>
  
<Route
  path="/edit-password"
  element={
    <>
      <SideBar />
      {/* Replace UserProfile with the actual user data */}
      <EditPassword
        user={{ /* Provide the actual user data */ }}
        onSave={(updatedUser: UserProfile) => {
          // Handle the logic for saving the updated user data
          console.log("Updated user:", updatedUser);
        }}
        onCancel={() => {
          console.log("Cancel");
        }}
      />
    </>
  }
/>

            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
