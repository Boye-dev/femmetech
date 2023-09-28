import { Close, Collections, Delete } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  Tooltip,
  Grid,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { getDecodedJwt } from "../utils/auth";
import { forEach } from "lodash";
import { useAlert } from "../context/NotificationProvider";
import { useMutation, useQueryClient } from "react-query";
import { createPost } from "../modules/Patient/services/patientService";
import { LoadingButton } from "@mui/lab";

const CreatePost = ({ open, onClose }) => {
  const [content, setContent] = useState("");
  const [selectedFiles, setFiles] = useState([]);
  const textareaRef = useRef(null);
  const decodedUser = getDecodedJwt();
  const handleErrors = (error) => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 400)
    ) {
      // Handle the 500 error here
      showNotification?.(
        error?.response?.data?.message ||
          error?.response?.data?.errors[0] ||
          "Internal Server Error",
        {
          type: "error",
        }
      );
    } else {
      // Handle other errors
      console.log(error);
      showNotification?.(
        error?.response?.data?.errors[0] ||
          error?.response?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred",
        {
          type: "error",
        }
      );
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setContent(value);
    // Auto-adjust textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileSelect = (e) => {
    let files = Array.from(e.target.files);

    for (let file of files) {
      console.log(file.type);

      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
        console.log("It is an image", file);
      } else {
        console.log("It is not an image", file);
      }
    }
  };
  const deleteFile = (file) => {
    console.log(file.name);
    const filteredFiles = selectedFiles.filter(
      (item) => item.name !== file.name
    );
    setFiles(filteredFiles);
  };
  const { showNotification } = useAlert();

  const createPosts = () => {
    const formData = new FormData();

    if (content) {
      console.log(content);
      formData.append("text", content);
      formData.append("user", decodedUser._id);

      for (let file of selectedFiles) {
        formData.append("files", file);
      }
      mutate(formData);
    }
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createPost, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      setContent("");
      setFiles([]);
      queryClient.resetQueries("posts");
      showNotification?.("Post Created Successfully", {
        type: "success",
      });
      onClose();
    },
  });
  const renderSelectedFiles = () => {
    return selectedFiles.map((file, index) => {
      let xs;
      if (selectedFiles.length > 6 && index >= selectedFiles - 2) {
        xs = 6;
      } else {
        xs = 12 / Math.min(2, selectedFiles.length);
      }
      return (
        <Grid
          item
          xs={xs}
          key={index}
          sx={{ width: "50%", position: "relative" }}
        >
          <Box
            onClick={() => deleteFile(file)}
            sx={{
              position: "absolute",
              top: "-5px",
              right: "0",
              backgroundColor: "white",
              borderRadius: "100%",
              padding: "3px",
              cursor: "pointer",
              zIndex: "500",
            }}
          >
            <Delete sx={{ color: "red", fontSize: "15px" }} />
          </Box>
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              width="100%"
              height="200"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <video
              controls
              width="100%"
              height="200"
              style={{ objectFit: "cover" }}
            >
              <source src={URL.createObjectURL(file)} type={file.type} />{" "}
            </video>
          )}
        </Grid>
      );
    });
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
              }}
            >
              <img
                src={decodedUser.profilePicture}
                alt=""
                width="50px"
                height="50px"
                style={{
                  borderRadius: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                ml: 3,
              }}
            >
              <Typography variant="h6" color="#87B7C7">
                {decodedUser?.lastname} {decodedUser?.firstname}
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
            {selectedFiles.length === 0 || (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                }}
              >
                <Grid
                  container
                  spacing={0.5}
                  sx={{
                    width: "100%",
                    padding: "5px",
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    display: "flex",
                  }}
                >
                  {renderSelectedFiles()}
                </Grid>
              </Box>
            )}
          </Box>
          <Box>
            <Box
              sx={{
                padding: "10px 20px 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LoadingButton
                loading={isLoading}
                fullWidth
                variant="contained"
                sx={{ color: "white" }}
                onClick={createPosts}
              >
                Post
              </LoadingButton>

              <Tooltip title="Add Image" sx={{ cursor: "pointer", ml: 2 }}>
                <>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .gif, .png, .mp4, .avi, .mkv, .mov, .webm"
                    style={{ display: "none" }}
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                  <Collections onClick={handleUploadClick} />
                </>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default CreatePost;
