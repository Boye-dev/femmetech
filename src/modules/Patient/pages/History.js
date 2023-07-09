import React from "react";
import { getDecodedJwt } from "../../../utils/auth";
import { useAlert } from "../../../context/NotificationProvider";
import { useQuery } from "react-query";
import { Box, CircularProgress, Typography } from "@mui/material";

import { formatDate } from "../../../utils/formatDate";
import { fetchPastAppointmentsDoctor } from "../services/patientService";
import { getRandomColor } from "../../Doctor/pages/Waitlist";

const History = () => {
  const decodedUser = getDecodedJwt();
  const patientId = decodedUser.id;

  const { showNotification } = useAlert();
  const { isLoading: isAppointmentLoading, data: pastData } = useQuery(
    [
      "past-appointments",
      {
        patientId: patientId,
      },
    ],
    fetchPastAppointmentsDoctor,
    {
      enabled: true,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );

  return (
    <>
      {isAppointmentLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "auto", md: "100vh" },
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              width: "100%",

              backgroundColor: "#F5F5F5",
              height: "auto",
              pb: 10,
            }}
          >
            <Box
              sx={{
                pt: 10,
                pl: 8,
                paddingBottom: "30px",
                borderBottom: "1px solid #E2E5FB",
                marginBottom: "10px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: "black", fontSize: { xs: "24px !important" } }}
              >
                History
              </Typography>
            </Box>
          </Box>
          <Box sx={{ pl: 10, pr: 10 }}>
            {pastData?.data?.length > 0 ? (
              pastData?.data?.map((item, index) => {
                return (
                  <>
                    <Box
                      key={item._id}
                      sx={{
                        width: "100%",
                        minHeight: "30px",
                        backgroundColor: "#F4F4F4",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        display: "flex",

                        mt: 5,
                        mb: 5,
                        justifyContent: "space-between",
                      }}
                    >
                      <Box display="flex" sx={{ width: "100%" }}>
                        <Box
                          sx={{
                            width: "3px",
                            height: "100%",
                            borderRadius: "5px",
                            backgroundColor: getRandomColor(),
                          }}
                        />
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            mr: 10,
                          }}
                        >
                          <Box
                            ml={5}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            p={1}
                          >
                            <Typography color="black" variant="h4">
                              {item?.title || "--"}
                            </Typography>
                            <Typography color="black" variant="h6">
                              {item?.specialty || "--"}
                            </Typography>
                            <Typography color="text.secondary" variant="h6">
                              {`Patient: ${
                                item?.patientId?.firstName || "--"
                              } ${item?.patientId?.lastName || "--"}`}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="caption"
                            >
                              {`Additional Information: ${
                                item?.additionalInformation || "--"
                              }`}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="caption"
                            >
                              {`Date: ${formatDate(
                                item?.startDateTime || "--"
                              )}`}
                            </Typography>
                          </Box>
                          {/* <Box
                          ml={5}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          p={1}
                          sx={{ justifySelf: "end" }}
                        >
                          <Button
                            disableElevation
                            variant="contained"
                            sx={{
                              borderRadius: "14px",
                              height: "fit-content",
                            }}
                            onClick={() => {
                              setIndividualAppointmentData(item);
                              setOpen(true);
                            }}
                          >
                            View
                          </Button>
                        </Box> */}
                        </Box>
                      </Box>
                    </Box>
                  </>
                );
              })
            ) : (
              <Typography variant="h6" mt={4} color="text.secondary">
                No History
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default History;
