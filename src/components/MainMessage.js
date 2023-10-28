import { Box, Typography } from "@mui/material";
import React from "react";
import { getDecodedJwt } from "../utils/auth";
import { formatDate } from "../utils/formatDate";

const MainMessage = ({ message }) => {
  const decodedUser = getDecodedJwt();

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems:
            decodedUser._id === message?.sender?._id
              ? "flex-end"
              : "flex-start",
        }}
      >
        {message?.content?.text && (
          <Box sx={{ display: "flex" }}>
            {decodedUser._id === message?.sender?._id && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "right",
                    mr: 2,
                    fontSize: "10px !important",
                    color: "#555555",
                  }}
                >
                  {formatDate(message?.createdAt)}
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                maxWidth: "300px",
                minWidth: "auto",
                height: "auto",
                mb: 5,
                backgroundColor:
                  decodedUser._id === message?.sender?._id
                    ? "#87B7C7"
                    : "#E6E6E6",
                borderRadius: "7px",
                p: 2,
                mr: decodedUser.sender === message?.sender?._id || 2,
                ml: decodedUser.sender === message?.sender?._id && 2,
              }}
            >
              <Typography
                sx={{
                  color:
                    decodedUser._id === message?.sender?._id
                      ? "white"
                      : "black",
                }}
              >
                {message?.content?.text}
              </Typography>
            </Box>
            {decodedUser._id === message?.sender?._id || (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "right",

                    fontSize: "10px !important",
                    color: "#555555",
                  }}
                >
                  {formatDate(message?.createdAt)}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {message?.content?.files?.map((item) => {
          if (item.filetype?.startsWith("image/")) {
            return (
              <Box sx={{ display: "flex" }}>
                {decodedUser._id === message?.sender?._id && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        textAlign: "right",
                        mr: 2,
                        fontSize: "10px !important",
                        color: "#555555",
                      }}
                    >
                      {formatDate(message?.createdAt)}
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    backgroundColor:
                      decodedUser._id === message?.sender?._id
                        ? "#87B7C7"
                        : "#E6E6E6",
                    borderRadius: "7px",
                    maxWidth: "300px",
                    height: "300px",
                    mb: 5,
                    p: 2,
                    mr: decodedUser.sender === message?.sender?._id || 2,
                    ml: decodedUser.sender === message?.sender?._id && 2,
                  }}
                >
                  <img
                    src={item.url}
                    alt="pic"
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                {decodedUser._id === message?.sender?._id || (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        textAlign: "right",

                        fontSize: "10px !important",
                        color: "#555555",
                      }}
                    >
                      {formatDate(message?.createdAt)}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          }
        })}
      </Box>
    </>
  );
};

export default MainMessage;
