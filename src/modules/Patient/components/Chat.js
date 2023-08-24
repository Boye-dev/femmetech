import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Chat = ({ onClick }) => {
  return (
    <>
      <Box sx={{ cursor: "pointer" }} onClick={onClick}>
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
                borderRadius: "100%",
                border: "1px solid black",
              }}
            ></Box>
            <Box ml={2}>
              <Typography variant="h6" color="black">
                Group Name
              </Typography>
              <Typography
                sx={{
                  color: "black",
                }}
                variant="caption"
              >
                last message
              </Typography>
            </Box>
          </Box>
          <Box alignItems="flex-end" display="flex" flexDirection="column">
            <Typography variant="caption" sx={{}} color="text.secondary">
              Last Message
            </Typography>
            {true && (
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
                  10
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

export default Chat;
