// import { Controller } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Grid, Box, Button, Typography } from '@mui/material';
// import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { West } from '@mui/icons-material';


const formStyles = {
    marginBottom: "20px",
    color: "black !important",
    background: "#F5F5F6",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      outline: "none",
      borderRadius: "3px",
      color: "#000",
      textAlign:"left"
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




const SignupStep3 = () => {
    
    
    const schema = yup.object().shape({
        phoneNumber: yup.string().required('Phone Number is required'),
        address: yup.string().required('Address is required'),
        emergencyContactFullName: yup.string().required('Emergency Contact Full Name is required'),
        emergencyContactPhoneNumber: yup.string().required('Emergency Contact Phone Number is required'),
        emergencyContactAddress: yup.string().required('Emergency Contact Address is required'),
        agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the Terms and Conditions'),
    });

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
      });

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
      };
      const onBackClick = (data) => {
        // Handle form submission
        console.log(data);
      };
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
                display: "flex",
                alignItems: "center",
                color: "#252B33"
              }}
            >
              <West onClick={onBackClick} fontSize='large' sx={{marginRight: "12px"}} /> Tell us more 
            </Typography>
            <form>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
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
                        label="Phone Number"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={7}>
                <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
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
                        label="Address"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={7}>
                <Controller
                    name="emergencyContactFullName"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
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
                        label="Emergency Contact Full Name"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={5}>
                <Controller
                    name="emergencyContactPhoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
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
                        label="Emergency Contact Phone Number"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12}>
                <Controller
                    name="emergencyContactAddress"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={formStyles}
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
                        label="Emergency Contact Address"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12}>
                <Controller
                    name="agreeToTerms"
                    control={control}
                    defaultValue={false}
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <FormControlLabel
                        control={
                        <Checkbox
                            {...fields}
                            inputRef={ref}
                            color="primary"
                            error={Boolean(error?.message)}
                            
                            
                        />
                        }
                        InputProps={{
                            style: {
                                fontSize: '16px',
                                color: "#000 !important",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "black !important",
                            },
                        }}
                        
                        // sx={formStyles}
                        label="I agree to the Terms and Conditions"
                    />
                    )}
                />
                </Grid>
            </Grid>
            </form>
            <Button
                fullWidth
                size="small"
                onClick={handleSubmit(onSubmit)}
            //   endIcon={<SendIcon />}
            //   loading={loading}
                // loadingPosition="end"
                variant="contained"
                sx={{
                    margin: "12px 0",
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
                Finish
            </Button>
        </Box>
    );
};


export default SignupStep3;