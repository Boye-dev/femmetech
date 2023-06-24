import { Box, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useWidth } from "../../../hooks/useWidth";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import ProfileSidebar from "../../../components/ProfileSidebar";
import { announcements } from "../../../constants/announcements";
import image from "../../../assets/images/test-image.png";
import { MoreHoriz } from "@mui/icons-material";
import { format } from "date-fns";
import { getDecodedJwt } from "./../../../utils/auth";
import { fetchAnnouncements, updateStatusToRead } from "../services/patientService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAlert } from "../../../context/NotificationProvider";


const Announcements = () => {
    const { isMobile } = useWidth();
    const queryClient = useQueryClient();
    const decodedUser = getDecodedJwt();
    const patientId = decodedUser.id;
    // const { dbAnnouncements, setDbAnnouncements } = useState([])
    
    const { showNotification } = useAlert();

    const { isLoading, data } = useQuery(
        ["announcements", { patientId: patientId }],
        fetchAnnouncements,
        {
            enabled: patientId !== null || patientId !== undefined,
            onError: (error) => {
                showNotification?.(error.response.data?.error, { type: "error" });
            },
        }
    );

    // Update to read
    const mutation = useMutation(updateStatusToRead, {
        onError: (error) => {
          showNotification?.(error.response.data?.error, { type: "error" });
        },

        onSuccess: (data) => {
            console.log(data);
            // Get all announcements again
            queryClient.refetchQueries("announcements")
        }
    });
      


    const getAnnouncementSection = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const formattedDate = new Date(date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));

        if (formattedDate.toDateString() === today.toDateString()) {
        return "Today";
        } else if (formattedDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
        } else {
        return "Later";
        }
    };

    const sortedAnnouncements = isLoading ? [] : data?.data?.sort((a, b) => {
        const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        return dateB - dateA;
    });

    const announcementSections = sortedAnnouncements.reduce((sections, item) => {
        const section = getAnnouncementSection(item.date);
        if (!sections[section]) {
        sections[section] = [];
        }
        sections[section].unshift(item);
        return sections;
    }, {});

    const unreadAnnouncements = isLoading ? [] : data?.data?.filter((item) => {
        return item.patientStatus[0].status === "unread";
    });

    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const handleShowMoreClick = (announcement) => {
        setSelectedAnnouncement(announcement);
        const announcementId = announcement._id; // Replace with the actual announcementId
        const queryKey = ['updateStatus', { patientId, announcementId }];
        mutation.mutate({ queryKey });
    };

    const handleCloseDialog = () => {
        setSelectedAnnouncement(null);
    };


    return (
        <>
            {isLoading ? 
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
                        <Box sx={{ pt: 10, pl: 4, paddingBottom: "30px", borderBottom: "1px solid #E2E5FB", marginBottom: "20px" }}>
                            <Typography variant="h3" sx={{ color: "black", fontSize: {xs: "24px !important", } }}>
                            Announcements
                            </Typography>
                            <Typography variant="caption" sx={{ color: "black", fontWeight: 400, letterSpacing: 1 }}>
                            You have <span style={{ fontWeight: 600, color: "#ED2228" }}>{unreadAnnouncements.length}</span> unread announcements.
                            </Typography>
                        </Box>

                        {Object.entries(announcementSections).map(([section, items]) => (
                            <React.Fragment key={section}>
                                <Typography variant="h3" sx={{ color: "#AEAEAE", margin: "20px 0" }}>
                                    {section}
                                </Typography>

                                {items.map((item, pos) => (
                                    <Box
                                        key={pos}
                                        sx={{
                                            position: "relative",
                                            background: item.patientStatus[0].status === "read" ? "#fff" : "#E2E5FB",
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
                                    {/* <Box sx={{ position: "absolute", top: "5px", right: "5px", cursor: "pointer" }}>
                                        <MoreHoriz sx={{ color: "#7B7B7B" }} />
                                    </Box> */}
                                    </Box>
                                ))}
                            </React.Fragment>
                        ))}
                        </Box>
                    </Box>
                    
                )
            }
            {!isMobile && <ProfileSidebar width="250px" />}
            <Dialog open={selectedAnnouncement !== null} onClose={handleCloseDialog}>
                {selectedAnnouncement && (
                    <>
                        <DialogTitle variant="h4" sx={{fontSize: {xs: "18px !important", }}} color="black">
                            {selectedAnnouncement.name}
                        </DialogTitle>
                        <DialogContent>
                            <Typography color="black" variant="body1" sx={{fontSize: {xs: "14px !important", md: "16px !important",}}} >
                                {selectedAnnouncement.text}
                            </Typography>
                            <Typography variant="caption" marginTop="20px">
                                Date: {format(new Date(selectedAnnouncement.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")), "dd/MM/yyyy")}
                            </Typography>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </>
    );
};

export default Announcements;
