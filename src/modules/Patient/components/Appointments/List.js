import {
  AccessTime,
  CalendarMonth,
  TimeToLeaveSharp,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const List = ({ rescheduleApp, setReshedule }) => {
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

  const handleStartDateTimeChange = (date) => {
    setValue("startDateTime", date);
  };
  const handleEndDateTimeChange = (date) => {
    setValue("endDateTime", date);
  };
  return (
    <>
      <Box sx={{ pl: 5, pr: 5 }}>
        {[1, 2, 4, 5].map((item) => {
          return (
            <Box
              sx={{
                width: { md: "70%" },
                height: "auto",
                backgroundColor: "white",
                boxShadow: "1px 1px 5px 0.5px #C0C0C0",
                borderRadius: "8px",
                p: 8,
                mb: 5,
              }}
            >
              <Typography variant="body2">
                Consultation session with{" "}
                <span style={{ color: "#87B7C7", fontWeight: "700" }}>
                  Oyelola Adeboye
                </span>
              </Typography>
              <Box sx={{ display: "flex", mt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonth sx={{ color: "#87B7C7" }} />
                  <Typography variant="body2" ml={2}>
                    Thu, May 18
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", ml: 6 }}>
                  <AccessTime sx={{ color: "#87B7C7" }} />
                  <Typography variant="body2" ml={2}>
                    7:00PM - 8:00PM
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",

                  width: { xs: "100%", md: "60%" },
                  justifyContent: "space-between",
                }}
              >
                <Button variant="contained" sx={{ mt: 5 }}>
                  Send message
                </Button>
                <Button sx={{ mt: 5 }} onClick={() => setReshedule("yes")}>
                  Reschedule Call
                </Button>
                <Button sx={{ mt: 5 }} color="error">
                  Cancel
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Dialog open={rescheduleApp !== null} onClose={handleCloseDialog}>
        {true && (
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
                  Title -
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
    </>
  );
};

export default List;
