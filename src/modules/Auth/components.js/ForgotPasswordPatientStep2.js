import { Box, CircularProgress, Typography } from "@mui/material";
import { useSignupContext } from "../../../context/SignupContext";
import logo from "../../../assets/svgs/logosmall.svg";
import mail from "../../../assets/images/Dove.png";
import { forgotPasswordPatient } from "../services/authServices";
import { useMutation } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";

const ForgotPasswordPatientStep2 = () => {
  const { showNotification } = useAlert();

  const { forgotPasswordWatch } = useSignupContext();

  const { email } = forgotPasswordWatch();

  const { mutate, isLoading } = useMutation(forgotPasswordPatient, {
    onError: (error) => {
      showNotification?.(error.response.data.errors[0] || error.messsage, {
        type: "error",
      });
    },
  });
  const onSubmitEmail = (payload) => {
    mutate(payload);
  };

  return (
    <>
      {isLoading ? (
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
        <Box>
          <img src={logo} alt="" />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: "28px !important",
              color: "#252B33",
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
            We've sent a pasword reset link to{" "}
            <span style={{ color: "#252B33" }}> {email}!</span>
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
            Didn't receive the email?{" "}
            <span
              onClick={() => onSubmitEmail(email)}
              style={{ color: "#CE1E23", cursor: "pointer" }}
            >
              click here
            </span>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ForgotPasswordPatientStep2;
