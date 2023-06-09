import {
  Facebook,
  Info,
  Instagram,
  Inventory,
  LinkedIn,
  Person2,
  Policy,
  Twitter,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box sx={{ padding: "5%", backgroundColor: "#181A1B" }}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="flex-start"
              mt={10}
            >
              <Box mt={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Inventory
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 235, 235, 0.1)",
                      p: 1,
                      borderRadius: "4px",
                      mr: 3,
                      fontSize: "15px",
                    }}
                  />
                  <Typography color="white" variant="subtitle2">
                    PRODUCTS
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    NexHealth Online Booking
                  </Typography>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Waitlist
                  </Typography>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    NexHealth Messaging
                  </Typography>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Appointment Reminders
                  </Typography>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Analytics
                  </Typography>{" "}
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Marketing Campaigns
                  </Typography>
                </Box>
              </Box>
              <Box mt={2} ml={1}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Info
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 235, 235, 0.1)",
                      p: 1,
                      borderRadius: "4px",
                      mr: 3,
                      fontSize: "15px",
                    }}
                  />
                  <Typography color="white" variant="subtitle2">
                    RESOURCES
                  </Typography>
                </Box>{" "}
                <Box display="flex" flexDirection="column">
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Resource Hub
                  </Typography>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Company & News
                  </Typography>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    API Support Request
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                    <Policy
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(255, 235, 235, 0.1)",
                        p: 1,
                        borderRadius: "4px",
                        mr: 3,
                        fontSize: "15px",
                      }}
                    />
                    <Typography color="white" variant="subtitle2">
                      LEGAL
                    </Typography>
                  </Box>{" "}
                  <Box display="flex" flexDirection="column">
                    <Typography
                      color="white"
                      variant="caption"
                      sx={{
                        ml: 9,
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Terms & Privacy
                    </Typography>
                    <Typography
                      color="white"
                      variant="caption"
                      sx={{ ml: 9, mt: 2 }}
                    >
                      FAQs
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box mt={2} ml={1}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Person2
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 235, 235, 0.1)",
                      p: 1,
                      borderRadius: "4px",
                      mr: 3,
                      fontSize: "15px",
                    }}
                  />
                  <Typography color="white" variant="subtitle2">
                    ABOUT US
                  </Typography>
                </Box>{" "}
                <Box display="flex" flexDirection="column">
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2, display: "flex", alignItems: "center" }}
                  >
                    Careers
                    <Typography
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(255, 235, 235, 0.1)",
                        p: 1,
                        borderRadius: "4px",
                        mr: 3,

                        ml: 2,
                      }}
                      variant="caption"
                    >
                      We are hiring!
                    </Typography>
                  </Typography>
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Refer a Provider
                  </Typography>{" "}
                  <Typography
                    color="white"
                    variant="caption"
                    sx={{ ml: 9, mt: 2 }}
                  >
                    Developers
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} mt={10}>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              Connect
            </Typography>
            <Divider
              width="80%"
              sx={{ height: "2px", backgroundColor: "white", mt: 2, mb: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "80%",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Twitter
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 235, 235, 0.1)",
                    p: 1,
                    borderRadius: "4px",
                    mr: 3,
                    fontSize: "15px",
                  }}
                />
                <Typography color="white" variant="caption">
                  Nexus-Health
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Instagram
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 235, 235, 0.1)",
                    p: 1,
                    borderRadius: "4px",
                    mr: 3,
                    fontSize: "15px",
                  }}
                />
                <Typography color="white" variant="caption">
                  Nexus-Health
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Facebook
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 235, 235, 0.1)",
                    p: 1,
                    borderRadius: "4px",
                    mr: 3,
                    fontSize: "15px",
                  }}
                />
                <Typography color="white" variant="caption">
                  Nexus-Health
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <LinkedIn
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 235, 235, 0.1)",
                    p: 1,
                    borderRadius: "4px",
                    mr: 3,
                    fontSize: "15px",
                  }}
                />
                <Typography color="white" variant="caption">
                  Nexus-Health
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
