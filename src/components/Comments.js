import {
  ChatBubbleOutline,
  Close,
  Collections,
  Send,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  Tooltip,
  TextField,
} from "@mui/material";
import React from "react";

const Comments = ({ open, onClose, id }) => {
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
            height: "auto",
            pt: 4,
          }}
        >
          <Box
            sx={{ position: "sticky", top: 0, backgroundColor: "white", pt: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box sx={{ width: "85%", textAlign: "center" }}>
                <Typography variant="h4">Oyelola Adeboye's Post</Typography>
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
          </Box>
          <Box sx={{}}>
            <Box
              sx={{
                width: "100%",
                height: "auto",
                padding: "20px 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  padding: "0 20px",
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
                  <Typography variant="caption" color="#87B7C7">
                    5d
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ padding: "0 20px" }}>
                <Box mb={2}>
                  <Typography variant="caption">
                    Lorem ipsun dollor called dell ahripsun dollor called dell
                    ahripsun dollor called dell ahripsun dollor called dell
                    ahripsun dollor called dell ahripsun dollor called dell
                    ahripsun dollor called dell ahripsun dollor called dell ahr.
                  </Typography>
                </Box>
                <Divider />
              </Box>
              <Box>
                <Box sx={{ width: "100%" }}>
                  <img
                    src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
                    alt="Img"
                    width="100%"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  mt: 2,
                  padding: "0 20px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ThumbUpAlt sx={{ color: "#87B7C7", fontSize: "22px" }} />
                  <Typography variant="caption" color="darkgray">
                    2K
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="caption" color="darkgray">
                    2K comments
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  padding: "0 20px",
                }}
              >
                <Divider />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  mt: 2,
                  padding: "0 20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Box>
                    {/* <ThumbUpAlt sx={{ color: "#87B7C7", fontSize: "22px" }} /> */}
                    <ThumbUpAltOutlined
                      sx={{ color: "darkgray", fontSize: "22px" }}
                    />
                  </Box>
                  <Typography variant="caption" color="darkgray" ml={2}>
                    Like
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Box>
                    <ChatBubbleOutline
                      sx={{ color: "darkgray", fontSize: "22px" }}
                    />
                  </Box>
                  <Typography variant="caption" color="darkgray" ml={2}>
                    Comment
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ padding: "10px" }}>
                {[1, 2, 4].map(() => {
                  return (
                    <Box sx={{ display: "flex", mb: 3 }}>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100%",
                          border: "1px solid black",
                        }}
                      ></Box>

                      <Box
                        sx={{
                          maxWidth: "70%",
                          backgroundColor: "#F0F2F5",
                          borderRadius: "10px",
                          ml: 3,
                          p: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{ fontSize: "11px !important" }}
                          >
                            Oyelola Adeboye.
                          </Typography>
                          <Typography
                            color="text.primary"
                            sx={{ fontSize: "10px !important", ml: 1 }}
                          >
                            5d
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ wordWrap: "break-word !important" }}
                        >
                          Hellos
                          HellosHellosHellosHellosHellosHellosHellosHellosHellos
                          HellosHellosHellosHellos HellosHellosHellosHellos
                          HellosHellosHellosHellos
                          HellosHellosHellosHellosHellosHellosHellosHellos
                          HellosHellosHellosHellos
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid lightgray",
              position: "sticky",
              bottom: 0,
              backgroundColor: "white",
              pt: 4,
              maxHeight: "300px",
              overflow: "auto",
              pl: 3,
            }}
          >
            <Box sx={{ display: "flex", mb: 3, alignItems: "center" }}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  border: "1px solid black",
                }}
              ></Box>

              <Box
                sx={{
                  maxWidth: "80%",
                  minWidth: "calc(100% - 120px)",

                  borderRadius: "10px",
                  ml: 3,
                  p: 2,
                }}
              >
                <TextField
                  sx={{
                    "& .MuiInputBase-input": {
                      outline: "none !important",
                      border: "none !important",
                      color: "black !important",
                      fontSize: "14px !important",
                    },
                  }}
                  multiline
                  size="small"
                  placeholder="Write a comment..."
                  fullWidth
                />
              </Box>
              <Box width="30px" pr={2}>
                <Send sx={{ cursor: "pointer" }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Comments;
