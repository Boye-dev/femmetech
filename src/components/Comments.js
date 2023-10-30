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
  Grid,
  Skeleton,
} from "@mui/material";
import React from "react";
import { formatDate } from "../utils/formatDate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createComment,
  fetchPost,
  likePost,
} from "../modules/Patient/services/patientService";
import { useAlert } from "../context/NotificationProvider";
import { getDecodedJwt } from "../utils/auth";
import { useState } from "react";
import { useEffect } from "react";

const Comments = ({ open, onClose, post }) => {
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const [comment, setComment] = useState("");

  const [liked, setLiked] = useState();

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

  const { isLoading, data, isFetching } = useQuery(
    ["post", { id: post }],
    fetchPost,
    {
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
      enabled: Boolean(post),
    }
  );
  useEffect(() => {
    if (data) {
      const hasLiked = data?.likes?.find(
        (item) => item?.user?.toString() === decodedUser._id
      );
      if (hasLiked) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [data]);
  const { mutate, isLoading: isLiking } = useMutation(likePost, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      queryClient.resetQueries("post");
      queryClient.resetQueries("posts");
      showNotification?.("Post Liked Successfully", {
        type: "success",
      });
    },
  });
  const { mutate: createCommentMutation, isLoading: isComment } = useMutation(
    createComment,
    {
      onError: (error) => {
        handleErrors(error);
      },
      onSuccess: (data) => {
        setComment("");

        showNotification?.("Comment Created Successfully", {
          type: "success",
        });
        queryClient.resetQueries("post");
        queryClient.resetQueries("posts");
      },
    }
  );
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
        {isFetching ? (
          <Box
            sx={{
              height: "400px",
              minWidth: "500px",
              pt: 4,
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
                <Skeleton variant="rectangular" width={"100%"} height={300} />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: "auto",
              minWidth: "300px",
              pt: 4,
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "white",
                pt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box sx={{ width: "85%", textAlign: "center" }}>
                  <Typography variant="h4">
                    {data?.user?.lastname} {data?.user?.firstname}'s Post
                  </Typography>
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
                    }}
                  >
                    <img
                      src={data?.user?.profilePicture}
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
                      {data?.user?.lastname} {data?.user?.firstname}
                    </Typography>
                    <Typography variant="caption" color="#87B7C7">
                      {formatDate(data?.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ padding: "0 20px" }}>
                  <Box mb={2}>
                    <Typography variant="caption">{data?.text}</Typography>
                  </Box>
                  <Divider />
                </Box>
                <Box>
                  <Grid container sx={{ width: "100%" }} spacing={0.5}>
                    {data?.images?.map((v, index) => {
                      let xs;
                      if (
                        data?.images?.length > 6 &&
                        index >= data?.images?.length - 2
                      ) {
                        xs = 6;
                      } else {
                        xs = 12 / Math.min(3, data?.images?.length);
                      }

                      return (
                        <Grid
                          item
                          xs={xs}
                          sx={{ cursor: "pointer", maxHeight: "500px" }}
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
                    <ThumbUpAlt sx={{ color: "#87B7C7", fontSize: "22px" }} />
                    <Typography variant="caption" color="darkgray">
                      {data?.likes?.length > 999
                        ? data?.likes?.length?.toString().slice(0, 1)
                        : data?.likes?.length !== 0
                        ? data?.likes?.length
                        : ""}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="caption" color="darkgray">
                      {data?.comments.length > 999
                        ? data?.comments.length?.toString().slice(0, 1)
                        : data?.comments.length !== 0
                        ? data?.comments.length
                        : 0}{" "}
                      Comment{data?.comments.length > 1 && "s"}
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
                      if (!liked) {
                        const payload = {
                          userId: decodedUser._id,
                          id: post,
                        };
                        mutate(payload);
                      }
                    }}
                  >
                    <Box>
                      {liked ? (
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
                  {data?.comments.map((comment) => {
                    return (
                      <Box sx={{ display: "flex", mb: 3 }}>
                        <Box
                          sx={{
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <img
                            src={comment?.user?.profilePicture}
                            alt=""
                            width="40px"
                            height="40px"
                            style={{
                              borderRadius: "100%",
                            }}
                          />
                        </Box>

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
                              {comment?.user?.lastname}{" "}
                              {comment?.user?.firstname}
                            </Typography>
                            <Typography
                              color="text.primary"
                              sx={{ fontSize: "10px !important", ml: 1 }}
                            >
                              {formatDate(comment?.createdAt)}
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{ wordWrap: "break-word !important" }}
                          >
                            {comment?.text}
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
                  }}
                >
                  <img
                    src={data?.user?.profilePicture}
                    alt=""
                    width="40px"
                    height="40px"
                    style={{
                      borderRadius: "100%",
                    }}
                  />
                </Box>

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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
                <Box
                  width="30px"
                  pr={2}
                  onClick={() => {
                    if (comment.length > 0) {
                      const payload = {
                        user: decodedUser._id,
                        id: post,
                        text: comment,
                      };
                      createCommentMutation(payload);
                    }
                  }}
                >
                  <Send sx={{ cursor: "pointer" }} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default Comments;
