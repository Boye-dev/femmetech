import { ChatBubbleOutline, Message } from "@mui/icons-material";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React from "react";
import Chat from "../components/Messages/Chat";
import SingleMessage from "../components/Messages/SingleMessage";
import { useAlert } from "../../../context/NotificationProvider";
import { getDecodedJwt } from "../../../utils/auth";
import { useQuery } from "react-query";
import { fetchChats } from "../services/doctorService";
import { useState } from "react";

const Messages = () => {
  const { showNotification } = useAlert();
  const [chat, setChat] = useState();
  const decodedUser = getDecodedJwt();
  const [showDrop, setShowdrop] = useState(true);

  const { isLoading, data } = useQuery(
    ["chats", { userId: decodedUser.id }],
    fetchChats,
    {
      enabled: decodedUser.id !== null || decodedUser.id !== undefined,

      onError: (error) => {
        showNotification?.(error.response.data?.message, { type: "error" });
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              height: { xs: "87.6vh", md: "100vh" },
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "100%",
                overflow: "auto",
                width: { xs: "100%", md: "400px" },
                display: { xs: showDrop ? "block" : "none", md: "block" },
                backgroundColor: "white",
              }}
            >
              <Box p={5}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100px",
                    width: "100%",
                  }}
                >
                  <Typography variant="h3" sx={{ color: "black" }}>
                    Messages
                  </Typography>
                  <Message color="primary" />
                </Box>
                <TextField placeholder="Search" />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 3,
                    mb: 3,
                    position: "sticky",
                    top: "0",
                    p: 3,
                    backgroundColor: "white",
                  }}
                >
                  <ChatBubbleOutline fontSize="2px" />
                  <Typography variant="h6" color="black" ml={2}>
                    All Messages
                  </Typography>
                </Box>
                {isLoading ||
                  data.data.map((item) => {
                    return (
                      <Chat
                        chat={item}
                        onClick={() => {
                          setChat(item);
                          setShowdrop(false);
                          // socketRef.current.join(item._id);
                        }}
                      />
                    );
                  })}
              </Box>
            </Box>
            {chat && (
              <SingleMessage
                chat={chat}
                showDrop={showDrop}
                onClose={() => setShowdrop(true)}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Messages;
