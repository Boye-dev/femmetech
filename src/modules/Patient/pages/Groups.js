import { Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import Chat from "../components/Chat";
import { Group } from "@mui/icons-material";
import SingleGroup from "../components/SingleGroup";
import { useState } from "react";
import JoinGroup from "../../../components/JoinGroup";
import { getDecodedJwt } from "../../../utils/auth";
import { FemmetechContext } from "../../../context/FemmetechContext";
import { useQuery } from "react-query";
import { fetchGroups } from "../services/patientService";
import { useEffect } from "react";
import GroupChat from "../components/GroupChat";

const Groups = () => {
  const [showDrop, setShowdrop] = useState(true);
  const [chat, setChat] = useState();
  const [join, setJoin] = useState(false);
  const decodedUser = getDecodedJwt();
  const { socketRef } = useContext(FemmetechContext);

  const { data: groups, isLoading: isLoadingChats } = useQuery(
    ["groups", { userId: decodedUser._id }],
    fetchGroups
  );
  const leaveRoom = () => {
    console.log("Leaving", chat, decodedUser);
    if (chat) {
      socketRef.emit("leaveRoom", {
        chatId: chat._id,
        userId: decodedUser && decodedUser._id,
      });
    }
  };

  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, [chat]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)",
          display: { xs: "block", md: "flex" },
        }}
      >
        <Box
          sx={{
            width: { xs: "auto", md: "300px" },
            height: { xs: "100%", md: "87%" },
            overflow: "auto",

            backgroundColor: "white",
            position: { xs: "", md: "fixed" },
            left: { xs: "0", md: "321px" },
            top: "55px",
            p: 5,
          }}
        >
          <Box
            mt={4}
            sx={{
              position: "sticky",
              top: { xs: "-20px", md: "-22px" },
              backgroundColor: "white",
              pt: 5,
              pb: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Group sx={{ color: "#87B7C7" }} />
                <Typography variant="h6">My Groups</Typography>
              </Box>

              {/* <Box
                onClick={() => setJoin(true)}
                sx={{
                  width: "100px",
                  height: "30px",
                  backgroundColor: "#87B7C7",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  p: 1,
                  cursor: "pointer",
                }}
              >
                <Typography color="white" variant="caption">
                  Join a group
                </Typography>
              </Box> */}
            </Box>
            <Box mb={4}>
              <TextField
                placeholder="Search"
                size="small"
                //   value={search}
                //   onChange={(e) => setSearch(e.target.value)}

                fullWidth
              />
            </Box>
          </Box>
          <Box sx={{ height: "100%", pb: 5 }}>
            {groups?.groups?.map((item) => {
              return (
                <GroupChat
                  chat={item}
                  onClick={(chat) => {
                    setChat(chat);
                    socketRef.emit("leaveRoom", {
                      chatId: chat._id,
                      userId: decodedUser._id,
                    });
                    socketRef.emit("joinRoom", {
                      chatId: chat._id,
                      userId: decodedUser._id,
                    });

                    setShowdrop(false);
                  }}
                />
              );
            })}
          </Box>
        </Box>
        <SingleGroup
          showDrop={showDrop}
          chat={chat}
          onClose={() => {
            socketRef.emit("leaveRoom", {
              chatId: chat._id,
              userId: decodedUser._id,
            });
            setChat(null);
            setShowdrop(true);
          }}
        />
        <JoinGroup open={join} onClose={() => setJoin(false)} />
      </Box>
    </>
  );
};

export default Groups;
