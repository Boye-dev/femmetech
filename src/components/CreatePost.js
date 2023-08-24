import { Close, Collections } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";

const CreatePost = ({ open, onClose }) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setContent(value);
    // Auto-adjust textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            p: 0,
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "330px", md: "500px" },
            height: "auto",
            pt: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ width: "85%", textAlign: "center" }}>
              <Typography variant="h4">Create Post</Typography>
            </Box>
            <Box sx={{ width: "5%", textAlign: "center" }}>
              <Box
                onClick={onClose}
                sx={{
                  backgroundColor: "lightgray",
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Close />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 3,
              padding: "0 20px 10px",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
                border: "1px solid black",
              }}
            ></Box>
            <Box
              sx={{
                ml: 3,
              }}
            >
              <Typography variant="h6" color="#87B7C7">
                Oyelola Adeboye Samuel
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              maxHeight: "calc(70vh - 170px)",
              overflowY: "auto",
              width: "100%",
            }}
          >
            <Box sx={{ padding: "10px 20px" }}>
              <Box sx={{ padding: "20px" }}>
                <textarea
                  ref={textareaRef}
                  style={{
                    width: "100%",

                    resize: "none",
                    outline: "none",
                    border: "none",
                    fontFamily: "Poppins",
                  }}
                  value={content}
                  placeholder="What's on your mind, Oyelola?"
                  onChange={handleInputChange}
                  rows={1}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid lightgray",
                  borderRadius: "10px",
                }}
              >
                <img
                  src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
                  alt="Img"
                  width="100%"
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                padding: "10px 20px 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button fullWidth variant="contained" sx={{ color: "white" }}>
                Post
              </Button>
              <Tooltip title="Add Image" sx={{ cursor: "pointer", ml: 2 }}>
                <Collections />
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default CreatePost;
