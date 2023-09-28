import React from "react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import Fullcalendar from "@fullcalendar/react";
import "../../../../styles/calendar.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getDecodedJwt } from "../../../../utils/auth";
import { useAlert } from "../../../../context/NotificationProvider";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Popover,
  Typography,
} from "@mui/material";
import { AccessTime, CalendarMonth } from "@mui/icons-material";
import { formatDate, getFormattedTime } from "../../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { updateAppointment } from "../../services/patientService";
import { LoadingButton } from "@mui/lab";

function Calendar({ data, value }) {
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleErrors = (error) => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 400)
    ) {
      // Handle the 500 error here
      showNotification?.(
        error?.response?.data?.message ||
          error?.response?.data?.errors[0] ||
          "Internal Server Error",
        {
          type: "error",
        }
      );
    } else {
      // Handle other errors
      console.log(error);
      showNotification?.(
        error?.response?.data?.errors[0] ||
          error?.response?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred",
        {
          type: "error",
        }
      );
    }
  };

  const { mutate: update, isLoading: isUpdating } = useMutation(
    updateAppointment,
    {
      onError: (error) => {
        handleErrors(error);
      },
      onSuccess: (data) => {
        showNotification?.("Appointment Cancelled Successfully", {
          type: "success",
        });
        closePopover();
        queryClient.refetchQueries("appointments");
      },
    }
  );
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (clickInfo) => {
    const { clientX, clientY } = clickInfo.jsEvent;
    setPopoverAnchorEl({ left: clientX, top: clientY });
    setSelectedEvent(clickInfo.event);
  };

  const closePopover = () => {
    setPopoverAnchorEl(null);
    setSelectedEvent(null);
  };

  const convertedData = data?.map((data) => {
    const dateObj = new Date(data.date);
    const startTimeObj = new Date(`1970-01-01T${data.startTime}`);
    const endTimeObj = new Date(`1970-01-01T${data.endTime}`);

    const startDateTime = new Date(dateObj);
    startDateTime.setHours(
      startTimeObj.getHours(),
      startTimeObj.getMinutes(),
      0,
      0
    );

    const endDateTime = new Date(dateObj);
    endDateTime.setHours(endTimeObj.getHours(), endTimeObj.getMinutes(), 0, 0);

    return {
      appointmentId: data._id,
      title: data.description,
      patientId: data.patient,
      consultantId: data.consultant,
      start: startDateTime,
      end: endDateTime,

      timeZone: "Africa/Lagos",
    };
  });

  return (
    <div>
      {false ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <Fullcalendar
              events={convertedData}
              dayMaxEvents={true}
              nowIndicator={true}
              eventClick={handleEventClick}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"timeGridWeek"}
              headerToolbar={{
                start: "today prev,next", // will normally be on the left. if RTL, will be on the right
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
              }}
              height={"90vh"}
            />
            <Popover
              open={Boolean(popoverAnchorEl)}
              onClose={closePopover}
              anchorReference="anchorPosition"
              anchorPosition={popoverAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {selectedEvent && (
                <div
                  style={{
                    width: "350px",
                    height: "auto",
                  }}
                >
                  <Box sx={{ padding: "30px 20px" }}>
                    <Typography variant="body2">
                      Consultation session with{" "}
                      <span style={{ color: "#87B7C7", fontWeight: "700" }}>
                        {decodedUser.role === "CONSULTANT" ? (
                          <>
                            {selectedEvent.extendedProps?.patientId?.firstname}{" "}
                            {selectedEvent.extendedProps?.patientId?.lastname}
                          </>
                        ) : (
                          <>
                            {
                              selectedEvent.extendedProps?.consultantId
                                ?.firstname
                            }{" "}
                            {
                              selectedEvent.extendedProps?.consultantId
                                ?.lastname
                            }
                          </>
                        )}
                      </span>
                    </Typography>

                    <Divider />
                    <Grid container mt={5}>
                      <Grid item xs={6} height="70px">
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                          }}
                        >
                          <CalendarMonth />
                          <Box ml={5}>
                            <Typography color="text.secondary" variant="body2">
                              Date
                            </Typography>
                            <Typography color="black" variant="h6">
                              {formatDate(
                                selectedEvent._instance?.range.start
                              ) || "--"}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6} height="70px">
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                          }}
                        >
                          <AccessTime />
                          <Box ml={5}>
                            <Typography color="text.secondary" variant="body2">
                              Time
                            </Typography>
                            <Typography color="black" variant="h6">
                              {getFormattedTime(
                                selectedEvent._instance.range?.start
                              ) || "--"}{" "}
                              -{" "}
                              {getFormattedTime(
                                selectedEvent._instance?.range.end
                              ) || "--"}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ height: "5px" }} />

                    <Box
                      sx={{
                        mt: 5,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => navigate("/patient/messages")}
                      >
                        Send message
                      </Button>
                      {value === 0 && (
                        <>
                          <Button
                            sx={{ mt: 3 }}
                            onClick={() =>
                              navigate(
                                `${
                                  decodedUser.role === "PATIENT"
                                    ? "/patient"
                                    : "/consultant"
                                }/appointments/update-appointment/${
                                  selectedEvent.extendedProps?.appointmentId
                                }`
                              )
                            }
                          >
                            Reschedule Call
                          </Button>
                          <LoadingButton
                            loading={isUpdating}
                            color="error"
                            sx={{ mt: 3 }}
                            onClick={() => {
                              const payload = {
                                id: selectedEvent.extendedProps?.appointmentId,
                                status: "CANCELLED",
                              };
                              update(payload);
                            }}
                          >
                            Cancel
                          </LoadingButton>
                        </>
                      )}
                    </Box>
                  </Box>
                </div>
              )}
            </Popover>
          </div>
        </>
      )}
    </div>
  );
}

export default Calendar;
