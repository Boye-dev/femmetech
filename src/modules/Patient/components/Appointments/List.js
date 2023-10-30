import { AccessTime, CalendarMonth } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";

import React, { useState } from "react";

import { getDecodedJwt } from "../../../../utils/auth";
import { formatDate } from "@fullcalendar/core";
import { useNavigate } from "react-router-dom";
import { updateAppointment } from "../../services/patientService";
import { useMutation, useQueryClient } from "react-query";
import { useAlert } from "../../../../context/NotificationProvider";
const List = ({ value, data }) => {
  const decodedUser = getDecodedJwt();
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();

  const [itemToDelete, setItemToDelete] = useState("");
  const handleErrors = (error) => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 400)
    ) {
      // Handle the 500 error here
      showNotification?.(
        error?.response?.data?.message ||
          error.response?.data?.name ||
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
          error.response?.data?.name ||
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
        setItemToDelete();
        queryClient.refetchQueries("appointments");
      },
    }
  );
  return (
    <>
      <Box sx={{ pl: 5, pr: 5, minHeight: "100vh" }}>
        {data?.map((item) => {
          const dateObj = new Date(item.date);
          const startTimeObj = new Date(`1970-01-01T${item.startTime}`);
          const endTimeObj = new Date(`1970-01-01T${item.endTime}`);

          const startDateTime = new Date(dateObj);
          startDateTime.setHours(
            startTimeObj.getHours(),
            startTimeObj.getMinutes(),
            0,
            0
          );

          const endDateTime = new Date(dateObj);
          endDateTime.setHours(
            endTimeObj.getHours(),
            endTimeObj.getMinutes(),
            0,
            0
          );

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
                  {decodedUser.role === "CONSULTANT" ? (
                    <>
                      {item.patient?.firstname} {item.patient?.lastname}
                    </>
                  ) : (
                    <>
                      {item.consultant?.firstname} {item.consultant?.lastname}
                    </>
                  )}
                </span>
              </Typography>
              <Box sx={{ display: "flex", mt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonth sx={{ color: "#87B7C7" }} />
                  <Typography variant="body2" ml={2}>
                    {formatDate(item.date) || "--"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", ml: 6 }}>
                  <AccessTime sx={{ color: "#87B7C7" }} />
                  <Typography variant="body2" ml={2}>
                    {item.startTime || "--"} - {item.endTime || "--"}
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
                <Button
                  variant="contained"
                  sx={{ mt: 5 }}
                  onClick={() => navigate("/patient/messages")}
                >
                  Send message
                </Button>
                {value === 0 && (
                  <>
                    <Button
                      sx={{ mt: 5 }}
                      onClick={() =>
                        navigate(
                          `${
                            decodedUser.role === "PATIENT"
                              ? "/patient"
                              : "/consultant"
                          }/appointments/update-appointment/${item._id}`
                        )
                      }
                    >
                      Reschedule Call
                    </Button>
                    <LoadingButton
                      loading={item._id === itemToDelete && isUpdating}
                      sx={{ mt: 5 }}
                      color="error"
                      onClick={() => {
                        setItemToDelete(item._id);
                        const payload = {
                          id: item._id,
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
          );
        })}
      </Box>
    </>
  );
};

export default List;
