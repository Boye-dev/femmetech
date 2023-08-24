import React from "react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import Fullcalendar from "@fullcalendar/react";
import "../../../../styles/calendar.css";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useQuery, useMutation, useQueryClient } from "react-query";

import { getDecodedJwt } from "../../../../utils/auth";
import { useAlert } from "../../../../context/NotificationProvider";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Popover,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  CalendarMonth,
  HourglassBottom,
  LocalHospital,
} from "@mui/icons-material";
import {
  formatDate,
  getDuration,
  getFormattedTime,
} from "../../../../utils/formatDate";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
function Calendar({ rescheduleApp, setReshedule }) {
  const [event, setEvent] = useState(false);
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const patientId = decodedUser.id;

  const queryClient = useQueryClient();

  const defaultValues = {
    startDateTime: "",
    endDateTime: "",
  };
  const handleCloseDialog = () => {
    setReshedule(null);
  };
  const schema = yup.object().shape({
    startDateTime: yup
      .date()
      .required("Start date And Time Is Required")
      .test(
        "startDateTime",
        "Start date and time should be in the future",
        function (value) {
          if (!value) {
            // Don't perform the comparison if the value is missing
            return true;
          }

          const currentDate = new Date();
          const startDate = new Date(value);

          return startDate > currentDate;
        }
      ),
    endDateTime: yup
      .date()
      .required("End date And Time Is Required")
      .test(
        "endDateTime",
        "End date and time should not be less than start date and time",
        function (value) {
          const { startDateTime } = this.parent;
          if (!startDateTime || !value) {
            // Don't perform the comparison if either value is missing
            return true;
          }

          const startDate = new Date(startDateTime);
          const endDate = new Date(value);

          return endDate >= startDate;
        }
      ),
  });
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (clickInfo) => {
    const { clientX, clientY } = clickInfo.jsEvent;
    setPopoverAnchorEl({ left: clientX, top: clientY });
    setSelectedEvent(clickInfo.event);
  };
  const {
    // control,
    handleSubmit,
    // formState: { errors },
    // trigger,
    // watch,
    // reset,
    setValue,
    // getValues,
    // unregister,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  const closePopover = () => {
    setPopoverAnchorEl(null);
    setSelectedEvent(null);
  };
  const handleStartDateTimeChange = (date) => {
    setValue("startDateTime", date);
  };
  const handleEndDateTimeChange = (date) => {
    setValue("endDateTime", date);
  };
  // const { mutate, isLoading } = useMutation(cancel, {
  //   onError: (error) => {
  //     showNotification?.(error.response.data.errors[0] || error.message, {
  //       type: "error",
  //     });
  //   },
  //   onSuccess: (data) => {
  //     setSelectedEvent(null);
  //     setPopoverAnchorEl(null);
  //     queryClient.refetchQueries("upcoming_app");

  //     showNotification?.(data.message, { type: "success" });
  //   },
  // });
  // const onCancel = (appointmentId) => {
  //   const payload = {
  //     appointmentId,
  //     userId: decodedUser.id,
  //   };

  //   mutate(payload);
  // };

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
              events={[
                { title: "Event 1", date: "2023-08-23" },
                { title: "Event 2", date: "2023-08-15" },
              ]}
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
                        Oyelola Adeboye
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
                      <Button variant="contained">Send message</Button>
                      <Button
                        sx={{ mt: 3 }}
                        onClick={() => setReshedule("yes")}
                      >
                        Reschedule Call
                      </Button>
                      <Button color="error" sx={{ mt: 3 }}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </div>
              )}
            </Popover>
          </div>
        </>
      )}
      <Dialog open={rescheduleApp !== null} onClose={handleCloseDialog}>
        {selectedEvent && (
          <>
            <Box sx={{ width: "auto", height: "400px" }}>
              <DialogTitle
                variant="h4"
                sx={{ fontSize: { xs: "18px !important" } }}
                color="black"
              >
                Reschedule Appointment
              </DialogTitle>
              <DialogContent>
                <Typography
                  variant="caption"
                  sx={{ fontSize: { xs: "14px !important" } }}
                  color="black"
                >
                  Title - {selectedEvent.title}
                </Typography>
                <Typography
                  color="black"
                  variant="body1"
                  sx={{ fontSize: { xs: "14px !important" }, mb: 3 }}
                >
                  Please select new start date and time
                </Typography>
                <Box p={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      // sx={textFieldStyle}
                      label="Start Date and Time"
                      inputVariant="outlined"
                      // value={selectedDateTime}
                      sx={{ width: "100%" }}
                      onChange={handleStartDateTimeChange}
                    />
                  </LocalizationProvider>
                </Box>
                <Typography
                  color="black"
                  variant="body1"
                  sx={{ fontSize: { xs: "14px !important" }, mb: 3 }}
                >
                  Please select new end date and time
                </Typography>
                <Box p={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      // sx={textFieldStyle}
                      label="End Date and Time"
                      inputVariant="outlined"
                      // value={selectedDateTime}
                      sx={{ width: "100%" }}
                      onChange={handleEndDateTimeChange}
                    />
                  </LocalizationProvider>
                  <Box>
                    <LoadingButton
                      // loading={isRescheduling}
                      // onClick={handleSubmit(onReschedule)}
                      variant="contained"
                      sx={{
                        height: "30px",
                        width: "100%",
                        mt: 5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="white"
                        sx={{ fontSize: "12px !important" }}
                      >
                        Reschedule Appontment
                      </Typography>
                    </LoadingButton>
                  </Box>
                </Box>
              </DialogContent>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default Calendar;
