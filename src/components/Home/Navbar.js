import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Person,
} from "@mui/icons-material";

const Navbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F8F9FA",
        height: "96px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: "5000",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%", padding: { xs: "0", md: "0 8%" } }}
      >
        <Box>
          <Logo />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-around", width: "50%" }}
        >
          {["Home", "Dashboard", "Patients", "About Us", "Contact"].map(
            (item) => {
              return (
                <Typography
                  color="text.primary"
                  variant="caption"
                  sx={{ fontWeight: 500, cursor: "pointer" }}
                >
                  {item}
                </Typography>
              );
            }
          )}
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "space-around", width: "30%" }}
        >
          <Button startIcon={<Person />}>Login</Button>
          <Box
            sx={{
              borderRadius: "50px",
              padding: "5px 10px",
              backgroundColor: (theme) => theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Typography sx={{ color: "white" }} variant="caption">
              Book Appointment
            </Typography>
            <KeyboardArrowRight sx={{ color: "white" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
