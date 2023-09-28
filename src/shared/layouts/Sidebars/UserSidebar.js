import {
  Box,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactComponent as Logo } from "../../../assets/svgs/logo.svg";
import { ReactComponent as LogoSmall } from "../../../assets/svgs/logosmall.svg";
import SidebarMenu from "../../components/SidebarMenu";
import {
  CONSULTANT_NAV_ITEMS,
  DOCTOR_NAV_ITEMS,
  PATIENT_NAV_ITEMS,
} from "../../../constants/sidebarItems";
import { useLocation } from "react-router-dom";
import { getDecodedJwt, isAuthenticated, logOut } from "../../../utils/auth";
import { fetchUser, fetchUserDoctor } from "../../../services/authService";
import { useQuery } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";
import { useNavigate } from "react-router-dom/dist";
import { Logout, SettingsOutlined } from "@mui/icons-material";

const UserSidebar = (props) => {
  const location = useLocation();
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();
  const navigate = useNavigate();
  const navItems =
    decodedUser?.role === "PATIENT" ? PATIENT_NAV_ITEMS : CONSULTANT_NAV_ITEMS;

  return (
    <>
      <Box>
        <Box
          sx={{
            width: { xs: "100%", md: props.width },
            backgroundColor: "#F5F5F5",
            zIndex: "500",
            position: "fixed",
            left: 0,
            height: "calc(100vh - 60px)",
            display: "flex",
            borderRight: "1px solid lightgray",
            justifyContent: "flex-end",
            pt: 10,
          }}
          onClose={() => props.setOpen(false)}
        >
          <Box sx={{ width: "70%" }}>
            <Box sx={{ display: "flex", mb: 5 }}>
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                }}
              >
                {" "}
                <img
                  src={decodedUser?.profilePicture}
                  alt=""
                  width="60px"
                  height="60px"
                  style={{
                    borderRadius: "100%",
                  }}
                />
              </Box>

              <Box ml={3} sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6">
                    {decodedUser.lastname} {decodedUser.firstname}
                  </Typography>
                  <Typography variant="caption">View Profile</Typography>
                </Box>
              </Box>
            </Box>
            {navItems
              .filter((item) => item.bottom === false)
              .map((item, index) => {
                return (
                  <SidebarMenu
                    collapse={props.collapse}
                    item={item}
                    key={item.name}
                    width={props.width}
                    isMobile={props.isMobile}
                    onClose={() => props.setOpen(false)}
                    isActive={location.pathname.includes(item.url)}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserSidebar;
