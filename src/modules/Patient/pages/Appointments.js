import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Calendar from "../components/Appointments/Calendar";
import Book from "../components/Appointments/Book";
import { Add } from "@mui/icons-material";

const Appointments = () => {
  const [book, setBook] = useState(false);
  const [time, setTime] = useState(null);

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", pb: 4 }}>
        <Box
          sx={{
            pt: 10,
            pl: 10,
            pr: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" sx={{ color: "black" }}>
            Appointments
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setBook(true)}
          >
            New
          </Button>
        </Box>
      </Box>
      <Calendar setTime={setTime} setBook={setBook} />
      <Book
        open={book}
        time={time}
        onClose={() => {
          setTime(null);
          setBook(false);
        }}
      />
    </Box>
  );
};

export default Appointments;
