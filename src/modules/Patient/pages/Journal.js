import { AccessTime, CalendarMonth } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Journal = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          p: 5,
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            mb: 5,
          }}
        >
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => navigate("/patient/my-journal/new")}
          >
            New Journal
          </Button>
        </Box>

        {[1, 2, 4, 5].map((item) => {
          return (
            <Box
              sx={{
                width: { md: "70%" },
                height: "auto",
                backgroundColor: "white",
                boxShadow: "1px 1px 5px 0.5px #C0C0C0",
                borderRadius: "8px",
                p: 8,
                mb: 5,
              }}
            >
              <Typography variant="h5">Pregnancy is not easy mehn</Typography>
              <Box sx={{ display: "flex", mt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonth sx={{ color: "#87B7C7" }} />
                  <Typography variant="caption" ml={2}>
                    Last Edited - 27/07/2002 12:20
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Button variant="contained" sx={{ mt: 5, mr: 6 }}>
                  Edit
                </Button>

                <Button sx={{ mt: 5 }} color="error">
                  Delete
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Journal;
