import {
  ChatBubbleOutline,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import CreatePost from "../../components/CreatePost";
import Comments from "../../components/Comments";

const Feed = () => {
  const [createPost, setCreatePost] = useState(false);
  const [comments, setComments] = useState(false);
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          minHeight: "100vh",
          marginTop: "20px",
        }}
      >
        <Box sx={{ pl: 5, pr: 5 }}>
          <Box
            sx={{
              width: "100%",
              height: "100px",
              borderRadius: "8px",
              backgroundColor: "white",
              padding: "20px 0",
              boxShadow: "1px 1px 5px 0.5px #C0C0C0",
              mb: 10,
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
                onClick={() => setCreatePost(true)}
                sx={{
                  width: "calc(100% - 60px)",
                  height: "40px",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "20px",
                  cursor: "pointer",
                  ml: 3,
                  display: "flex",
                  alignItems: "center",
                  pl: 5,
                }}
              >
                <Typography variant="caption" color="#87B7C7">
                  Create a new post oyelola?
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
          {[1, 2, 4, 5].map((item) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  padding: "20px 0",
                  boxShadow: "1px 1px 5px 0.5px #C0C0C0",
                  mb: 8,
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
                      ahripsun dollor called dell ahripsun dollor called dell
                      ahr.
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
                    onClick={() => setComments(true)}
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
            );
          })}
        </Box>
      </Box>
      <CreatePost open={createPost} onClose={() => setCreatePost(false)} />
      <Comments open={comments} onClose={() => setComments(false)} id={"123"} />
    </>
  );
};

export default Feed;
