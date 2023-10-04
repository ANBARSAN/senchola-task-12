import {
  Avatar,
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
//import { makeRequest } from "../http/makeRequest";
import {useDispatch} from 'react-redux';
import { createUserStart } from "../store/reducers/userSlice";
//import { Restaurant } from "@mui/icons-material";
//import { Navigate } from "react-router-dom";

//7.useDispatc

const Signup = () => {
  const [userType, setUserType] = useState("");
  const [deliveryAgentLangs, setDeliveryAgentLangs] = useState([]);
  const defaultTheme = createTheme({});

  //7.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleDeliveryAgentLangsChange = (event) => {
    setDeliveryAgentLangs((pre) => [...pre, ...event.target.value]);
  };
// 23.remove call back
  // const userCreateCallback = (response) => {
  //   const {data , statusText}= response;
  //   //7.2 set payload
  //   if(statusText === "Created"){
  //   const payload ={
  //      isUserAuthenticated: true,
  //     //10.userInfo
  //     userInfo:{
  //     userName: data.userName,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     address: data.address,
  //     mobileNo: data.moNo,
  //     userType: data.userType,
  //     restaruntName: data.restaruntName,
  //     restaruntAddress: data.restaruntAddress,
  //     deliveryAgentKnownLanguages: data.deliveryAgentKnownLanguages
  //   },
  // };
  //   dispatch(saveUserInfo(payload));
  //      navigate("/");
  // }else{
  //   console.log("user failed");
  // }
  // };

  const handleSignUp = (event) => {
    event.preventDefault();
    const userData = {
      firstName: event.target.fname.value,
      lastName: event.target.lname.value,
      userName: event.target.email.value,
      password: event.target.password.value,
      mobNo: event.target.mobileno.value,
      userType: userType,
      ...(userType === "seller" && {restaurantName: event.target.restaurantName.value}),
      ...(userType === "deliveryAgent" && {deliveryAgentKnownLanguages: event.target.deliveryAgentKnownLanguages.value}),
    };
//23 remove makerequest add dispatch 
    //dispatchEvent(userOperationsLoading("post", "users",  userCreateCallback,userData);
    const userCreatePayload ={
      method: "post",
      endpoint: "users",
      data: userData,
      navigate: navigate,
    }
    dispatch(createUserStart(userCreatePayload)); 
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        maxWidth="xs"
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSignUp}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First name"
                required
                id="fname"
                name="fname"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last name"
                required
                id="lname"
                name="lname"
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
          <TextField
            required
            fullWidth
            autoFocus
            id="email"
            label="Email Address"
            autoComplete="email"
            sx={{
              mb: 1,
              mt: 1,
            }}
          />
          <TextField
            required
            fullWidth
            autoFocus
            id="password"
            type="password"
            label="Password"
            name="password"
          />
          <TextField
            required
            fullWidth
            autoFocus
            id="mobileno"
            label="Mobile No"
            name="mobileno"
            sx={{
              mb: 1,
              mt: 1,
            }}
          />
          <TextField
            fullWidth
            autoFocus
            type="textarea"
            id="address"
            label="Address"
            name="address"
            sx={{
              mb: 1,
              mt: 1,
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="user-type-label">User type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type"
              value={userType}
              label="User type"
              onChange={handleUserTypeChange}
            >
              <MenuItem value={"consumer"}>Consumer</MenuItem>
              <MenuItem value={"seller"}>Seller</MenuItem>
              <MenuItem value={"deliveryAgent"}>Delivery Agent</MenuItem>
            </Select>
          </FormControl>
          {userType && userType === "seller" && (
            <>
              <TextField
                required={userType === "seller"}
                fullWidth
                autoFocus
                id="restaurantName"
                label="Restaurant name"
                name="restaurantName"
                sx={{
                  mb: 1,
                  mt: 1,
                }}
              />
              {/* <TextField
                required={userType === "seller"}
                fullWidth
                autoFocus
                type="textarea"
                id="restaurantAddress"
                label="Restaurant Address"
                name="restaurantAddress"
                sx={{
                  mb: 1,
                  mt: 1,
                }}
              /> */}
            </>
          )}
          {userType && userType === "deliveryAgent" && (
            <>
              {/* <TextField
                required={userType === "deliveryAgent"}
                fullWidth
                autoFocus
                id="deliveryAgentName"
                label="Delivery agent name"
                name="deliveryAgentName"
                sx={{
                  mb: 1,
                  mt: 1,
                }}
              />
              <TextField
                required={userType === "deliveryAgent"}
                fullWidth
                autoFocus
                id="deliveryAgentMNo"
                label="Delivery agent mobile no"
                name="deliveryAgentMNo"
                sx={{
                  mb: 1,
                  mt: 1,
                }}
              /> */}
              <FormControl fullWidth>
                <InputLabel id="user-type-label">
                  Delivery agent known languages
                </InputLabel>
                <Select
                  labelId="delivery-agent-known-lang-label"
                  id="delivery-agent-known-lang"
                  value={deliveryAgentLangs}
                  label="Delivery agent known languages"
                  onChange={handleDeliveryAgentLangsChange}
                  name="deliveryAgentKnownLanguages"
                  multiple
                >
                  <MenuItem value={"ta"}>Tamil</MenuItem>
                  <MenuItem value={"ka"}>Kannada</MenuItem>
                  <MenuItem value={"hin"}>Hindi</MenuItem>
                  <MenuItem value={"en"}>English</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          <FormControlLabel required
            control={<Checkbox value="remember" color="primary" />}
            label="I agree to the terms and conditions"
          />
          <Button type="submit" fullWidth variant="contained">
            Register
          </Button>
          <Grid
            container
            sx={{
              justifyContent: "end",
              mt: 1,
            }}
          >
            <Grid item>
              <Link to="/login">Already have an account login</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;