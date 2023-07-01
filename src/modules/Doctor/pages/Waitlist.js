import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useWidth } from "../../../hooks/useWidth";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import DoctorProfileSidebar from "../../../components/DoctorProfileSidebar";
import image from "../../../assets/images/test-image.png";
import { format } from "date-fns";
import { getDecodedJwt } from "./../../../utils/auth";
import {  fetchAnnouncementsDoctor, fetchAppointmentsDoctor, updateStatusToRead } from "../services/doctorService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";
import { Add } from "@mui/icons-material";
import NewAnnouncement from "../components/Announcements.js/NewAnnouncement";
import ViewWaitlist from "../components/Waitlist/ViewWailtlist";


const Waitlist = () => {
    const { isMobile } = useWidth();
    const queryClient = useQueryClient();
    const decodedUser = getDecodedJwt();
    const doctorId = decodedUser.id;
    const [open, setOpen] = useState(false);
    const [IndividualAppointmentData, setIndividualAppointmentData] = useState(false);
    
    const { showNotification } = useAlert();
    console.log(doctorId);

    const { isLoading, data } = useQuery(
        ["announcements", { doctorId: doctorId }],
        fetchAnnouncementsDoctor,
        {
            enabled: doctorId !== null || doctorId !== undefined,
            onError: (error) => {
                showNotification?.(error.response.data?.error, { type: "error" });
            },
        }
    );

    // Update to read
    // const mutation = useMutation(updateStatusToRead, {
    //     onError: (error) => {
    //       showNotification?.(error.response.data?.error, { type: "error" });
    //     },

    //     onSuccess: (data) => {
    //         console.log(data);
    //         // Get all announcements again
    //         queryClient.refetchQueries("announcements")
    //     }
    // });

    
    const color = ["#0FC916", "#FCBA03", "#6E00FF", "#F30505"];
    let lastColorIndex;

    function getRandomColor() {
        let randomColorIndex = Math.floor(Math.random() * color.length);
        while (randomColorIndex === lastColorIndex) {
            randomColorIndex = Math.floor(Math.random() * color.length);
        }
        lastColorIndex = randomColorIndex;
        return color[randomColorIndex];
    }

    const { isLoading: isAppointmentLoading, data: appointmentData } = useQuery(
        [
        "appointments",
        {
            doctorId: doctorId,

            status: "PENDING",
        },
        ],
        fetchAppointmentsDoctor,
        {
        enabled: isLoading === false,
        onError: (error) => {
            showNotification?.(error.response?.data?.message, { type: "error" });
        },
        }
    );
      
    // ...
    const getAnnouncementSection = (timestamp) => {
        const today = new Date().toLocaleDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const announcementDate = new Date(timestamp).toLocaleDateString();
      
        if (announcementDate === today) {
          return "Today";
        } else if (announcementDate === yesterday.toLocaleDateString()) {
          return "Yesterday";
        } else {
          return "Later";
        }
      };
      
      const sortedAnnouncements = isLoading
        ? []
        : data?.data?.sort((a, b) => {
            const timestampA = new Date(a.timestamp)?.getTime();
            const timestampB = new Date(b.timestamp)?.getTime();
            const announcementDateA = new Date(a.timestamp)?.toLocaleDateString();
            const announcementDateB = new Date(b.timestamp)?.toLocaleDateString();
      
            if (announcementDateA === announcementDateB) {
              // Sort based on the latest announcement within the same date
              return timestampB - timestampA;
            }
      
            // Sort based on the date in descending order
            const dateA = new Date(a.timestamp)?.getTime();
            const dateB = new Date(b.timestamp)?.getTime();
            return dateB - dateA;
          });
      
      const announcementSections = sortedAnnouncements?.reduce((sections, item) => {
        const section = getAnnouncementSection(item.timestamp);
        if (!sections[section]) {
          sections[section] = [];
        }
        sections[section].push(item);
        return sections;
      }, {});
      

    const unreadAnnouncements = isLoading ? [] : data?.data?.filter((item) => {
        return item.doctorStatus.some((stat) => {
            return stat.status === "unread" && stat.doctorId === doctorId;
        });
    });
    

    // const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    // const handleShowMoreClick = (announcement) => {
    //     setSelectedAnnouncement(announcement);
    //     const announcementId = announcement._id; // Replace with the actual announcementId
    //     const queryKey = ['updateStatus', { doctorId, announcementId }];
    //     mutation.mutate({ queryKey });
    // };

    // const handleCloseDialog = () => {
    //     setSelectedAnnouncement(null);
    // };

    console.log(unreadAnnouncements);

    return (
        <>
            {isLoading || isAppointmentLoading ? 
                (
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
                ) 
                : 
                (
                    <Box
                        sx={{
                        backgroundColor: "#F5F5F5",
                        width: isMobile ? "100%" : "calc(100% - 250px)",
                        height: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        pb: 20,
                        }}
                    >
                        <Box sx={{ width: "100%", pl: 8, pr: 8, backgroundColor: "#F5F5F5", height: "100vh" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #E2E5FB", 
                            paddingBottom: "20px",
                            pt: 10,
                          }}
                        >
                          <Box sx={{  pl: 4, }}>
                              
                              <Typography variant="h3" sx={{ color: "black", fontSize: {xs: "24px !important", } }}>
                                Waitlist
                              </Typography>
                              <Typography variant="caption" sx={{ color: "black", fontWeight: 400, letterSpacing: 1 }}>
                              You have <span style={{ fontWeight: 600, color: "#ED2228" }}>{appointmentData?.data?.appointments.length}</span> pending appointments.
                              </Typography>
                          </Box>
                        </Box>
                            

                            {/* {Object.entries(announcementSections).map(([section, items]) => (
                                <React.Fragment key={section}>
                                    <Typography variant="h3" sx={{ color: "#AEAEAE", margin: "20px 0" }}>
                                        {section}
                                    </Typography>

                                    {items.map((item, pos) => (
                                        <Box
                                            key={pos}
                                            sx={{
                                                position: "relative",
                                                background: item.doctorStatus?.some(status => status.doctorId === doctorId && status.status === "read") ? "#fff" : "#E2E5FB",
                                                border: "0.5px solid #D1D1D1",
                                                borderRadius: "5px",
                                                marginBottom: "5px",
                                                padding: "7px 11px",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img src={image} alt="profile" width="50px" height="50px" borderRadius="50%" />
                                            <Box sx={{ flex: "1", width: "70%", marginLeft: "10px", overflow: "hidden" }}>
                                                <Typography variant="h6" sx={{fontSize: {xs: "16px !important", }}} color="black">
                                                    {item.name}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <Typography
                                                        sx={{
                                                        wordWrap: "break-word",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        hyphens: "auto",
                                                        wordBreak: "break-all",
                                                        width: "70%",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: "vertical",
                                                        }}
                                                        variant="caption"
                                                        color="black"
                                                    >
                                                        {item.text}
                                                    </Typography>
                                                    <Typography onClick={() => handleShowMoreClick(item)} variant="caption" sx={{ color: "#AEAEAE", cursor: "pointer" }}>
                                                        show more
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </React.Fragment>
                            ))} */}
                            {appointmentData.data?.appointments.length > 0 ? (
                            appointmentData.data?.appointments.map((item, index) => {
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

                                        mt: 3,
                                        mb: 2,
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
                                                    mr: 10
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
                                                        {item.title}
                                                    </Typography>
                                                    <Typography color="text.secondary" variant="h6">
                                                        {`Patient: ${item.patientId.firstName} ${item.patientId.lastName}`}
                                                    </Typography>
                                                    <Typography color="text.secondary" variant="caption">
                                                        {`Additional Information: ${item.additionalInformation}`}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    ml={5}
                                                    display="flex"
                                                    flexDirection="column"
                                                    justifyContent="center"
                                                    p={1}
                                                    sx={{justifySelf: "end"}}
                                                >
                                                    <Button
                                                        disableElevation
                                                        variant="contained"
                                                        sx={{ borderRadius: "14px", height: "fit-content" }}
                                                        onClick={() => {setIndividualAppointmentData(item); setOpen(true); }}
                                                    >
                                                        View
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                                );
                            })
                            ) : (
                            <Typography variant="h6" mt={4} color="text.secondary">
                                No Waitlist
                            </Typography>
                            )}
                        </Box>
                    </Box>
                    
                )
            }
            {!isMobile && <DoctorProfileSidebar width="250px" />}
            
            <ViewWaitlist
              open={open}
              appointmentData={IndividualAppointmentData}
              onClose={() => {
                setOpen(false);
                queryClient.refetchQueries("appointments")
              }}
            />
        </>
    );
};

export default Waitlist;
