import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import { KeyboardArrowRight, Person } from "@mui/icons-material";
import { List, ListItemButton, Divider, SwipeableDrawer } from "@mui/material";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
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
        sx={{ height: "100%", padding: { xs: "0 4%", md: "0 8%" } }}
      >
        <Box>
          <Logo />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-around",
            width: "50%",
          }}
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
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-around",
            width: "30%",
          }}
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
        <Fragment>
          <Button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon
              sx={{
                color: "black",
                padding: "7px",
                borderRadius: "10px",
                border: "2px solid black",
              }}
            />
          </Button>
          <SwipeableDrawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            <Box sx={{ width: 250 }}>
              {/* <MenuBar /> */}
              <Box>
                <Box
                  sx={{
                    width: "90%",
                    margin: "auto",
                    paddingTop: "20px",
                    height: "100%",
                    marginTop: "96px",
                  }}
                >
                  {/* <Box sx={{ width: '100%', fontSize: "20px", }} onClick={toggleDrawer("left", false)} onKeyDown={toggleDrawer("left", false)}> */}
                  <Box sx={{ width: "100%", fontSize: "20px" }}>
                    <List component="nav" aria-label="main mailbox folders">
                      {[
                        "Home",
                        "Dashboard",
                        "Patients",
                        "About Us",
                        "Contact",
                      ].map((item) => {
                        return (
                          <Link
                            style={{
                              marginBottom: "20px",
                              textDecoration: "none",
                              color: "inherit",
                            }}
                            to={"/"}
                          >
                            <ListItemButton
                              sx={{ marginBottom: "20px", borderRadius: "6px" }}
                            >
                              {/* <ListItemIcon>
                                      <LayersIcon sx={{fontSize: '24px'}}/>
                                  </ListItemIcon> */}
                              <Typography
                                color="text.primary"
                                variant="caption"
                                sx={{
                                  fontWeight: 500,
                                  fontSize: "30px",
                                  cursor: "pointer",
                                }}
                              >
                                {item}
                              </Typography>
                            </ListItemButton>
                          </Link>
                        );
                      })}
                    </List>
                    <Divider />

                    <ListItemButton
                      sx={{ borderRadius: "6px", marginTop: "20px" }}
                    >
                      <Button
                        sx={{
                          width: "100%",
                          border: "1px solid",
                          borderRadius: "50px",
                        }}
                        startIcon={<Person />}
                      >
                        Login
                      </Button>
                    </ListItemButton>
                    <ListItemButton sx={{ borderRadius: "6px" }}>
                      <Box
                        sx={{
                          borderRadius: "50px",
                          padding: "5px 10px",
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        <Typography sx={{ color: "white" }} variant="caption">
                          Book Appointment
                        </Typography>
                        <KeyboardArrowRight sx={{ color: "white" }} />
                      </Box>
                    </ListItemButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SwipeableDrawer>
        </Fragment>
      </Box>
    </Box>
  );
};

export default Navbar;
