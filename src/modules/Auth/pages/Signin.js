import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { PatientPaths, BasePaths } from "../../../routes/paths";
import { Roles } from "../../../constants/roles";
import { Button, TextField } from "@mui/material";
import { useAlert } from "../../../context/NotificationProvider";
// import { yupResolver } from "@hookform/resolvers/yup";
import { getDecodedJwt, setToken } from "../../../utils/auth";
import handleApiError from "../../../utils/handleApiError";
import { useMutation } from "react-query";
import { login } from "../services/authServices";
import { useLocation, useNavigate } from "react-router-dom";

import { Grid, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import loginImg from "../../../assets/images/login.png";

import { yupResolver } from "@hookform/resolvers/yup";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const setNavigationPath = (user) => {
    if (user?.role?.includes(Roles.PATIENT)) {
      return `${PatientPaths.MDA_DETAILS}/${user.mda}`;
    } else if (user?.role?.includes(Roles.PATIENT)) {
      return PatientPaths.MDAS;
    } else {
      return BasePaths.USER;
    }
  };
  const { mutate } = useMutation(login, {
    onError: (error) => {
      showNotification?.(handleApiError(error), { type: "error" });
    },
    onSuccess: (data) => {
      setToken(data?.token);

      const decodedUser = getDecodedJwt();

      if (
        decodedUser?.role?.length &&
        decodedUser?.role?.includes(Roles.PATIENT)
      ) {
        navigate(BasePaths.PATIENT, { replace: true });
      } else {
        const path =
          from?.split("/")[0] === "super" && decodedUser?.role === Roles.PATIENT
            ? from
            : setNavigationPath(decodedUser);

        navigate(path, { replace: true });
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  console.log(onSubmit);
  const { showNotification } = useAlert();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = yup.object().shape({
    username: yup.string().required("Email Is Required"),
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
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");

  const handleSnackBar = () => {
    setOpenSnackBar(true);
  };

  localStorage.setItem("loggedIn", false);

  const [loading, setLoading] = useState(false);

  const handleLoadClick = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = "";
      if (response.data?.success === false) {
        setMessageSnackBar("Error occured. Check internet and try again.");
        handleSnackBar();
        setLoading(false);
      } else {
        localStorage.setItem("loggedIn", JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home/dashboard");
      }
    } catch (err) {
      if (err.response) {
        setLoading(false);
        if (err.response.status === 401) {
          setMessageSnackBar("Username or password incorrect!");
          handleSnackBar();
        } else {
          setMessageSnackBar("Error occured. Check internet and try again.");
          handleSnackBar();
        }
      }
    }
  };

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
      <Snackbar
        color="primary"
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity="warning"
          sx={{ width: "100%", background: "gray" }}
        >
          {messageSnackBar}
        </Alert>
      </Snackbar>
      <Grid container>
        <Box
          item
          md={5}
          xs={12}
          sx={{
            position: "fixed",
            left: 0,
            width: "40vw",
            boxShadow: "0 0 5px 0 gray",
            textAlign: "center",
            height: "100vh",
            background: `url(${loginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          item
          md={7}
          xs={12}
          sx={{
            width: { xs: "100%", md: "60%" },
            marginLeft: { xs: "0", md: "40%" },
            textAlign: "center",
            background: { xs: `url(${loginImg})`, md: "none" },
            backgroundRepeat: { xs: "no-repeat", md: "none" },
            backgroundSize: { xs: "cover", md: "none" },
            display: "flex",
            alignItems: "center",
            height: { xs: "100vh", md: "100vh" },
            paddingBottom: { xs: "100px", md: "0" },
          }}
        >
          <Box
            sx={{
              margin: "auto",
              width: { xs: "80%", md: "60%" },
            }}
          >
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{
                textAlign: "left",
                marginBottom: "12px",
                fontWeight: 700,
                marginTop: "10vh",
                fontSize: "28px !important",
              }}
            >
              Sign in to <span style={{ color: "#CE1E23" }}> NEXUS</span>
            </Typography>
            {/* <Box width="100%" display="flex">
              <Button
                onClick={handleSubmit(handleLoadClick)}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{
                  fontSize: "16px !important",
                  fontWeight: 300,
                  background: "#CE1E23",
                  padding: "6px 24px",
                  width: "fit-content",
                  textAlign: "left",
                  marginBottom: "20px",
                  color: "#fff",
                  "&:hover": {
                      backgroundColor: '#CE1E23'
                  },
                }}
              >
                <GoogleIcon fontSize="small" sx={{marginRight: "6px"}} />  Sign in with Google
              </Button>
            </Box> */}

            {/* <Box
              sx={{
                display: "flex",
                marginBottom: "20px",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center"
                
              }}
            >
              <Box
                sx={{
                  height: "1px",
                  background: "#c5c5c5",
                  width: "40%"
                }}
              />
                <Typography
                  sx={{
                    textAlign: "left",
                    color: "#c5c5c5",
                    fontWeight: 300,
                    width: "fit-content",
                    fontSize: "14px !important",
                    height: "100%"
                  }}
                >
                  Or with Email
                </Typography>
                <Box
                  sx={{
                    height: "1px",
                    background: "#c5c5c5",
                    width: "40%"
                  }}
                />
              </Box> */}

            <form action="">
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    size="small"
                    InputProps={{
                      style: {
                        fontSize: "16px",
                        color: "#000 !important",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "black",
                      },
                    }}
                    sx={{
                      marginBottom: "30px",
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
                        // border: errors.email
                        //   ? "1px solid red"
                        //   : "1px solid white",
                        outline: "none",
                        borderRadius: "5px",
                      },
                      "& .Mui-focused": {
                        color: "#000",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#000", // Change the border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#000", // Change the border color when active/focused
                        },
                      },
                    }}
                    label="Email"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("username");
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
                    sx={{
                      marginBottom: "30px",
                      color: "black",
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
                        // border: errors.email
                        //   ? "1px solid red"
                        //   : "1px solid white",
                        outline: "none",
                        borderRadius: "5px",
                      },
                      "& .Mui-focused": {
                        color: "#000",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#000", // Change the border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#000", // Change the border color when active/focused
                        },
                      },
                    }}
                    label="Password"
                    fullWidth
                    size="small"
                    {...fields}
                    type={values.showPassword ? "text" : "password"}
                    InputLabelProps={{
                      style: {
                        color: "black",
                      },
                    }}
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
                        fontSize: "16px",
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

              <Button
                fullWidth
                size="small"
                onClick={handleSubmit(handleLoadClick)}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{
                  fontSize: "18px !important",
                  background: "#252B33",
                  padding: "6px",
                  marginBottom: "6px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#252B33",
                  },
                }}
              >
                Login
              </Button>

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
                    style={{ decoration: "none", color: "#CE1E23" }}
                    to={"/signup"}
                  >
                    Get Started
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Signin;
