import { Close, Collections } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  Tooltip,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createChat,
  fetchMessages,
  fetchUsers,
} from "../modules/Patient/services/patientService";
import { getDecodedJwt } from "../utils/auth";
import { LoadingButton } from "@mui/lab";
import { useAlert } from "../context/NotificationProvider";

const JoinMessage = ({ open, onClose }) => {
  const decodedUser = getDecodedJwt();
  const queryClient = useQueryClient();
  const { showNotification } = useAlert();

  const { data: users, isLoading: isLoadingMessages } = useQuery(
    ["users", { id: decodedUser._id }],
    fetchUsers,
    {
      enabled: open,
    }
  );
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
  const { mutate, isLoading } = useMutation(createChat, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      queryClient.resetQueries("chats");
      queryClient.resetQueries("users");
      showNotification?.("Chat Created Successfully", {
        type: "success",
      });

      onClose();
    },
  });
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
            width: { xs: "320px", md: "500px" },
            height: "auto",
            pt: 4,
            pb: 4,
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              pb: 2,
              zIndex: 500,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box sx={{ width: "80%", textAlign: "center" }}>
                <Typography variant="h4">Start Chat</Typography>
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
              mb={4}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 5,
              }}
            >
              <Box sx={{ width: "80%" }}>
                <TextField
                  placeholder="Search people"
                  size="small"
                  //   value={search}
                  //   onChange={(e) => setSearch(e.target.value)}
                  multiline
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box sx={{ pl: 5, pr: 5 }}>
              {users?.map((item) => {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      mt: 3,
                      padding: "",
                    }}
                  >
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <img
                        src={item?.profilePicture}
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
                        display: "flex",
                        width: "calc(100% - 50px)",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" color="black">
                        {item.lastname} {item.firstname}
                      </Typography>
                      <LoadingButton
                        loading={isLoading}
                        onClick={() => {
                          const payload = {
                            members: [
                              {
                                user: decodedUser._id,
                              },
                              {
                                user: item._id,
                              },
                            ],
                          };
                          mutate(payload);
                        }}
                        variant="contained"
                        sx={{ color: "white", height: "25px" }}
                      >
                        Message
                      </LoadingButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default JoinMessage;
