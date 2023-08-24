import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import Chat from "../Patient/components/Chat";
import { Group } from "@mui/icons-material";
import SingleMessage from "../../components/SingleMessage";
import { useState } from "react";
import JoinMessage from "../../components/JoinMessage";

const Messages = () => {
  const [showDrop, setShowdrop] = useState(true);
  const [chat, setChat] = useState();
  const [join, setJoin] = useState(false);

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
                <Typography variant="h6">My Messages</Typography>
              </Box>

              <Box
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
                  Start a chat
                </Typography>
              </Box>
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
            {[1, 2, 34, 5, 6, 7, 8, , 9, 8, 75, 43, 234, 5, 6].map((item) => {
              return (
                <Chat
                  onClick={() => {
                    setChat("chat");
                    setShowdrop(false);
                  }}
                />
              );
            })}
          </Box>
        </Box>
        <SingleMessage
          showDrop={showDrop}
          onClose={() => {
            setShowdrop(true);
          }}
        />
        <JoinMessage open={join} onClose={() => setJoin(false)} />
      </Box>
    </>
  );
};

export default Messages;
