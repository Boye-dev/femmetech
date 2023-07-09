import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
// import ProfileSidebar from "../../../../../components/ProfileSidebar";
// import { useWidth } from "../../../../../hooks/useWidth";
import { useQuery } from "react-query";
import {
  fetchAppointmentsDoctor,
  fetchInfo,
  fetchUpcoming,
} from "../../../services/doctorService";
import { useAlert } from "../../../../../context/NotificationProvider";

import { getDecodedJwt } from "../../../../../utils/auth";
import { useNavigate } from "react-router";
import PendingDrawer from "../../../components/Dasboard/PendingDrawer";
import { formatDate } from "@fullcalendar/core";
import DoctorProfileSidebar from "../../../../../components/DoctorProfileSidebar";

const Dashboard = () => {
  // const { isMobile } = useWidth();
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const color = ["#0FC916", "#FCBA03", "#6E00FF", "#F30505"];
  const doctorId = decodedUser.id;
  const [open, setOpen] = useState(false);

  const { isLoading: isAppointmentLoading, data: pendingApp } = useQuery(
    [
      "appointments",
      {
        doctorId,
        status: "PENDING",
      },
    ],
    fetchAppointmentsDoctor,
    {
      enabled: doctorId !== null || doctorId !== undefined,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const { isLoading, data } = useQuery(
    ["info", { doctorId: doctorId }],
    fetchInfo,
    {
      enabled: doctorId !== null || doctorId !== undefined,

      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const { isLoading: upcomingLoading, data: upcoming } = useQuery(
    ["upcoming_app", { doctorId: doctorId }],
    fetchUpcoming,
    {
      enabled: doctorId !== null || doctorId !== undefined,

      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );

  return (
    <>
      {isLoading || upcomingLoading || isAppointmentLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "auto", md: "100vh" },
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {" "}
          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              width: { xs: "100%", md: "calc(100% - 250px)" },
              minHeight: "100vh",
              display: "flex",
              pb: 10,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{ width: "100%", pl: 8, pr: 8, backgroundColor: "#F5F5F5" }}
            >
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
                    value: data?.data.totalAppointments || "--",
                  },
                  {
                    value: data?.data.upcomingAppointments || "--",
                    name: "Upcoming Appointments",
                  },
                  {
                    name: "Cancelled Appointments",
                    value: data?.data.cancelledAppointments || "--",
                  },
                ].map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} md={4} sx={{}}>
                      <Box
                        sx={{
                          m: 2,
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          height: "100px",
                          borderRadius: "10px",
                          backgroundColor: "white",
                          p: 2,
                          pl: 5,
                        }}
                      >
                        <Typography color="text.secondary" variant="h6">
                          {item.name}
                        </Typography>
                        <Typography color="black" variant="h3">
                          {item.value}
                        </Typography>
                      </Box>
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
                <Grid item xs={12} sx={{}}>
                  <Box
                    sx={{
                      height: "340px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      pl: 5,
                      pr: 5,
                      pt: 8,
                      pb: 8,
                      m: 2,
                    }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography color="text.secondary" variant="h5">
                        Upcoming Appointments
                      </Typography>
                      <Typography
                        onClick={() => navigate("/doctor/appointments")}
                        color="primary"
                        variant="subtitle2"
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        Show All
                      </Typography>
                    </Box>
                    {upcoming?.data.length > 0 ? (
                      upcoming?.data?.slice(0, 4).map((item, index) => {
                        return (
                          <>
                            <Box
                              key={item._id}
                              sx={{
                                width: "100%",
                                minHeight: "70px",
                                backgroundColor: "#F4F4F4",
                                borderTopRightRadius: "5px",
                                borderBottomRightRadius: "5px",
                                display: "flex",

                                mt: 3,
                                mb: 2,
                                justifyContent: "space-between",
                              }}
                            >
                              <Box display="flex" sx={{ width: "75%" }}>
                                <Box
                                  sx={{
                                    width: "1.99px",
                                    height: "100%",
                                    borderRadius: "5px",
                                    backgroundColor: color[index],
                                  }}
                                />
                                <Box
                                  ml={5}
                                  display="flex"
                                  flexDirection="column"
                                  justifyContent="center"
                                  p={1}
                                >
                                  <Typography color="black" variant="h5">
                                    {item.title}
                                  </Typography>
                                  <Typography
                                    color="text.secondary"
                                    variant="caption"
                                  >
                                    Doctor : Dr {item.doctorId.lastName}
                                  </Typography>
                                  <Typography
                                    color="text.secondary"
                                    variant="caption"
                                    sx={{ fontSize: "10px !important" }}
                                  >
                                    Date : {formatDate(item.startDateTime)}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="flex-end"
                                mr={5}
                                sx={{ width: "25%" }}
                              >
                                {/* <Button
                                  variant="contained"
                                  disableElevation
                                  sx={{ borderRadius: "10px ", width: "29px" }}
                                >
                                  View
                                </Button> */}
                              </Box>
                            </Box>
                          </>
                        );
                      })
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Typography variant="h6" mt={4} color="text.secondary">
                          No Upcoming Appointment
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <Box
                    sx={{
                      height: "340px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      pl: 5,
                      pr: 5,
                      pt: 8,
                      pb: 8,
                      m: 2,
                    }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography color="text.secondary" variant="h5">
                        Waitlist
                      </Typography>
                      <Typography
                        onClick={() => setOpen(true)}
                        color="primary"
                        variant="subtitle2"
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        Show All
                      </Typography>
                    </Box>
                    {pendingApp?.data.appointments.length > 0 ? (
                      pendingApp?.data.appointments
                        .slice(0, 4)
                        .map((item, index) => {
                          return (
                            <>
                              <Box
                                key={item._id}
                                sx={{
                                  width: "100%",
                                  minHeight: "70px",
                                  backgroundColor: "#F4F4F4",
                                  borderTopRightRadius: "5px",
                                  borderBottomRightRadius: "5px",
                                  display: "flex",

                                  mt: 3,
                                  mb: 2,
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box display="flex" sx={{ width: "75%" }}>
                                  <Box
                                    sx={{
                                      width: "1.99px",
                                      height: "100%",
                                      borderRadius: "5px",
                                      backgroundColor: color[index],
                                    }}
                                  />
                                  <Box
                                    ml={5}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    p={1}
                                  >
                                    <Typography color="black" variant="h5">
                                      {item.title}
                                    </Typography>
                                    <Typography
                                      color="text.secondary"
                                      variant="caption"
                                    >
                                      {item.patientId.firstName}{" "}
                                      {item.patientId.lastName}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </>
                          );
                        })
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Typography variant="h6" mt={4} color="text.secondary">
                          No Waitlist Appointment
                        </Typography>
                      </Box>
                    )}
                    <PendingDrawer
                      open={open}
                      onClose={() => setOpen(false)}
                      data={data ? pendingApp : []}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <DoctorProfileSidebar width="250px" />
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
