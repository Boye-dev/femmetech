import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarMenu = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        onClick={() => {
          props.onClose();
          navigate(props?.item.url);
        }}
        sx={{
          width: "100%",
          display: "flex",
          height: "30px",
          mt: 2,
          mb: 2,
          justifyContent: "space-between",
          cursor: "pointer",

          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ color: props.isActive ? "#87B7C7" : "black" }}>
            {props.item?.icon}
          </Box>

          <Typography
            pl={3}
            variant={props.isActive ? "h6" : "caption"}
            sx={{
              color: props.isActive ? "#87B7C7" : "black",
            }}
          >
            {props.item.name}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SidebarMenu;
