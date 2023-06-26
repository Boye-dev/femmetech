import { createContext, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { getDecodedJwt } from "../utils/auth";
import { useRef } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://nexus-backend-mhoe.onrender.com";
const NexusContext = createContext({});

const NexusContextProvider = ({ children }) => {
  const decodedUser = getDecodedJwt();
  const userId = decodedUser.id;
  const socketRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
  }, []);
  useEffect(() => {
    socketRef.current.emit("addUser", userId);

    socketRef.current.on("getUsers", (users) => {
      console.log(users);
    });
    socketRef.current.on("getMessage", (data) => {
      console.log("Arrived");
      setArrivalMessage(data.newMessageReceived);
    });
    socketRef.current.on("getLatestMessage", (data) => {
      console.log("Latest");

      setLatestMessage(data.newMessageReceived);
    });
  }, [userId]);
  return (
    <NexusContext.Provider value={{ socketRef, arrivalMessage, latestMessage }}>
      {children}
    </NexusContext.Provider>
  );
};

export const useNexusContext = () => {
  return useContext(NexusContext);
};

export { NexusContext, NexusContextProvider };
