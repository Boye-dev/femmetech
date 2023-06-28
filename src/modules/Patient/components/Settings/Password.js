
import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useEffect,  } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
// import { PatientPaths, BasePaths } from "../../../routes/paths";
// import { Roles } from "../../../constants/roles";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { getDecodedJwt } from "../../../../utils/auth";
// import { useAuthenticatedUser } from "../../../../hooks/useAuthenticatedUser";
import { passwordChange,  } from "../../services/patientService";
import { useAlert } from "../../../../context/NotificationProvider";
import { useQueryClient } from "react-query";


const formStyles = {
    // marginBottom: "20px",
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
      background: "#F1F3F9",
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
  
  
const Password = () => {
    
    // const { isLoading, userDetails,  } = useAuthenticatedUser();
    const patientId = getDecodedJwt().id
    const { showNotification } = useAlert();
    const queryClient = useQueryClient();

    const schema = yup.object().shape({
        oldPassword: yup.string().required("Old Password Is Required"),
        newPassword: yup
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
          .oneOf([yup.ref("newPassword"), null]),
        
    });

    
  
    const { handleSubmit, trigger, control, reset } = useForm({
      resolver: yupResolver(schema),
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { mutate, isLoading: submitLoading } = useMutation(passwordChange, {
        onError: (error) => {
          showNotification?.(error.response.data.errors[0], { type: "error" });
        },
        onSuccess: (data) => {
            showNotification?.(data.message, { type: "success" });
            queryClient.refetchQueries("patient_by_id");
            reset()
        },
    });
    const onSubmit = (payload) => {
        const formData = new FormData();
        formData.append('oldPassword', payload.oldPassword);
        formData.append('newPassword', payload.newPassword);
        formData.append('confirmPassword', payload.confirmPassword);
        formData.append('_id', patientId);
        mutate(formData);
    };
    
    return (  
        <>
            { submitLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : 
            <Box
                sx={{
                    backgroundColor: "#F1F3F9",
                    width: "100%",
                    height: "100vh",
                    
                }}
            >
                <Box sx={{ width: "100%", backgroundColor: "#F1F3F9", pb: 4 }}>
                    <Box
                        sx={{
                            pt: 3,
                            pb: 3,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography variant="h5" sx={{ color: "black" }}>
                                Change Password
                            </Typography>
                            <Typography variant="caption" sx={{ color: "lightgray" }}>
                                You can update your passwor here.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                // justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Button
                                // onClick={props.onClose}
                                variant="text"
                                color="error"
                                sx={{
                                    padding: "0 10px",
                                    // width: "40%",
                                    height: "35px",
                                    border: "1px solid lightgray",
                                    mr: 2,
                                }}
                                onClick={handleSubmit(onSubmit)}
                            >
                                <Typography variant="subtitle2">Save Changes</Typography>
                            </Button>
                            <LoadingButton
                                // loading={isLoading}
                                variant="contained"
                                color="secondary"
                                // onClick={handleSubmit(onSubmit)}
                                sx={{
                                    padding: "0 10px",
                                    // width: "40%",
                                    height: "35px",
                                    backgroundColor: "#ED2228",
                                }}
                                onClick={() => reset()}
                            >
                                <Typography variant="subtitle2" color="white">
                                    Cancel
                                </Typography>
                            </LoadingButton>
                        </Box>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            pt: 6,
                            pb: 6,
                        }}
                    >
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={5} sx={{display: "flex", alignItems: "center", }}>
                                <Typography variant="h6" color="black"  sx={{alignSelf: "start", }}>
                                    Old Password
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={7} >
                                <Controller
                                    name="oldPassword"
                                    control={control}
                                    sx={{display: "flex", alignItems: "center", }}
                                    render={({
                                        field: { ref, ...fields },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            variant="outlined"
                                            placeholder="******************"
                                            size="small"
                                            InputProps={{
                                                style: {
                                                fontSize: "16px",
                                                color: "#000 !important",
                                                },
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                color: "black",
                                                },
                                            }}
                                            sx={formStyles}
                                            // label="Last Name"
                                            fullWidth
                                            {...fields}
                                            inputRef={ref}
                                            error={Boolean(error?.message)}
                                            helperText={error?.message}
                                            onKeyUp={() => {
                                                trigger("oldPassword");
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            pt: 6,
                            pb: 6,
                        }}
                    >
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={5} sx={{display: "flex", alignItems: "center", }}>
                                <Typography variant="h6" color="black" sx={{alignSelf: "start", }}>
                                    New Password
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={7} >
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    render={({
                                        field: { ref, ...fields },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="******************"
                                        InputProps={{
                                            style: {
                                            fontSize: "16px",
                                            color: "#000 !important",
                                            },
                                        }}
                                        InputLabelProps={{
                                            style: {
                                            color: "black",
                                            },
                                        }}
                                        sx={formStyles}
                                        // label="First Name"
                                        fullWidth
                                        {...fields}
                                        inputRef={ref}
                                        error={Boolean(error?.message)}
                                        helperText={error?.message}
                                        onKeyUp={() => {
                                            trigger("newPassword");
                                        }}
                                        />
                                    )}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                    <Divider />
                    <Divider />
                    <Box
                        sx={{
                            pt: 6,
                            pb: 6,
                        }}
                    >
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={5} sx={{display: "flex", alignItems: "center", }}>
                                <Typography variant="h6" color="black" sx={{alignSelf: "start", }}>
                                    Confirm Password
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={7} >
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({
                                        field: { ref, ...fields },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                        variant="outlined"
                                        size="small"
                                        InputProps={{
                                            style: {
                                            fontSize: "16px",
                                            color: "#000 !important",
                                            },
                                        }}
                                        InputLabelProps={{
                                            style: {
                                            color: "black",
                                            },
                                        }}
                                        sx={formStyles}
                                        // label="First Name"
                                        placeholder="******************"
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
                    </Box>
                    <Divider />
                    
                </Box>
            </Box>
            }       
        </>
    );
}
 
export default Password;

