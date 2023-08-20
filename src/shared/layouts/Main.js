import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import UserSidebar from "./Sidebars/UserSidebar";
import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import Navbar from "./Sidebars/Navbar";

export default function MainLayout({ children }) {
  const [drawerWidth, setDrawerWidth] = useState(320);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isOpen} setOpen={setOpen} />
      <Box
        sx={{ display: "flex", marginTop: "55px", backgroundColor: "#F8F8F8" }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <UserSidebar width={drawerWidth} />
        </Box>

        <Box
          sx={{
            width: "100%",
            marginLeft: { xs: 0, md: "370px" },
            marginTop: "20px",
          }}
        >
          <Outlet />
        </Box>
        {isOpen && (
          <UserSidebar width={drawerWidth} open={isOpen} setOpen={setOpen} />
        )}
      </Box>
    </>
  );
}
