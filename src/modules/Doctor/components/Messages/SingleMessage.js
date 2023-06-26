import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React from "react";
import MainMessage from "./MainMessage";
import { Close, Send } from "@mui/icons-material";
import { getDecodedJwt } from "../../../../utils/auth";
import { useMutation, useQuery } from "react-query";
import { useAlert } from "../../../../context/NotificationProvider";
import { fetchMessages, postMessages } from "../../services/doctorService";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NexusContext } from "../../../../context/NexusContext";
import { useRef } from "react";

const SingleMessage = ({ chat, showDrop, onClose }) => {
  const { showNotification } = useAlert();

  const decodedUser = getDecodedJwt();
  const chatData = chat?.users.filter(
    (item) => item.userDetails._id !== decodedUser.id
  );
  const { socketRef, arrivalMessage } = useContext(NexusContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { isLoading } = useQuery(
    ["messages", { chatId: chat._id }],
    fetchMessages,
    {
      enabled: chat._id !== null || chat._id !== undefined,

      onError: (error) => {
        showNotification?.(error.response.data?.message, { type: "error" });
      },
      onSuccess: (data) => {
        setMessages(data.data);
      },
    }
  );

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const found = chat?.users.some(
      (item) => item._id === arrivalMessage?.sender._id
    );
    console.log("Found", found);
    arrivalMessage && found && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, chat]);
  const { mutate, isLoading: isPosting } = useMutation(postMessages, {
    onError: (error) => {
      showNotification?.(error.response.data.errors[0], { type: "error" });
    },
    onSuccess: (data) => {
      socketRef.current.emit("sendMessage", data.data);
      setMessage("");

      setMessages([...messages, data.data]);
    },
  });
  const onSubmit = () => {
    if (message) {
      const payload = {
        content: message,
        chatId: chat._id,
        userId: decodedUser.id,
      };
      mutate(payload);
    }
  };
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            width: { xs: "100%" },
            display: "flex",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: { xs: "100%" },
              display: { xs: !showDrop ? "block" : "none", md: "block" },
              maxHeight: "100vh",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "12vh",
                backgroundColor: "white",
                position: "sticky",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                top: 0,
                borderBottom: "1px solid #E6E6E6",
              }}
            >
              <Box sx={{ display: "flex", p: 5 }}>
                <Box>
                  <img
                    src={chatData[0].userDetails.profilePicture}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                    }}
                    alt=""
                  />
                </Box>
                <Box ml={2}>
                  <Typography variant="h6" color="black">
                    {chatData[0].userDetails.lastName}{" "}
                    {chatData[0].userDetails.firstName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active
                  </Typography>
                </Box>
              </Box>
              <Close
                sx={{
                  color: "black",
                  cursor: "pointer",
                  mr: 5,
                  display: { xs: "block", md: "none" },
                }}
                onClick={onClose}
              />
            </Box>
            <Box
              sx={{
                overflow: "auto",
                maxHeight: { xs: "65.5vh", md: "77.5vh" },
              }}
            >
              {messages.map((item) => {
                return (
                  <Box ref={scrollRef}>
                    <MainMessage message={item} />
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                width: "100%",
                minHeight: "10vh",
                backgroundColor: "white",
                position: "sticky",
                borderTop: "1px solid #E6E6E6",
                display: "flex",

                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pl: 3,
                  pr: 3,
                  pt: 3,
                  pb: 3,
                }}
              >
                <Box sx={{ width: "90%" }}>
                  <TextField
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    multiline
                    placeholder="Type Your Message"
                    fullWidth
                    sx={{
                      color: "black",
                      border: "none",
                      borderColor: "",
                      outline: "none",
                      background: "#F5F5F6",
                      borderRadius: "5px",
                      "& .MuiInputBase-input": {
                        outline: "none",
                        borderRadius: "3px",
                        border: "none",
                        borderColor: "",

                        color: "#000",
                      },
                      "& .MuiInputBase-input:hover": {
                        border: "none",
                        borderColor: "",

                        outline: "none",
                        borderRadius: "5px",
                        color: "#000",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "red !important",
                        background: "#fff",
                        width: "100%",
                        margin: 0,
                        border: "none",
                        borderColor: "",
                      },
                      "& .Mui-active": {
                        border: "none",
                        borderColor: "",
                        borderRadius: "5px",
                      },
                      "& .Mui-focused": {
                        border: "none",
                        borderColor: "",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          border: "none",
                          borderColor: "", // Change the border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                          borderColor: "", // Change the border color when active/focused
                        },
                      },
                    }}
                  />
                </Box>
                <Box ml={2}>
                  {isPosting ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Send
                      color={message ? "primary" : "disabled"}
                      sx={{ cursor: message && "pointer" }}
                      onClick={onSubmit}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleMessage;
