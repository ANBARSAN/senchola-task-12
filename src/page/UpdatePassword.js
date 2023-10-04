import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Box,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { updatePasswordStart } from "../store/reducers/userSlice";

const UpdatePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

console.log(location);
  const defaultTheme = createTheme({});
  const handleUpdatePassword = (event) => {
    event.preventDefault();
    const userPayload = {
      userId: location.state.userId,
      userName: location.state.userName,
      password: event.target.confirmPassword.value,
      navigate: navigate
    };

    dispatch(updatePasswordStart(userPayload));
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
          Update Password
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleUpdatePassword}>
          <TextField
            required
            fullWidth
            autoFocus
            type="password"
            id="newPassword"
            label="New Password"
            name="newPassword"
            sx={{
              mb: 1,
            }}
          />
          <TextField
            required
            fullWidth
            autoFocus
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            sx={{
              mb: 1,
            }}
          />
          <Button type="submit" fullWidth variant="contained">
            Update password
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdatePassword; 