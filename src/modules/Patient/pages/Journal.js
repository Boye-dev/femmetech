import { AccessTime, CalendarMonth } from "@mui/icons-material";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getDecodedJwt } from "../../../utils/auth";
import { deleteJournal, fetchJournal } from "../services/patientService";
import { useAlert } from "../../../context/NotificationProvider";
import { formatDate, formatDateTime } from "../../../utils/formatDate";
import { LoadingButton } from "@mui/lab";

const Journal = () => {
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();
  console.log(decodedUser);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    ["journals", { user: decodedUser._id }],
    fetchJournal,
    {
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation(deleteJournal, {
    onError: (error) => {
      // handleErrors(error);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries("journals");
      showNotification?.("Journal deleted Successfully", {
        type: "success",
      });
    },
  });
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
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => navigate("/patient/my-journal/new")}
          >
            New Journal
          </Button>
        </Box>
        {isLoading ? (
          <Box
            sx={{
              width: { md: "70%" },
              height: "auto",
              backgroundColor: "white",
              boxShadow: "1px 1px 5px 0.5px #C0C0C0",
              borderRadius: "8px",
              p: 8,
              mb: 5,
            }}
          >
            <Skeleton variant="text" width={"70%"} height={30} />{" "}
            <Skeleton variant="text" width={"40%"} height={30} />
          </Box>
        ) : (
          data.journals.map((item) => {
            return (
              <Box
                sx={{
                  width: { md: "70%" },
                  height: "auto",
                  backgroundColor: "white",
                  boxShadow: "1px 1px 5px 0.5px #C0C0C0",
                  borderRadius: "8px",
                  p: 8,
                  mb: 5,
                }}
              >
                <Typography variant="h5">{item.title}</Typography>
                <Box sx={{ display: "flex", mt: 5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarMonth sx={{ color: "#87B7C7" }} />
                    <Typography variant="caption" ml={2}>
                      Last Edited -{formatDate(item.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ mt: 5, mr: 6 }}
                    onClick={() => navigate(`/patient/my-journal/${item._id}`)}
                  >
                    Edit
                  </Button>

                  <LoadingButton
                    sx={{ mt: 5 }}
                    color="error"
                    onClick={() => {
                      const payload = {
                        id: item._id,
                      };
                      mutate(payload);
                    }}
                  >
                    Delete
                  </LoadingButton>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </>
  );
};

export default Journal;
