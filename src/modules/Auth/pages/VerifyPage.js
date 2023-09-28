import React from "react";
import logo from "../../../assets/svgs/logosmall.svg";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect } from "react";

const VerifyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            width: "100%",
          }}
        >
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
            Sign in to <span style={{ color: "#87B7C7" }}> FemmeTech</span>
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              marginBottom: "12px",
              fontWeight: 500,
              // marginTop: "10vh",
              fontSize: "18px !important",
            }}
          >
            A verification email has been sent to you.
            <br /> Follow the link to complete registration.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyPage;
