import { useEffect, useState } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";
import { getDecodedJwt } from "../utils/auth";

const useSocket = (url) => {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [inAppNotification, setInAppNotification] = useState([]);
  const [latestMessage, setLatestMessage] = useState();
  const decodedUser = getDecodedJwt();
  const [socket, setSocket] = useState();
  const socketRef = useRef();

  useEffect(() => {
    const mainSocket = io(url);
    setSocket(mainSocket);

    return () => {
      socket?.disconnect();
    };
  }, []);
  useEffect(() => {
    socket?.emit("addUser", decodedUser._id);
  }, [socket]);

  useEffect(() => {
    socket?.on("receiveMessage", ({ message, sender: userId }) => {
      setMessage(message);
    });
    socket?.on("inAppNotification", ({ message, sender: userId }) => {
      setInAppNotification([message, ...inAppNotification]);
    });
    socket?.on("latestMessage", ({ message, sender: userId }) => {
      setLatestMessage(message);
    });
    socket?.on("type", ({ typing, sender, chatId }) => {
      console.log(typing);
      setTyping({ typing, sender, chatId });
    });
  }, [socket]);

  return {
    socketRef: socket,
    message,
    typing,
    inAppNotification,
    latestMessage,
  };
};

export default useSocket;
