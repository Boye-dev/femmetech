import { Box, Typography } from "@mui/material";
import React from "react";

const MainGroup = ({ message }) => {
  return (
    <>
      <Box
        sx={{
          p: 2,

          display: "flex",
          justifyContent: message ? "flex-end" : "flex-start",
        }}
      >
        {message && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                textAlign: "right",

                fontSize: "10px !important",
                color: "#555555",
              }}
            >
              22/22/3
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            maxWidth: "60%",
            height: "auto",
            backgroundColor: message ? "#87B7C7" : "#E6E6E6",
            borderRadius: "7px",
            p: 2,
            mr: message || 2,
            ml: message && 2,
          }}
        >
          <Typography
            sx={{
              color: message ? "white" : "black",
            }}
          >
            Testings
          </Typography>
        </Box>
        {message || (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                textAlign: "right",

                fontSize: "10px !important",
                color: "#555555",
              }}
            >
              22/22/3
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MainGroup;
