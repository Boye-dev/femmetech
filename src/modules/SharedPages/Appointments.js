import React, { useState } from "react";
import Calendar from "../Patient/components/Appointments/Calendar";
import List from "../Patient/components/Appointments/List";
import {
  Box,
  Button,
  Divider,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchAppointments } from "../Patient/services/patientService";
import { getDecodedJwt } from "../../utils/auth";
import { useAlert } from "../../context/NotificationProvider";

const Appointments = () => {
  const [view, setView] = useState(true);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const decodedUser = getDecodedJwt();

  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const { isLoading: isLoadingUser, data } = useQuery(
    [
      "appointments",
      {
        user: decodedUser._id,
        status: value === 2 ? "CANCELLED" : "SCHEDULED",
        filter: value === 0 ? "UPCOMING" : value === 1 ? "PAST" : undefined,
      },
    ],
    fetchAppointments,
    {
      onError: (error) => {
        showNotification?.(
          error.response?.data?.message ||
            error.response?.data?.name ||
            error.message,
          {
            type: "error",
          }
        );
      },

      onSuccess: (data) => {},
    }
  );
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent:
            decodedUser.role === "PATIENT" ? "space-between" : "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {decodedUser.role === "PATIENT" && (
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => navigate("create-appointment")}
          >
            Schedule Appointment
          </Button>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            pr: 10,
          }}
        >
          <Typography variant="body2" color={view || "text.primary"}>
            List view
          </Typography>
          <Switch defaultChecked={view} onChange={() => setView(!view)} />
          <Typography variant="body2" color={view && "text.primary"}>
            Calendar view
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Upcoming" />
          <Tab label="Past" />
          <Tab label="Cancelled" />
        </Tabs>
        <Divider />
      </Box>
      {view ? (
        <Calendar value={value} data={data?.appointments} />
      ) : (
        <List value={value} data={data?.appointments} />
      )}
    </>
  );
};

export default Appointments;
