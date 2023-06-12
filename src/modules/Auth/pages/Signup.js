import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { AdminPaths, BasePaths } from "../../../routes/paths";
import { Roles } from "../../../constants/roles";
import { Button, CircularProgress, Step, StepContent, StepLabel, Stepper, TextField } from "@mui/material";
import { useAlert } from "../../../context/NotificationProvider";
import { getDecodedJwt, setToken } from "../../../utils/auth";
import handleApiError from "../../../utils/handleApiError";
import { useMutation } from "react-query";
import { login } from "../services/authServices";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box"
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import loginImg from "../../../assets/images/login.png";
// import GoogleIcon from '@mui/icons-material/Google';
import { yupResolver } from "@hookform/resolvers/yup";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const setNavigationPath = (user) => {
    if (user?.role?.includes(Roles.ADMIN)) {
      return `${AdminPaths.MDA_DETAILS}/${user.mda}`;
    } else if (user?.role?.includes(Roles.ADMIN)) {
      return AdminPaths.MDAS;
    } else {
      return BasePaths.USER;
    }
  };
  const { mutate, isLoading } = useMutation(login, {
    onError: (error) => {
      showNotification?.(handleApiError(error), { type: "error" });
    },
    onSuccess: (data) => {
      setToken(data?.token);

      const decodedUser = getDecodedJwt();

      if (
        decodedUser?.role?.length &&
        decodedUser?.role?.includes(Roles.ADMIN)
      ) {
        navigate(BasePaths.ADMIN, { replace: true });
      } else {
        const path =
          from?.split("/")[0] === "super" && decodedUser?.role === Roles.ADMIN
            ? from
            : setNavigationPath(decodedUser);

        navigate(path, { replace: true });
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const { showNotification } = useAlert();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = yup.object().shape({
    
    firstName: yup.string().required("Firstname Is Required"),
    lastName: yup.string().required("Lastname Is Required"),
    country: yup.string().required("Country is Required"),
    state: yup.string().required("State is Required"),
    username: yup.string().required("Email Is Required"),
    phoneNumber: yup.string().required("Phone Number Is Required"),
    password: yup
    .string()
    .required("Password Is Required")
    .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
        "Password Must Contain An Uppercase, A Digit, and A Special Character"
    )
    .min(8, "Password Should Have At Least 8 Characters")
    .max(32, "Password Should Have At Most 32 Characters"),
    confirmPassword: yup
    .string()
    .required("Password Must Match")
    .oneOf(
        [yup.ref("password"), null],
    ),
            
  });

  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");

  const handleSnackBar = () => {
    setOpenSnackBar(true);
  };



  localStorage.setItem('loggedIn', false);

  const [loading, setLoading] = useState(false);

  const handleLoadClick = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = ""
      if (response.data?.success === false) {
        setMessageSnackBar("Error occured. Check internet and try again.")
        handleSnackBar()
        setLoading(false)
      } else {
        localStorage.setItem('loggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/home/dashboard")

      }
    } catch(err) {
      if(err.response) {
        setLoading(false)
        if(err.response.status === 401) {
          setMessageSnackBar("Username or password incorrect!")       
          handleSnackBar()
        } else {
          setMessageSnackBar("Error occured. Check internet and try again.")
          handleSnackBar()
        }
      }
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSlide = (index) => {
    setActiveIndex(index);
  };

  const step1 = <Box>

  </Box>

  return (
    <Box
      sx={{
          height: "100vh",
      }}
    >
      <Snackbar color="primary" open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
        <Alert onClose={() => setOpenSnackBar(false)} severity="warning" sx={{ width: '100%', background: "gray" }}>
          {messageSnackBar}
        </Alert>
      </Snackbar>
      <Grid container >
        <Box md={5} xs={12}
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
            display: {xs: "none", md: "block"}
          }}
        />
        <Box md={7} xs={12}
          sx={{
            width: {xs: "100%", md: "60%"},
            marginLeft: {xs: "0", md: "40%"},
            textAlign: "center",
            background: {xs: `url(${loginImg})`, md: "none"},
            backgroundRepeat: {xs: "no-repeat", md: "none"},
            backgroundSize: {xs: "cover", md: "none"},
            display: "flex",
            alignItems: "center",
            height: {xs: "100vh", md: "100vh"},
            paddingBottom: {xs: "20px", md: "0"},
          }}
        >
          <Box
            sx={{
              margin: "auto",
              width: {xs: "80%", md: "70%"},
            }}
          >
            
              {/* <SignupStep1 />  */}
              {/* <SignupStep2 />  */}
              <SignupStep3 /> 
              
              <Box 
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px"
                }}
              >
                {[1,2,3].map((testimonial, index) => (
                    <Box
                        key={testimonial}
                        sx={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          backgroundColor: "gray",
                          margin: "12px 4px",
                          cursor: "pointer",
                          ...(index === activeIndex && {
                            backgroundColor: '#252B33',
                          }),
                        }}
                        onClick={() => handleSlide(index)}
                    />
                ))}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Signup;
