import { Close, Send } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import MainMessage from "./MainMessage";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createMessage,
  fetchMessages,
} from "../modules/Patient/services/patientService";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { getDecodedJwt } from "../utils/auth";
import { useAlert } from "../context/NotificationProvider";
import { FemmetechContext } from "../context/FemmetechContext";

const SingleMessage = ({ showDrop, onClose, chat }) => {
  const decodedUser = getDecodedJwt();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {
    socketRef,
    message: newMessage,
    typing,
  } = useContext(FemmetechContext);

  const { data, isLoading: isLoadingMessages } = useQuery(
    ["messages", { chatId: chat?._id }],
    fetchMessages,
    {
      enabled: Boolean(chat),
      onSuccess: (data) => {
        setMessages(data);
      },
    }
  );

  useEffect(() => {
    setMessages([...messages, newMessage]);
  }, [newMessage]);
  const scrollRef = useRef();
  const [user, setUser] = useState({});
  const [receiverIds, setReceiverIds] = useState([]);
  useEffect(() => {
    const otherUser = chat?.members?.find(
      (v) => v?.user?._id !== decodedUser._id
    );
    const receivers = chat?.members
      ?.filter((user) => user?.user?._id !== decodedUser._id)
      .map((v) => v.user._id);

    setReceiverIds(receivers);
    setUser(otherUser);
  }, [chat]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const queryClient = useQueryClient();
  const { showNotification } = useAlert();

  const handleErrors = (error) => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 400)
    ) {
      // Handle the 500 error here
      showNotification?.(
        error?.response?.data?.message ||
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
          error?.message ||
          error?.error ||
          "An error occurred",
        {
          type: "error",
        }
      );
    }
  };
  const { mutate, isLoading } = useMutation(createMessage, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      // queryClient.resetQueries("chats");

      setMessage("");
      setMessages([...messages, data]);
      const otherUsers = chat?.members
        ?.filter((v) => v?.user?._id !== decodedUser._id)
        .map((user) => user.user._id);
      socketRef.emit("sendMessage", {
        chatId: chat._id,
        senderId: decodedUser._id,
        receiverIds: otherUsers,
        message: data,
      });
      showNotification?.("Message sent Successfully", {
        type: "success",
      });
    },
  });
  const onSubmit = () => {
    const formData = new FormData();
    // setMess;
    formData.append("text", message);
    formData.append("sender", decodedUser._id);

    mutate({ formData, chat: chat?._id });
  };
  return (
    <>
      {chat && (
        <Box
          sx={{
            width: { xs: "100%", md: "calc(100% - 270px)" },
            height: "calc(100vh - 50px)",
            display: { xs: !showDrop ? "block" : "none", md: "block" },
            position: { xs: "fixed", md: "" },
            top: "55px",
            backgroundColor: { xs: "white", md: "#F8F8F8" },
            marginLeft: { xs: "0px", md: "300px" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              backgroundColor: { xs: "white", md: "#F8F8F8" },

              position: "sticky",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              top: 0,
              borderBottom: "1px solid #E6E6E6",
            }}
          >
            <Box sx={{ display: "flex", p: 5 }}>
              <Box></Box>
              <Box ml={2}>
                <Typography variant="h6" color="black">
                  {user?.user?.lastname} {user?.user?.firstname}
                </Typography>
                <Typography variant="h6" color="green">
                  {typing?.typing && "typing..."}
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
              width: { xs: "100%", md: "calc(100% - 400px)" },

              overflow: "auto",
              height: { xs: "60vh", md: "69vh" },
            }}
          >
            {isLoadingMessages ||
              messages?.map((message) => {
                return (
                  <Box ref={scrollRef}>
                    <MainMessage message={message} />
                  </Box>
                );
              })}
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "calc(100% - 400px)" },

              minHeight: "10vh",

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
              <Box sx={{ width: "100%" }}>
                <TextField
                  size="small"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);

                    socketRef.emit("typing", {
                      receiverIds: receiverIds,
                      sender: decodedUser,
                    });
                    let lastTypingTime = new Date().getTime();
                    var timerLength = 3000;
                    setTimeout(() => {
                      var timeNow = new Date().getTime();
                      var timeDiff = timeNow - lastTypingTime;
                      if (timeDiff >= timerLength) {
                        socketRef.emit("stopTyping", {
                          receiverIds: receiverIds,
                          sender: decodedUser,
                        });
                      }
                    }, timerLength);
                  }}
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
                <Send
                  sx={{ color: "#87B7C7", cursor: "pointer" }}
                  color={message ? "primary" : "disabled"}
                  onClick={onSubmit}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleMessage;
