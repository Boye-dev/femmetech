import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { getDecodedJwt } from "../utils/auth";
import useSocket from "../hooks/useSocket";
import { Box, Typography } from "@mui/material";
import { Message } from "@mui/icons-material";
import Scheduler from "../modules/Consultant/components/Scheduler";
const FemmetechContext = createContext({});

const FemmetechContextProvider = ({ children }) => {
  const ENDPOINT = process.env.BACKEND_URL;
  const { socketRef, message, typing, inAppNotification, latestMessage } =
    useSocket("http://localhost:8080");
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (inAppNotification.length > 0) {
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 3000);
    }
  }, [inAppNotification]);

  return (
    <FemmetechContext.Provider
      value={{ message, typing, inAppNotification, socketRef, latestMessage }}
    >
      <Scheduler />
      {openNotification && (
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            boxShadow: "0 0 5px 0 gray",

            height: "50px",
            width: "200px",
            position: "fixed",
            top: 10,
            zIndex: 3000,
            right: 0,
            display: "flex",
            p: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Message color="primary" />
          <Typography color="primary" variant="h6" ml={2}>
            {inAppNotification[0].content.text}
          </Typography>
        </Box>
      )}
      {children}
    </FemmetechContext.Provider>
  );
};

export const useFemmetechContext = () => {
  return useContext(FemmetechContext);
};

export { FemmetechContext, FemmetechContextProvider };
