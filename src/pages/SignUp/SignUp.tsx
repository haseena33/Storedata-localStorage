import { useState, useEffect } from "react";
import "./SignUp.css";
import { useNavigate,useLocation} from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFormState = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    dob: false,
    email: false,
    password: false,
    confirmPassword: false,
    gender: false,
    phoneNumber: false,
    address: false,
    city: false,
    state: false,
    country: false,
  });

  useEffect(() => {
    if (location.state && location.state.editMode) {
      const storedFormData = JSON.parse(
        localStorage.getItem("formData") || "{}"
      );
      setFormData(storedFormData);
    }
  }, [location]);

  const isNonEmptyString = (value: any): boolean =>
    typeof value === "string" && value.trim() !== "";

  const handleFieldValidation = (name: string, value: any) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "city":
      case "state":
      case "country":
        return isNonEmptyString(value) && /^[A-Za-z]+$/.test(value.trim());

      case "dob":
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        return /^\d{4}-\d{2}-\d{2}$/.test(value) && age >= 18;

      case "email":
        return /^\S+@\S+\.\S+$/.test(value);

      // case "password" || "text":
      //   return/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?!.* ).{8,16}$/
      //   .test(value);

      case "confirmPassword":
        return value === formData.password.trim();

      case "phoneNumber":
        return isNonEmptyString(value);

      case "gender":
        return !!value;

      case "address":
      return isNonEmptyString(value)

      default:
        return true;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value); 
    const isValid = handleFieldValidation(name, value);

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  const handleValidation = () => {
    const today = new Date();
    const birthDate = new Date(formData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const newErrors = {
      firstName: !/^[A-Za-z]+$/.test(formData.firstName.trim()),
      lastName: !/^[A-Za-z]+$/.test(formData.lastName.trim()),
      dob: !/^\d{4}-\d{2}-\d{2}$/.test(formData.dob) || age < 18,
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      password:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?!.* ).{8,16}$/.test(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword.trim(),
      phoneNumber: !formData.phoneNumber,
      gender: !formData.gender,
      address: !formData.address.trim(),
      city: !formData.city.trim(),
      state: !formData.state.trim(),
      country: !formData.country.trim(),
    };
    setFormErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      // Retrieve existing user data from local storage
      const storedUsersString = localStorage.getItem("users");
      const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];

      // Check if the email already exists
      const isEmailAlreadyExists = storedUsers.some(
        (user: any) => user.email === formData.email
      );

      if (isEmailAlreadyExists) {
        alert("Email address is already in use. Please use a different email.");
        return;
      }
      // if (password) {
      //   alert("Email address is already in use. Please use a different email.");
      //   return;
      // }
      // Create a new user object with a unique ID
      const newUser = { ...formData, id: Date.now() };

      // Update the array of users with the new user
      const updatedUsers = [...storedUsers, newUser];

      // Save the updated array of users to local storage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Save the new user data to local storage (optional, you can remove this if not needed)
      localStorage.setItem("formData", JSON.stringify(newUser));

      // Set the new user as the logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      toast.success("Form submitted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    } else {
      console.log("Form is invalid. Errors:", formErrors);
      alert("Invalid form submission.");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="h1">Registration</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={formErrors.firstName}
              helperText={
                formErrors.firstName && "This field is required only characters"
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={formErrors.lastName}
              helperText={
                formErrors.lastName && "This field is required only characters"
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              error={formErrors.dob}
              helperText={
                formErrors.dob &&
                "Invalid date of birth, user must be above 18 years old"
              }
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              helperText={formErrors.email && "Invalid email address"}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text":"password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              helperText={formErrors.password &&"invalid Password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text":"password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
              helperText={
                formErrors.confirmPassword && "Confirm Password do not matching"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPassword} edge="end">
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            {/* <TextField fullWidth label="Gender"> */}
            <p style={{ textAlign: "left", fontSize: "20px" }}>Gender</p>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {/* </TextField> */}
          </Grid>
          <Grid item xs={12}>
  <p className="phone">Phone Number</p>
  <PhoneInput
    value={formData.phoneNumber}
    onChange={(phone) => handleChange({ target: { name: "phoneNumber", value: phone } })}
  />
</Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={formErrors.city}
              helperText={
                formErrors.city && "This field is required only characters"
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={formErrors.state}
              helperText={
                formErrors.state && "This field is required only characters"
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={formErrors.country}
              helperText={
                formErrors.country && "This field is required only characters"
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Signup;
