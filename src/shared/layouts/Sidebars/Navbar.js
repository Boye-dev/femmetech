import { KeyboardArrowDown, NotificationsOutlined } from "@mui/icons-material";
import { Box, Menu, MenuItem } from "@mui/material";
import React from "react";
import Logo from "../../../assets/images/femmetech-logo-removebg-preview.png";
import { Squash as Hamburger } from "hamburger-react";
import { getDecodedJwt } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../modules/Auth/services/authServices";
import { useQuery } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";
const Navbar = (props) => {
  const decodedUser = getDecodedJwt();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { showNotification } = useAlert();

  const { isLoading: userLoading, data } = useQuery(
    [
      "getUserById",
      {
        id: decodedUser?._id,
      },
    ],
    getUserById,
    {
      enabled: true,

      onError: (error) => {
        if (
          error.response &&
          (error.response.status === 500 || error.response.status === 400)
        ) {
          // Handle the 500 error here
          showNotification?.(
            error?.response?.data?.message ||
              error.response?.data?.name ||
              "Internal Server Error",
            {
              type: "error",
            }
          );
        } else {
          // Handle other errors
          console.log(error);
          showNotification?.(
            error.response.data.errors[0] ||
              error?.response?.data?.message ||
              error.response?.data?.name ||
              error.message ||
              error.error ||
              "An error occurred",
            {
              type: "error",
            }
          );
        }
      },
      onSuccess: (data) => {},
    }
  );
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
        {/* <Box
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
        </Box> */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={handleClick}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",

              ml: 3,
              mr: 0.5,
            }}
          >
            <img
              src={data?.profilePicture}
              alt=""
              width="30px"
              height="30px"
              style={{
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <KeyboardArrowDown fontSize="10px" />
        </Box>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              navigate(
                `/${
                  decodedUser?.role === "PATIENT" ? "patient" : "consultant"
                }/profile`
              );
              handleClose();
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("scheduleSet");
              navigate("/signin");
              handleClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Hamburger toggle={props.setOpen} toggled={props.isOpen} size="25" />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
