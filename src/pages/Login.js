import { Grid, Typography, TextField, IconButton, Snackbar, Alert, Button } from "@mui/material";
import Box from "@mui/material/Box"
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/images/login.png";
import GoogleIcon from '@mui/icons-material/Google';

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/api";

const Login = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const schema = yup.object().shape({
        username: yup.string().required("Email Is Required"),
        password: yup
        .string()
        .required("Password Is Required")

    });

    const { handleSubmit, trigger, control } = useForm({
        resolver: yupResolver(schema),
    });
    const [values, setValues] = useState({
        vertical: "bottom",
        horizontal: "center",
        open: false,
        showPassword: false,
    });
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [messageSnackBar, setMessageSnackBar] = useState("");

    const handleSnackBar = () => {
        setOpenSnackBar(true);
    };


    const navigate = useNavigate()

    localStorage.setItem('loggedIn', false);

    const [loading, setLoading] = useState(false);

    const handleLoadClick = async (data) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await api.post("/login", data)
            if (response.data?.success === false) {
                setMessageSnackBar("Error occured. Check internet and try again.")
                handleSnackBar()
                setLoading(false)
            } else {
                localStorage.setItem('loggedIn', JSON.stringify(true));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate("/home/dashboard")

            }
        } catch(err) {
            if(err.response) {
                setLoading(false)
                if(err.response.status === 401) {
                    setMessageSnackBar("Username or password incorrect!")       
                    handleSnackBar()
                } else {
                    setMessageSnackBar("Error occured. Check internet and try again.")
                    handleSnackBar()
                }
            }
        }
    }

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };

    return (
        <Box
            sx={{
                height: "100vh",
            }}
        >

            <Snackbar color="primary" open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
                <Alert onClose={() => setOpenSnackBar(false)} severity="warning" sx={{ width: '100%', background: "gray" }}>
                    {messageSnackBar}
                </Alert>
            </Snackbar>
            <Grid container >
                <Box item md={5} xs={12}
                    sx={{
                        position: "fixed",
                        left: 0,
                        width: "40vw",
                        boxShadow: "0 0 5px 0 gray",
                        textAlign: "center",
                        height: "100vh",
                        background: `url(${login})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        display: {xs: "none", md: "block"}
                    }}
                >
                    
                </Box>
                <Box item md={7} xs={12}
                    sx={{
                        width: {xs: "100%", md: "60%"},
                        marginLeft: {xs: "0", md: "40%"},
                        textAlign: "center",
                        background: {xs: `url(${login})`, md: "none"},
                        backgroundRepeat: {xs: "no-repeat", md: "none"},
                        backgroundSize: {xs: "cover", md: "none"},
                        marginTop: {xs: "15vh", md: "15vh"}
                    }}
                >
                    <Box
                        sx={{
                            margin: "auto",
                            width: {xs: "80%", md: "60%"},
                        }}
                    >
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="div"
                            sx={{
                                textAlign: "left",
                                marginTop: 6,
                                marginBottom: "24px",
                                fontWeight: 700,
                                fontSize: "28px !important",
                            }}
                        >
                            Sign in to NEXUS
                        </Typography>
                        <Button
                            size="small"
                            onClick={handleSubmit(handleLoadClick)}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            sx={{
                                fontSize: "16px !important",
                                justifyContent: "left",
                                textAlign: "center",
                                fontWeight: 300,
                                background: "#CE1E23",
                                width: "50%",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: '#CE1E23'
                                },
                            }}
                        >
                            <GoogleIcon fontSize="small" sx={{marginRight: "6px"}} />  Sign in with Google
                        </Button>

                        <form action="">

                        <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { ref, ...fields },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                    variant="outlined"
                                    sx={{marginBottom: "30px", color: "black"}}
                                    label="Email"
                                    fullWidth
                                    {...fields}
                                    inputRef={ref}
                                    error={Boolean(error?.message)}
                                    helperText={error?.message}
                                    onKeyUp={() => {
                                        trigger("username");
                                    }}
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { ref, ...fields },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        variant="outlined"
                                        sx={{marginBottom: "30px", color: "black"}}
                                        label="Password"
                                        fullWidth
                                        {...fields}
                                        type={values.showPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                            <IconButton onClick={handleClickShowPassword}>
                                                {values.showPassword === true ? 
                                                (
                                                <Visibility />
                                                ) : (
                                                <VisibilityOff />
                                                )}
                                            </IconButton>
                                            ),
                                        }}
                                        inputRef={ref}
                                        error={Boolean(error?.message)}
                                        helperText={error?.message}
                                        onKeyUp={() => {
                                            trigger("password");
                                        }}
                                    />
                                )}
                            />


                            <Button
                                fullWidth
                                size="small"
                                onClick={handleSubmit(handleLoadClick)}
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                sx={{
                                    fontSize: "18px !important",
                                    padding: "12px",
                                    background: "#252B33",
                                    color: "#fff",
                                    fontFamily: "monospace",
                                    "&:hover": {
                                        backgroundColor: '#252B33'
                                    },
                                }}
                            >
                                Login
                            </Button>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <p style={{textAlign: "left", marginBottom: 30, color: "black", fontFamily: "monospace",}}>Don't have an account? <Link style={{decoration: "none", color: "teal"}} to={"/signup"}>Get Started</Link></p>
                            </Box>
                        </form>

                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}

export default Login;