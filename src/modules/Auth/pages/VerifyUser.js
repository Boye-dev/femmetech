import React from "react";
import { CircularProgress } from "@mui/material";
import { verifyPatient } from "../services/authServices";

import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

import { useAlert } from "../../../context/NotificationProvider";
import { LoadingButton } from "@mui/lab";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

const VerifyUser = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const { showNotification } = useAlert();

  const { token } = useParams();
  const { isLoading, data } = useQuery(
    [
      "verifyPatient",
      {
        token,
      },
    ],
    verifyPatient,
    {
      enabled: true,

      onError: (error) => {
        if (
          error.response &&
          (error.response.status === 500 || error.response.status === 400)
        ) {
          // Handle the 500 error here
          showNotification?.(
            error.response.data.message || "Internal Server Error",
            {
              type: "error",
            }
          );
        } else {
          // Handle other errors
          console.log(error);
          showNotification?.(
            error.response.data.errors[0] ||
              error.response.data.message ||
              error.message ||
              error.error ||
              "An error occurred",
            {
              type: "error",
            }
          );
        }
        setMessage(error.response?.data?.message);
      },
      onSuccess: (data) => {
        setMessage(data.message);
      },
    }
  );
  const onSubmit = () => {
    navigate("/signin");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

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
        <Box
          sx={{
            height: "100vh",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
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
                marginBottom: "12px",
                fontWeight: 700,
                fontSize: "28px !important",
              }}
            >
              Sign in to <span style={{ color: "#87B7C7" }}> FemmeTech</span>
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{
                marginBottom: "12px",
                fontWeight: 500,
                fontSize: "18px !important",
              }}
            >
              {message || data?.message}
            </Typography>

            <LoadingButton
              fullWidth
              size="small"
              loading={isLoading}
              onClick={onSubmit}
              loadingPosition="end"
              variant="contained"
              sx={{
                fontSize: "18px !important",
                background: "#87B7C7",
                padding: "6px",
                marginBottom: "6px",
                color: "#fff",
                "&:hover": {},
              }}
            >
              Proceed To Login
            </LoadingButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerifyUser;
