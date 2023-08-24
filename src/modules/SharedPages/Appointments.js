import React, { useState } from "react";
import Calendar from "../Patient/components/Appointments/Calendar";
import List from "../Patient/components/Appointments/List";
import { Box, Divider, Switch, Tab, Tabs, Typography } from "@mui/material";

const Appointments = () => {
  const [view, setView] = useState(true);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [rescheduleApp, setReshedule] = useState(null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          pr: 10,
          marginTop: "20px",
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
      <Box sx={{ mb: 5 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Upcoming" />
          <Tab label="Past" />
          <Tab label="Cancelled" />
        </Tabs>
        <Divider />
      </Box>
      {view ? (
        <Calendar rescheduleApp={rescheduleApp} setReshedule={setReshedule} />
      ) : (
        <List rescheduleApp={rescheduleApp} setReshedule={setReshedule} />
      )}
    </>
  );
};

export default Appointments;
