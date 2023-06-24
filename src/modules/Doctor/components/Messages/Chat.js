import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { getDecodedJwt } from "../../../../utils/auth";
import { getFormattedTime } from "../../../../utils/formatDate";
import { NexusContext } from "../../../../context/NexusContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
const Chat = ({ chat, onClick }) => {
  const { latestMessage } = useContext(NexusContext);
  const [lastMessage, setLastMessage] = useState(chat?.latestMessage || "");

  useEffect(() => {
    if (latestMessage) {
      const mainChatUsers = chat.users;
      const mainChatUserArray = mainChatUsers.map((item) => item.userId);
      const latestMessageArray = latestMessage.chat.users.map(
        (item) => item.userId
      );
      console.log("Entered", JSON.stringify(mainChatUserArray));
      console.log("from received", JSON.stringify(latestMessageArray));
      console.log(
        "Is it the same",
        JSON.stringify(mainChatUserArray) === JSON.stringify(latestMessageArray)
      );
      if (
        JSON.stringify(mainChatUserArray) === JSON.stringify(latestMessageArray)
      ) {
        console.log("It is the same");
        setLastMessage(latestMessage);
      }
    }
  }, [latestMessage]);
  const decodedUser = getDecodedJwt();
  const chatData = chat.users.filter(
    (item) => item.userDetails._id !== decodedUser.id
  );
  return (
    <Box sx={{ cursor: "pointer" }} onClick={onClick}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box>
            <img
              src={chatData[0].userDetails.profilePicture}
              style={{ width: "50px", height: "50px", borderRadius: "100%" }}
              alt=""
            />
          </Box>
          <Box ml={2}>
            <Typography variant="h6" color="black">
              {chatData[0].userDetails.lastName}{" "}
              {chatData[0].userDetails.firstName}
            </Typography>
            <Typography variant="h6" color="black">
              {lastMessage?.content}
            </Typography>
          </Box>
        </Box>
        <Box alignItems="flex-end" display="flex" flexDirection="column">
          <Typography variant="h6" color="text.secondary">
            {getFormattedTime(lastMessage.updatedAt)}
          </Typography>
          <Box
            sx={{
              width: "15px",
              height: "15px",
              borderRadius: "100%",
              backgroundColor: "#F30505",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              color="white"
              sx={{ fontSize: "10px !important" }}
            >
              2
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
    </Box>
  );
};

export default Chat;
