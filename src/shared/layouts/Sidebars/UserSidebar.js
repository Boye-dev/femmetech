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
  // const navItems =
  //   decodedUser.role === "PATIENT" ? PATIENT_NAV_ITEMS ;
  const { isLoading, data } = useQuery(
    ["patient_by_id", { patientId: decodedUser.id }],
    fetchUser,
    {
      enabled:
        isAuthenticated() &&
        decodedUser.role === "PATIENT" &&
        decodedUser.id !== null &&
        decodedUser.id !== undefined,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const { isLoading: isLoadingDoctor, data: doctorDat } = useQuery(
    ["doctor_by_id", { doctorId: decodedUser.id }],
    fetchUserDoctor,
    {
      enabled:
        isAuthenticated() &&
        decodedUser.role === "DOCTOR" &&
        decodedUser.id !== null &&
        decodedUser.id !== undefined,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            width: { xs: "100%", md: props.width },
            backgroundColor: "#F5F5F5",

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
                  borderRadius: "100%",
                  border: "1px solid black",
                }}
              ></Box>

              <Box ml={3} sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6">Oyelola Adeboye</Typography>
                  <Typography variant="caption">View Profile</Typography>
                </Box>
              </Box>
            </Box>
            {PATIENT_NAV_ITEMS.filter((item) => item.bottom === false).map(
              (item, index) => {
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
              }
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserSidebar;
