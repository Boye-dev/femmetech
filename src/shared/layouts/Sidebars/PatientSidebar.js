import { Box, Drawer } from "@mui/material";
import React from "react";
import { ReactComponent as Logo } from "../../../assets/svgs/logo.svg";
import { ReactComponent as LogoSmall } from "../../../assets/svgs/logosmall.svg";
import SidebarMenu from "../../components/SidebarMenu";
import { PATIENT_NAV_ITEMS } from "../../../constants/sidebarItems";
import { useLocation } from "react-router-dom";

const PatientSidebar = (props) => {
  const location = useLocation();

  return (
    <>
      <Box>
        <Drawer
          variant={props.isMobile ? "temporary" : "permanent"}
          open={props.open}
          sx={{ width: props.width }}
          onClose={() => props.setOpen(false)}
        >
          <Box sx={{ width: props.width }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "130px",
                width: "100%",
              }}
            >
              {props.width === 220 ? <Logo /> : <LogoSmall />}
            </Box>

            <Box sx={{ width: "100%" }}>
              {PATIENT_NAV_ITEMS.map((item, index) => {
                return (
                  <SidebarMenu
                    collapse={props.collapse}
                    item={item}
                    key={item.name}
                    width={props.width}
                    isMobile={props.isMobile}
                    onClose={() => props.setOpen(false)}
                    isActive={location.pathname.includes(item.url)}
                  />
                );
              })}
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default PatientSidebar;
