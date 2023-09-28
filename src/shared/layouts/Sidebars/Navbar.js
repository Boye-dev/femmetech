import { KeyboardArrowDown, NotificationsOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import Logo from "../../../assets/images/femmetech-logo-removebg-preview.png";
import { Squash as Hamburger } from "hamburger-react";
import { getDecodedJwt } from "../../../utils/auth";
const Navbar = (props) => {
  const decodedUser = getDecodedJwt();
  return (
    <Box
      sx={{
        display: "flex",

        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "55px",
        backgroundColor: "#F5F5F5",
        borderBottom: "1px solid lightgray",

        position: "fixed",
        zIndex: "1200",
        top: 0,
      }}
    >
      <Box pl={10} sx={{ width: "53px", height: "53px" }}>
        <img
          src={Logo}
          alt="Logo"
          width="100%"
          height="100%"
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }} pr={5}>
        <Box
          sx={{
            backgroundColor: "#87B7C7",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
            ml: 3,
            cursor: "pointer",
          }}
        >
          <NotificationsOutlined fontSize="50%" sx={{ color: "#F8F8F8" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <Box
            sx={{
              width: "30px",
              height: "30px",

              ml: 3,
              mr: 0.5,
            }}
          >
            <img
              src={decodedUser?.profilePicture}
              alt=""
              width="30px"
              height="30px"
              style={{
                borderRadius: "100%",
              }}
            />
          </Box>
          <KeyboardArrowDown fontSize="10px" />
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Hamburger toggle={props.setOpen} toggled={props.isOpen} size="25" />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
