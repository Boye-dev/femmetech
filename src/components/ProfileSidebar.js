import {
  LocationOn,
  NavigateNext,
  NotificationsNone,
} from "@mui/icons-material";
import { Box, Drawer, Typography } from "@mui/material";
import React from "react";

const ProfileSidebar = (props) => {
  return (
    <>
      <Box>
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            width: props.width,
          }}
        >
          <Box width={props.width}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 20,
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                  border: "1px solid black",
                }}
              ></Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography variant="h6" color="black">
                Oyelola Adeboye
              </Typography>
              <Typography variant="caption" color="#787878">
                Patient Duration: 3 Months
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationOn />
                <Typography variant="caption" color="#787878">
                  Location: Lagos
                </Typography>
              </Box>
            </Box>
            <Box sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 3,
                }}
              >
                <Typography variant="h6" color="black">
                  Personal
                </Typography>
                <Box
                  sx={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    borderRadius: "5px",
                  }}
                >
                  <NavigateNext color="success" />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h6" color="black">
                  DOB:
                </Typography>
                <Typography variant="caption" color="#787878">
                  25/04/2004
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h6" color="black">
                  Phone:
                </Typography>
                <Typography variant="caption" color="#787878">
                  +2348154332992
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h6" color="black">
                  Address:
                </Typography>
                <Typography variant="caption" color="#787878">
                  Number 2, off...
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h6" color="black">
                  Email:
                </Typography>
                <Typography variant="caption" color="#787878">
                  example@gmail.com
                </Typography>
              </Box>
            </Box>

            <Box sx={{ pt: 10, pl: 4, pr: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <NotificationsNone sx={{ color: "black" }} />
                  <Typography variant="h6" color="black">
                    Notifications
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Show All
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default ProfileSidebar;
