import {
  ChatBubbleOutline,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import CreatePost from "../../components/CreatePost";
import Comments from "../../components/Comments";
import Scheduler from "../Consultant/components/Scheduler";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchPosts, likePost } from "../Patient/services/patientService";
import { useAlert } from "../../context/NotificationProvider";
import { getDecodedJwt } from "../../utils/auth";
import { formatDate } from "../../utils/formatDate";
import ImageView from "../Patient/components/ImageView";
import "../../styles/global.css";

const Feed = () => {
  const [createPost, setCreatePost] = useState(false);

  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const [comments, setComments] = useState(null);
  const [images, setImages] = useState(null);
  const { isLoading, data } = useQuery(["posts"], fetchPosts, {
    onError: (error) => {
      showNotification?.(
        error.response?.data?.message ||
          error.response?.data?.name ||
          error.message,
        {
          type: "error",
        }
      );
    },
  });

  const handleErrors = (error) => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 400)
    ) {
      // Handle the 500 error here
      showNotification?.(
        error?.response?.data?.message ||
          error.response?.data?.name ||
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
          error.response?.data?.name ||
          error?.message ||
          error?.error ||
          "An error occurred",
        {
          type: "error",
        }
      );
    }
  };
  const queryClient = useQueryClient();

  const { mutate, isLoading: isLiking } = useMutation(likePost, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      queryClient.resetQueries("posts");

      showNotification?.("Post Liked Successfully", {
        type: "success",
      });
    },
  });
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
                }}
              >
                <img
                  src={decodedUser?.profilePicture}
                  alt=""
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
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

          {isLoading
            ? [1, 2, 3].map(() => {
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
                      <Skeleton variant="circular" width={50} height={50} />
                      <Box
                        sx={{
                          ml: 3,
                          width: "100%",
                        }}
                      >
                        <Skeleton variant="text" width={"70%"} height={30} />{" "}
                        <Skeleton variant="text" width={"40%"} height={30} />
                      </Box>
                    </Box>

                    <Box sx={{ padding: "0 20px" }}>
                      <Box mb={2}>
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={400}
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
                        <Typography variant="caption" color="darkgray">
                          <Skeleton variant="text" width={100} height={30} />
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="caption" color="darkgray">
                          <Skeleton variant="text" width={100} height={30} />
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
                        <Skeleton variant="text" width={100} height={30} />
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
                        <Skeleton variant="text" width={100} height={30} />
                      </Box>
                    </Box>
                  </Box>
                );
              })
            : data?.posts?.map((item) => {
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
                        }}
                      >
                        <img
                          src={item.user.profilePicture}
                          alt=""
                          width="50px"
                          height="50px"
                          style={{
                            borderRadius: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          ml: 3,
                        }}
                      >
                        <Typography variant="h6" color="#87B7C7">
                          {item.user?.lastname} {item.user.firstname}
                        </Typography>
                        <Typography variant="caption" color="#87B7C7">
                          {formatDate(item.createdAt)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ padding: "0 20px" }}>
                      <Box mb={2}>
                        <Typography
                          variant="caption"
                          sx={{
                            wordBreak: "break-all",
                            height: "auto",
                            width: "100%",
                          }}
                        >
                          <pre
                            style={{
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {item.text}
                          </pre>
                        </Typography>
                      </Box>
                      <Divider />
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        position: "relative",
                      }}
                      className="hovered_body"
                      onClick={() => setImages(item.images)}
                    >
                      <Box
                        className="target"
                        sx={{
                          backgroundColor: "rgba(128, 128, 128, 0.5)",
                          position: "absolute",
                          right: "0",
                          width: "100%",
                          height: "100%",
                        }}
                      ></Box>
                      {item.images.length - 5 > 0 && (
                        <Box
                          sx={{
                            backgroundColor: "rgba(128, 128, 128, 0.8)",
                            position: "absolute",
                            right: "0",
                            width: "150px",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ color: "white", fontSize: "3rem" }}>
                            +{item.images.length - 5}
                          </Typography>
                        </Box>
                      )}
                      <Grid container sx={{ width: "100%" }} spacing={0.5}>
                        {item.images.slice(0, 5).map((v, index, array) => {
                          if (index === 3 && array.length === 4) {
                            return (
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  cursor: "pointer",
                                  height: { xs: "300px", md: "500px" },
                                }}
                              >
                                <img
                                  src={v}
                                  style={{ objectFit: "cover" }}
                                  alt="Img"
                                  width="100%"
                                  height="100%"
                                />
                              </Grid>
                            );
                          }
                          if (
                            (index === 4 || index === 3) &&
                            array.length === 5
                          ) {
                            return (
                              <Grid
                                item
                                xs={6}
                                sx={{
                                  cursor: "pointer",
                                  height: { xs: "300px", md: "500px" },
                                }}
                              >
                                <img
                                  src={v}
                                  style={{ objectFit: "cover" }}
                                  alt="Img"
                                  width="100%"
                                  height="100%"
                                />
                              </Grid>
                            );
                          }
                          if (array.length < 4) {
                            return (
                              <Grid
                                item
                                xs={12 / array.length}
                                sx={{
                                  cursor: "pointer",
                                  height: { xs: "300px", md: "500px" },
                                }}
                              >
                                <img
                                  src={v}
                                  style={{ objectFit: "cover" }}
                                  alt="Img"
                                  width="100%"
                                  height="100%"
                                />
                              </Grid>
                            );
                          }
                          if (array.length >= 4) {
                            return (
                              <Grid
                                item
                                xs={4}
                                sx={{
                                  cursor: "pointer",
                                  height: { xs: "300px", md: "500px" },
                                }}
                              >
                                <img
                                  src={v}
                                  style={{ objectFit: "cover" }}
                                  alt="Img"
                                  width="100%"
                                  height="100%"
                                />
                              </Grid>
                            );
                          }
                          return (
                            <Grid
                              item
                              xs={12 / array.length}
                              sx={{
                                cursor: "pointer",
                                height: { xs: "300px", md: "500px" },
                              }}
                            >
                              <img
                                src={v}
                                style={{ objectFit: "cover" }}
                                alt="Img"
                                width="100%"
                                height="100%"
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
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
                        <ThumbUpAlt
                          sx={{ color: "#87B7C7", fontSize: "22px" }}
                        />
                        <Typography variant="caption" color="darkgray">
                          {item.likes.length > 999
                            ? item.likes.length?.toString().slice(0, 1)
                            : item.likes.length !== 0
                            ? item.likes.length
                            : ""}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="caption" color="darkgray">
                          {item.comments.length > 999
                            ? item.comments.length?.toString().slice(0, 1)
                            : item.comments.length !== 0
                            ? item.comments.length
                            : 0}{" "}
                          Comment{item.comments.length > 1 && "s"}
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
                        onClick={() => {
                          const hasLiked = item?.likes?.find(
                            (item) => item?.user?.toString() === decodedUser._id
                          );
                          if (!hasLiked) {
                            const payload = {
                              userId: decodedUser._id,
                              id: item._id,
                            };
                            mutate(payload);
                          }
                        }}
                      >
                        <Box>
                          {item.likes.find(
                            (item) => item?.user?.toString() === decodedUser._id
                          ) ? (
                            <ThumbUpAlt
                              sx={{ color: "#87B7C7", fontSize: "22px" }}
                            />
                          ) : (
                            <ThumbUpAltOutlined
                              sx={{ color: "darkgray", fontSize: "22px" }}
                            />
                          )}
                        </Box>
                        <Typography variant="caption" color="darkgray" ml={2}>
                          Like
                        </Typography>
                      </Box>
                      <Box
                        onClick={() => {
                          console.log(item._id);
                          setComments(item._id);
                        }}
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
      <Comments
        open={Boolean(comments)}
        post={comments}
        onClose={() => setComments(null)}
      />
      {images && <ImageView images={images} onClick={() => setImages(null)} />}
    </>
  );
};

export default Feed;
