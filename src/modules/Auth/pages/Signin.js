import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { login } from "../services/authServices";
import loginImg from "../../../assets/images/femmetech-logo-removebg-preview.png";
import { Grid, Typography, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";

import { useAlert } from "../../../context/NotificationProvider";
import { setToken } from "../../../utils/auth";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Api from "../../../api/api";

const Signin = () => {
  const navigate = useNavigate();

  const { showNotification } = useAlert();

  const handleErrors = (error) => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 400)
    ) {
      // Handle the 500 error here
      showNotification?.(
        error?.response?.data?.message ||
          error?.response?.data?.errors[0] ||
          "Internal Server Error",
        {
          type: "error",
        }
      );
    } else {
      // Handle other errors
      console.log(error);
      showNotification?.(
        error?.response?.data?.errors[0] ||
          error?.response?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred",
        {
          type: "error",
        }
      );
    }
  };
  const { mutate, isLoading } = useMutation(login, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      setToken(data?.token);
      localStorage.setItem("scheduleSet", JSON.parse(data?.scheduleSet));
      if (data?.role === "PATIENT") {
        navigate("/patient");
      } else if (data?.role === "CONSULTANT") {
        navigate("/consultant");
      }
    },
  });
  const onSubmit = (payload) => {
    mutate(payload);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  });

  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });
  const [values, setValues] = useState({
    vertical: "bottom",
    horizontal: "center",
    open: false,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",

          textAlign: "center",

          display: "flex",
          alignItems: "center",
          height: { xs: "100vh", md: "100vh" },
        }}
      >
        <Box
          sx={{
            margin: "auto",
            width: { xs: "80%", md: "35%" },
            backgroundColor: "#F8F8F8",
            borderRadius: "10px",
            padding: "20px 30px",
          }}
        >
          <Box
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mb: 5,
            }}
          >
            <img
              src={loginImg}
              alt={"logo"}
              width="250px"
              height="250px"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              marginBottom: "12px",
              fontWeight: 700,
              // marginTop: "10vh",
              fontSize: "28px !important",
            }}
          >
            Log in to <span style={{ color: "#87B7C7" }}> FemmeTech</span>
          </Typography>

          <form action="">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  label="Email"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  label="Password"
                  fullWidth
                  sx={{ mt: 5 }}
                  size="small"
                  {...fields}
                  type={values.showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleClickShowPassword}>
                        {values.showPassword === true ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                    style: {
                      fontSize: "13px",
                    },
                  }}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 5,
                mb: 5,
              }}
            >
              <Typography variant="caption">
                <Link
                  style={{ textDecoration: "none", color: "#87B7C7" }}
                  to={"/forgot-password-patient"}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
            <LoadingButton
              fullWidth
              size="small"
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
              endIcon={<SendIcon />}
              loadingPosition="end"
              variant="contained"
              sx={{
                fontSize: "18px !important",
                background: "#87B7C7",
                padding: "6px",
                marginBottom: "6px",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#87B7C7",
                  opacity: "0.9",
                },
              }}
            >
              Login
            </LoadingButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  marginTop: "10px",
                  color: "black",
                }}
              >
                Don't have an account?{" "}
                <Link
                  style={{ decoration: "none", color: "#87B7C7" }}
                  to={"/signup"}
                >
                  Get Started
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;
