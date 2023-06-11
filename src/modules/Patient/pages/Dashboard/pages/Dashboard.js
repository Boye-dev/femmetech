import { DoNotDisturbOnTotalSilence } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProfileSidebar from "../../../../../components/ProfileSidebar";
import { useWidth } from "../../../../../hooks/useWidth";

const Dashboard = () => {
  const { isMobile } = useWidth();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          width: isMobile ? "100%" : "calc(100% - 250px)",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          pb: 20,
        }}
      >
        <Box sx={{ width: "100%", pl: 8, pr: 8, backgroundColor: "#F5F5F5" }}>
          <Box sx={{ pt: 10, pl: 4 }}>
            <Typography variant="h3" sx={{ color: "black" }}>
              Dashboard
            </Typography>
          </Box>
          <Grid
            container
            sx={{
              mt: 5,
            }}
          >
            {[
              {
                name: "Total Appointments",
                icon: <DoNotDisturbOnTotalSilence />,
              },
              {
                name: "Upcoming Appointments",
                icon: <DoNotDisturbOnTotalSilence />,
              },
              {
                name: "Cancelled Appointments",
                icon: <DoNotDisturbOnTotalSilence />,
              },
            ].map((item, index) => {
              return (
                <Grid key={index} item xs={12} md={4} sx={{}}>
                  <Box
                    sx={{
                      m: 2,

                      height: "120px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      p: 2,
                    }}
                  ></Box>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            container
            sx={{
              mt: 5,
            }}
          >
            <Grid item xs={12} md={7} sx={{}}>
              <Box
                sx={{
                  height: "300px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  p: 2,
                  m: 2,
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{}}>
              <Box
                sx={{
                  height: "300px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  p: 2,
                  m: 2,
                }}
              ></Box>
            </Grid>
            <Box
              sx={{
                width: isMobile ? "100%" : "40%",
                height: "300px",
                borderRadius: "10px",
                backgroundColor: "white",
                p: 2,
                m: 2,
              }}
            ></Box>
          </Grid>
        </Box>
      </Box>
      {!isMobile && <ProfileSidebar width="250px" />}
    </>
  );
};

export default Dashboard;
