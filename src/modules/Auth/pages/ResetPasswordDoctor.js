import React from "react";
import { CircularProgress,  } from "@mui/material";
import { useMutation } from "react-query";
import { resetPasswordDoctor,   } from "../services/authServices";
// import logo from "../../../assets/svgs/logosmall.svg";
import { Grid, Typography,  } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loginImg from "../../../assets/images/login.png";
import { useAlert } from "../../../context/NotificationProvider";
import { LoadingButton } from "@mui/lab";
import { useSignupContext } from "../../../context/SignupContext";
import ResetPasswordDoctorStep1 from "../components.js/ResetPasswordDoctorStep1";
import ResetPasswordDoctorStep2 from "../components.js/ResetPasswordDoctorStep2";

    
const ResetPasswordDoctor = () => {
    const { showNotification } = useAlert();
  
    const { resetPasswordHandleSubmitDoctor, resetPasswordWatchDoctor } = useSignupContext();
    const { newPassword, confirmPassword } = resetPasswordWatchDoctor();
  
    console.log(newPassword, confirmPassword);
    const [activeStep, setActiveStep] = useState(0);
    const [message, setmessage] = useState("");
    const { doctorId, resetString } = useParams();

    const { mutate, isLoading } = useMutation(resetPasswordDoctor, {
      onError: (error) => {
        showNotification?.(error.response.data.errors[0], { type: "error" });
        setmessage(error.message)
      },
      onSuccess: (data) => {
        console.log(data);
        setActiveStep(1)
        setmessage(data.message)
      },
    });
    const onSubmit = (data) => {
        const payload = {
            doctorId: doctorId,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            resetString: resetString
        }
        mutate(payload);
    };
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
        {
            false ? (
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
            (<Box
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
                
                {activeStep === 0 ? <ResetPasswordDoctorStep1 /> : ""}
                {activeStep === 1 ? <ResetPasswordDoctorStep2 message={message} /> : ""}
                <LoadingButton
                    fullWidth
                    size="small"
                    loading={isLoading}
                    onClick={resetPasswordHandleSubmitDoctor(onSubmit)}
                    variant="contained"
                    endIcon=""
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
                    Reset Password
                </LoadingButton>
                <Box
                sx={{
                    display: activeStep === 0 ? "flex" : "none",
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
            </Box>)
        }
    </>
  );
};

export default ResetPasswordDoctor;
