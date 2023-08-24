import { Close, Send } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import MainGroup from "./MainGroup";

const SingleGroup = ({ showDrop, onClose }) => {
  return (
    <>
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
                Group Name
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
          <Box
          //   ref={scrollRef}
          >
            <MainGroup message={true} />
            <MainGroup />
            <MainGroup />
            <MainGroup />

            <MainGroup />
            <MainGroup />
            <MainGroup />
            <MainGroup message={true} />
            <MainGroup message={true} />
            <MainGroup message={true} />
            <MainGroup message={true} />
            <MainGroup />
            <MainGroup />
            <MainGroup />
            <MainGroup message={true} />
            <MainGroup message={true} />
            <MainGroup message={true} />
            <MainGroup message={true} />
            <MainGroup />
            <MainGroup />
            <MainGroup />
            <MainGroup message={true} />
            <MainGroup message={true} />
            <MainGroup message={true} />
          </Box>
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
                // value={message}

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
                //   color={message ? "primary" : "disabled"}

                //   onClick={onSubmit}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleGroup;
