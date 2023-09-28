import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { getDecodedJwt } from "../../../utils/auth";
import { useState } from "react";
import { useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import { useContext } from "react";
import { FemmetechContext } from "../../../context/FemmetechContext";

const GroupChat = ({ onClick, chat }) => {
  const decodedUser = getDecodedJwt();
  const { latestMessage, typing } = useContext(FemmetechContext);
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});
  const [lastMessages, setLastMessages] = useState(new Map());

  useEffect(() => {
    const otherUser = chat.members.find(
      (v) => v?.user?._id !== decodedUser._id
    );
    if (chat.isGroupChat) {
    }

    const mainUser = chat.members.find((v) => v?.user?._id === decodedUser._id);
    setUser(mainUser);
    setOtherUser(otherUser);
  }, [chat]);

  useEffect(() => {
    setLastMessages((prev) => {
      const updatedLastMessages = new Map(prev);

      if (!updatedLastMessages.has(latestMessage?.chat)) {
        updatedLastMessages.set(latestMessage?.chat, []);
      }

      updatedLastMessages.get(latestMessage?.chat).unshift(latestMessage);

      return updatedLastMessages;
    });
  }, [latestMessage]);

  return (
    <>
      <Box sx={{ cursor: "pointer" }} onClick={() => onClick(chat)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: "50px",
                height: "50px",
              }}
            >
              <img
                src={otherUser?.user?.profilePicture}
                alt=""
                width="50px"
                height="50px"
                style={{
                  borderRadius: "100%",
                }}
              />
            </Box>
            <Box ml={2}>
              <Typography variant="h6" color="black">
                {chat?.groupName}
              </Typography>
              <Typography
                sx={{
                  color: "black",
                }}
                variant="caption"
              >
                {(lastMessages?.get(chat._id) &&
                  lastMessages
                    ?.get(chat._id)[0]
                    .content?.text?.substring(0, 15)) ||
                  chat?.lastmessage?.substring(0, 15)}
                {(lastMessages?.get(chat._id) &&
                  lastMessages?.get(chat._id)[0].content?.text?.length > 15 &&
                  "...") ||
                  (chat?.lastmessage?.length > 15 && "...")}
              </Typography>
            </Box>
          </Box>
          <Box alignItems="flex-end" display="flex" flexDirection="column">
            <Typography variant="caption" sx={{}} color="text.secondary">
              {formatDate(latestMessage?.createdAt || chat?.updatedAt)}
            </Typography>
            <Typography variant="caption" sx={{}} color="green">
              {typing?.chatId === chat._id &&
                typing?.typing &&
                `${typing?.sender.firstname} is typing...`}
            </Typography>
            {user?.unread > 0 && (
              <Box
                sx={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "100%",
                  backgroundColor: "#87B7C7",
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
                  {user?.unread}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Divider sx={{ margin: "10px 0" }} />
      </Box>
    </>
  );
};

export default GroupChat;
