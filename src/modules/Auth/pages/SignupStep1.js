import { Box, Button, IconButton, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { EastOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const formStyles = {
    marginBottom: "20px",
    color: "black !important",
    background: "#F5F5F6",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      outline: "none",
      borderRadius: "3px",
      color: "#000",
    },
    "& .MuiInputBase-input:hover": {
      border: "0",
      outline: "none",
      borderRadius: "5px",
      color: "#000",
    },
    "& .MuiFormHelperText-root": {
      color: "red !important",
      background: "#fff",
      width: "100%",
      margin: 0,
    },
    "& .Mui-active": {
      outline: "none",
      borderRadius: "5px",
    },
    "& .Mui-focused": {
      color: "#000",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#000",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000",
      },
    },
  };

const SignupStep1 = () => {

    const schema = yup.object().shape({
        otherName: yup.string().required("Other names Is Required"),
        lastName: yup.string().required("Last name Is Required"),
        username: yup.string().required("Email Is Required"),
        password: yup
          .string()
          .required("Password Is Required")
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
            "Password Must Contain An Uppercase, A Digit, and A Special Character"
          )
          .min(8, "Password Should Have At Least 8 Characters")
          .max(32, "Password Should Have At Most 32 Characters"),
        confirmPassword: yup
          .string()
          .required("Password Must Match")
          .oneOf([yup.ref("password"), null]),
      });

    const { control, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };
      
    const [values, setValues] = useState({
        vertical: "bottom",
        horizontal: "center",
        open: false,
        showPassword: false,
    });

    return (  
        <Box>
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{
                textAlign: "left",
                marginBottom: "12px",
                fontWeight: 700,
                // marginTop: "10vh", 
                fontSize: "28px !important",
              }}
            >
              Sign in to <span style={{color: "#CE1E23"}}> NEXUS</span>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <Controller
                        name="otherName"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                        <TextField
                            variant="outlined"
                            size="small"
                            InputProps={{
                            style: {
                                fontSize: '16px',
                                color: "#000 !important",
                            },
                            }}
                            InputLabelProps={{
                            style: {
                                color: "black",
                            },
                            }}
                            sx={formStyles}
                            label="First Name"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                            trigger("otherName");
                            }}
                        />
                        )}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                        <TextField
                            variant="outlined"
                            size="small"
                            InputProps={{
                            style: {
                                fontSize: '16px',
                                color: "#000 !important",
                            },
                            }}
                            InputLabelProps={{
                            style: {
                                color: "black",
                            },
                            }}
                            sx={formStyles}
                            label="Last Name"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                            trigger("lastName");
                            }}
                        />
                        )}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                        <TextField
                            variant="outlined"
                            size="small"
                            InputProps={{
                            style: {
                                fontSize: '16px',
                                color: "#000 !important",
                            },
                            }}
                            InputLabelProps={{
                            style: {
                                color: "black",
                            },
                            }}
                            sx={formStyles}
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
                    </Grid>
                    <Grid item xs={12}>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                        <TextField
                            variant="outlined"
                            size="small"
                            type={values.showPassword ? "text" : "password"}
                            InputProps={{
                            style: {
                                fontSize: '16px',
                                color: "#000 !important",
                            },
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
                            InputLabelProps={{
                            style: {
                                color: "black",
                            },
                            }}
                            sx={formStyles}
                            label="Password"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                            trigger("password");
                            }}
                        />
                        )}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                        <TextField
                            variant="outlined"
                            size="small"
                            type={values.showPassword ? "text" : "password"}
                            InputProps={{
                            style: {
                                fontSize: '16px',
                                color: "#000 !important",
                            },
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
                            InputLabelProps={{
                            style: {
                                color: "black",
                            },
                            }}
                            sx={formStyles}
                            label="Confirm Password"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onKeyUp={() => {
                            trigger("confirmPassword");
                            }}
                        />
                        )}
                    />
                    </Grid>
                </Grid>
                <Button
                  fullWidth
                  size="small"
                  onClick={handleSubmit(onSubmit)}
                //   endIcon={<SendIcon />}
                //   loading={loading}
                //   loadingPosition="end"
                  variant="contained"
                  sx={{
                    fontSize: "18px !important",
                    background: "#252B33",
                    padding: "6px",
                    marginBottom: "6px",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: '#252B33'
                    },
                  }}
                >
                  Continue <EastOutlined sx={{marginLeft: "12px"}}/>
                </Button>
            </form>
        </Box>

    );
}
 
export default SignupStep1;