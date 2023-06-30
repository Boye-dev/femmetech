import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useSignupContext } from "../../../context/SignupContext";
import logo from "../../../assets/svgs/logosmall.svg";
import mail from "../../../assets/images/Dove.png";
import { Link } from "react-router-dom";
import { forgotPasswordDoctor, forgotPasswordPatient } from "../services/authServices";
import { useMutation } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";

const formStyles = {
  marginBottom: "20px",
  color: "black !important",
  background: "#F5F5F6",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    outline: "none",
    borderRadius: "3px",
    color: "#000",
  },
  "& .MuiInputBase-input:hover": {
    border: "0",
    outline: "none",
    borderRadius: "5px",
    color: "#000",
  },
  "& .MuiFormHelperText-root": {
    color: "red !important",
    background: "#fff",
    width: "100%",
    margin: 0,
  },
  "& .Mui-active": {
    outline: "none",
    borderRadius: "5px",
  },
  "& .Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
};

const ForgotPasswordDoctorStep2 = () => {
  
  const { showNotification } = useAlert();

  const { forgotPasswordWatchDoctor } = useSignupContext();

  const { email } = forgotPasswordWatchDoctor()

  const { mutate, isLoading } = useMutation(forgotPasswordDoctor, {
    onError: (error) => {
      showNotification?.(error.response.data.errors[0], { type: "error" });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const onSubmitEmail = (payload) => {
    mutate(payload);
  };

  return (
    <>
      {
        isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "auto", md: "100vh" },
            }}
          >
            <CircularProgress />
          </Box>
        ) :
        (<Box>
      <img src={logo} alt="" />
      <Typography
        variant="h6"
        color="inherit"
        component="div"
        sx={{
          fontWeight: 700,
          fontSize: "28px !important",
          color: "#252B33"
        }}
      >
        Password Reset
      </Typography>
      <img src={mail} alt="" />
      <Typography
        variant="h5"
            sx={{
              marginTop: "10px",
              color: "black",
              width: "100%",
            }}
        >
          We've sent a pasword reset link to <span style={{ color: "#252B33" }}> {email}!</span>
      </Typography>
      <Typography
        variant="h5"
            sx={{
              // textAlign: "left",
              marginTop: "10px",
              color: "black",
              width: "100%",
            }}
        >
          Didn't receive the email? <span onClick={() => onSubmitEmail(email)} style={{ color: "#CE1E23", cursor: "pointer" }}>click here</span>
      </Typography>
      
       
    </Box>)}
    </>
  );
};

export default ForgotPasswordDoctorStep2;
