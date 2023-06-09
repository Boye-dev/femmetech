
import {  AppBar, Toolbar, Typography, Avatar, List, ListItemButton, ListItemIcon, ListItemText, Divider, Button, SwipeableDrawer, IconButton, Box, Menu, MenuItem } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from '@mui/icons-material/Menu';
import LayersIcon from '@mui/icons-material/Layers';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
// import "logo" from "./images/"logo".svg"
// import dropdown from "./images/dropdown.svg"

const MenuBar = () => {

    return ( 
        
        <Box>
            <Box
                sx={{
                    width: "90%",
                    margin: "auto",
                    paddingTop: "20px",
                    height: "100%"
                }}
            >
                
                
                {/* <Box sx={{ width: '100%', fontSize: "20px", }} onClick={toggleDrawer("left", false)} onKeyDown={toggleDrawer("left", false)}> */}
                <Box sx={{ width: '100%', fontSize: "20px", }} >
                    <List component="nav" aria-label="main mailbox folders">
                        <Link style={{marginBottom: "20px", textDecoration: "none", color: "inherit"}} to={"/about"}>
                            <ListItemButton
                                sx={{marginBottom: "20px", borderRadius: "6px" }}
                            >
                                <ListItemIcon >
                                    <InfoIcon sx={{fontSize: '24px'}}/>
                                </ListItemIcon>
                                <ListItemText primary="About Us" primaryTypographyProps={{fontSize: '14px', fontWeight: 550, color: "gray"}}/>
                                
                            </ListItemButton>
                        </Link>
                        <Link style={{marginBottom: "20px", textDecoration: "none", color: "inherit"}} to={"/what-we-do"}>
                            <ListItemButton
                                sx={{marginBottom: "20px", borderRadius: "6px" }}
                            >
                                <ListItemIcon >
                                    <DeviceUnknownIcon sx={{fontSize: '24px'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Services" primaryTypographyProps={{fontSize: '14px', fontWeight: 550, color: "gray"}}/>
                            </ListItemButton>
                        </Link>
                        <Link style={{marginBottom: "20px", textDecoration: "none", color: "inherit"}} to={"/projects"}>
                            <ListItemButton
                                sx={{marginBottom: "20px", borderRadius: "6px" }}
                            >
                                <ListItemIcon>
                                    <LayersIcon sx={{fontSize: '24px'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Our Works" primaryTypographyProps={{fontSize: '14px', fontWeight: 550, color: "gray"}}/>
                            </ListItemButton>
                        </Link>
                        {/* <Link style={{marginBottom: "20px", textDecoration: "none", color: "inherit"}} to={"/career"}>
                            <ListItemButton
                                sx={{marginBottom: "20px", borderRadius: "6px" }}
                            >
                                <ListItemIcon>
                                    <WorkIcon sx={{fontSize: '24px'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Career" primaryTypographyProps={{fontSize: '14px', fontWeight: 550, color: "gray"}}/>
                            </ListItemButton>
                        </Link> */}
                        <Link style={{marginBottom: "20px", textDecoration: "none", color: "inherit"}} to={"/blogs"}>

                            <ListItemButton
                                sx={{marginBottom: "20px", borderRadius: "6px" }}
                            >
                                <ListItemIcon>
                                    <BookIcon sx={{fontSize: '24px'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Blogs" primaryTypographyProps={{fontSize: '14px', fontWeight: 550, color: "gray"}}/>
                            </ListItemButton>
                        </Link>
                    
                        
                    </List>
                    <Divider />

                    <ListItemButton
                        sx={{ borderRadius: "6px" }}
                    >
                        <Link
                            to={"/contact-us"}
                            style={{
                                marginTop: "30px",
                                textDecoration: "none",
                                fontFamily: `${"Montserrat"}, sans-serif`,
                                fontStyle: "normal",
                                fontSize: "16px",
                                background: "linear-gradient(102.04deg, #1FABE9 16.99%, rgba(18, 0, 126, 0.95) 106.59%)",
                                padding: "10px 30px",
                                color: "#ffffff",
                                lineHeight: "20px",
                                textTransform: "none ! important",
                                borderRadius: "8px"
                            }}
                        >
                            {"Contact us"}
                        </Link>
                    </ListItemButton>
                    
                </Box>
            </Box>
        </Box>
     );
}
 
export default MenuBar;

