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
import React from "react";

const JoinGroup = ({ open, onClose }) => {
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
                <Typography variant="h4">Join Group</Typography>
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
                  placeholder="Search group"
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
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item) => {
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
                        borderRadius: "100%",
                        border: "1px solid black",
                      }}
                    ></Box>
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
                        Oyelola Adeboye Samuel
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ color: "white", height: "25px" }}
                      >
                        Join
                      </Button>
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

export default JoinGroup;
