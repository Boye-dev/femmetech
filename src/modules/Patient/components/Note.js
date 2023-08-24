import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";

const Note = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setContent(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          p: 5,
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            mb: 5,
          }}
        >
          <Button variant="contained" sx={{ color: "white" }}>
            Save
          </Button>
        </Box>
        <Box
          sx={{
            minHeight: "80vh",
            width: { xs: "100%", md: "80%" },
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px 1px lightgray",
          }}
        >
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
              placeholder="Type something..."
              onChange={handleInputChange}
              rows={1}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Note;
