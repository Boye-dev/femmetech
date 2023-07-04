import React from "react";
import { CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import { forgotPasswordDoctor } from "../services/authServices";
// import logo from "../../../assets/svgs/logosmall.svg";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../../../assets/images/login.png";
import { useAlert } from "../../../context/NotificationProvider";
import { LoadingButton } from "@mui/lab";
import { useSignupContext } from "../../../context/SignupContext";
import ForgotPasswordDoctorStep1 from "../components.js/ForgotPasswordDoctorStep1";
import ForgotPasswordDoctorStep2 from "../components.js/ForgotPasswordDoctorStep2";

const ForgotPasswordDoctor = () => {
  const { showNotification } = useAlert();

  const { forgotPasswordHandleSubmitDoctor } = useSignupContext();

  const [activeStep, setActiveStep] = useState(0);

  const { mutate, isLoading } = useMutation(forgotPasswordDoctor, {
    onError: (error) => {
      showNotification?.(error.response.data.errors[0] || error.message, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      setActiveStep(1);
      // navigate("/verify", { replace: true });
    },
  });
  const onSubmitEmail = (payload) => {
    mutate(payload);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {false ? (
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
      ) : (
        <Box
          sx={{
            height: "100vh",
          }}
        >
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
                background: { xs: `none`, md: "none" },
                backgroundRepeat: { xs: "no-repeat", md: "none" },
                backgroundSize: { xs: "cover", md: "none" },
                display: "flex",
                alignItems: "center",
                height: { xs: "100vh", md: "100vh" },
                // paddingBottom: {xs: "100px", md: "0"},
              }}
            >
              <Box
                sx={{
                  margin: "auto",
                  width: { xs: "80%", md: "80%" },
                }}
              >
                {activeStep === 0 ? <ForgotPasswordDoctorStep1 /> : ""}
                {activeStep === 1 ? <ForgotPasswordDoctorStep2 /> : ""}
                <LoadingButton
                  fullWidth
                  size="small"
                  loading={isLoading}
                  onClick={forgotPasswordHandleSubmitDoctor(onSubmitEmail)}
                  variant="contained"
                  // endIcon={<EastOutlined sx={{ marginLeft: "12px" }} />}
                  sx={{
                    margin: "30px 0",
                    fontSize: "18px !important",
                    background: "#252B33",
                    padding: "6px",
                    marginBottom: "6px",
                    display: activeStep === 0 ? "block" : "none",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#252B33",
                    },
                  }}
                >
                  Continue
                </LoadingButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: activeStep === 0 ? "start" : "center",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "left",
                      marginTop: "10px",
                      color: "black",
                    }}
                  >
                    Return to{" "}
                    <Link
                      style={{ decoration: "none", color: "#CE1E23" }}
                      to={"/signin-doctor"}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ForgotPasswordDoctor;
