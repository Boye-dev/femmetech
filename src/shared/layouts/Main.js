import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import PatientSidebar from "./Sidebars/PatientSidebar";
import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  const [collapse, setCollapse] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(220);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!mobile) {
      setDrawerWidth(220);
      setCollapse(false);
    }
  }, [mobile]);
  useEffect(() => {
    if (collapse) {
      setDrawerWidth(80);
    } else {
      setDrawerWidth(220);
    }
  }, [collapse]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            height: "100px",
            backgroundColor: "white",
            position: "fixed",
            zIndex: "1200",
            top: 0,
          }}
          onClick={() => setOpen(!open)}
        >
          hel
        </Box>

        <PatientSidebar
          width={drawerWidth}
          open={open}
          isMobile={!mobile}
          setOpen={setOpen}
          collapse={collapse}
        />
        {!mobile || (
          <Box
            onClick={() => setCollapse(!collapse)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "1200",
              position: "fixed",
              top: 20,
              left: drawerWidth - 10,
              backgroundColor: "white",
              width: "25px",
              height: "25px",
              border: "0.5px solid #ED2228D6",
              borderRadius: "100%",
              boxShadow:
                "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer",
            }}
          >
            {collapse ? (
              <ArrowForward color="primary" fontSize="5px" />
            ) : (
              <ArrowBack color="primary" fontSize="5px" />
            )}
          </Box>
        )}
        <Box sx={{ mt: !mobile && "100px", width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
