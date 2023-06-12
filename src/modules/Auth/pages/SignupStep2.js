import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { EastOutlined, Person, West } from '@mui/icons-material';
import { Badge, Button, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


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


const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "not-specified", label: "Prefer Not to Say" },
];

const relationshipStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

const schema = yup.object().shape({
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  relationshipStatus: yup.string().required("Relationship Status is required"),
  existingMedicalConditions: yup.string().required("Existing Medical Conditions is required"),
  allergies: yup.string().required("Allergies is required"),
  profilePicture: yup.mixed().nullable(),
});

const SignupStep2 = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedPicture, setSelectedPicture] = useState(null);

  // ...

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setSelectedPicture(file);
    console.log(file);
  };

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  const onBackClick = (data) => {
    // Handle form submission
    console.log(data);
  };

  const handlePictureClick = async () => {
      // inputElement.click();
      
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        
    await inputElement.click();
    
    inputElement.onchange = async (event) => {
        const file = event.target.files[0];
        setSelectedPicture(file);
        
        setValue('profilePicture', file);
        // const reader = new FileReader();
        // reader.onload = (e) => {
        // const imageDataUrl = e.target.result;
        
        // // Update the form's data with the selected image
        // setValue('profilePicture', imageDataUrl);
        // console.log(imageDataUrl);
        // };
        
        // reader.readAsDataURL(file);
    };
  };

//   const [inputValue, setInputValue] = useState('');
//   const [arrayValues, setArrayValues] = useState([]);

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleInputKeyPress = (event) => {
//     if (event.key === 'Enter' || event.key === ',') {
//       event.preventDefault();
//       addArrayValue();
//     }
//   };

//   const addArrayValue = () => {
//     const value = inputValue.trim();

//     if (value) {
//       setArrayValues((prevArray) => [...prevArray, value]);
//       setInputValue('');
//     }
//   };

//   const removeArrayValue = (index) => {
//     setArrayValues((prevArray) => prevArray.filter((_, i) => i !== index));
//   };



  return (
    <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
            
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
              <West onClick={onBackClick} fontSize='large' sx={{marginRight: "12px"}} /> Tell us more about yourself
            </Typography>
            {/* <TextField
                label="Array Values"
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
            />
            <div>
                {arrayValues.map((value, index) => (
                <Chip
                    key={index}
                    label={value}
                    onDelete={() => removeArrayValue(index)}
                    style={{ margin: '4px' }}
                />
                ))}
            </div> */}
            <Box display="flex" justifyContent="center" mb={3}>
                {/* Profile picture selection */}
                <Box textAlign="center" mb={3}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={150}
                        height={150}
                        borderRadius="50%"
                        bgcolor="#F5F5F6"
                    >
                        <Badge
                            badgeContent={<AddPhotoAlternateIcon />}
                            onClick={handlePictureClick}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            sx={{
                                position: 'relative',
                                '& .MuiBadge-badge': {
                                backgroundColor: '#fff',
                                color: '#000',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                padding: '2px',
                                boxShadow: '0 0 0 3px #fff',
                                cursor: 'pointer',
                                },
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={120}
                                height={120}
                                borderRadius="50%"
                                bgcolor="#FFFFFF"
                            >
                                {selectedPicture ? (
                                    <img src={URL.createObjectURL(selectedPicture)} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: "50%", objectFit: 'cover' }} />
                                ) : (
                                    <Person bgcolor="#F5F5F6" style={{fontSize:'90px', background: "#F5F5F6", padding: "6px", boder: "10px solid #fff", borderRadius: "50%"}}/>
                                )}
                            </Box>
                        </Badge>
                    </Box>
                </Box>
            </Box>


            <Grid container spacing={2}>
                <Grid item xs={3}>
                <Controller
                    name="gender"
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
                        label="Gender"
                        select
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    >
                        {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                    )}
                />
                </Grid>
                <Grid item xs={9}>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue={null}
                    render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                    <TextField
                        variant="outlined"
                        size="small"
                        InputProps={{
                            style: {
                                fontSize: '16px',
                                color: "#000 !important",
                            },
                            placeholder: '',
                        }}
                        placeholder=''
                        InputLabelProps={{
                            style: {
                                color: "black",
                            },
                        }}
                        sx={formStyles}
                        // label="Date of Birth"
                        type="date"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={6}>
                <Controller
                    name="relationshipStatus"
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
                        label="Relationship Status"
                        select
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    >
                        {relationshipStatusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                    )}
                />
                </Grid>
                <Grid item xs={6}>
                <Controller
                    name="existingMedicalConditions"
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
                        label="Existing Medical Conditions"
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
                    name="allergies"
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
                        label="Allergies"
                        fullWidth
                        {...fields}
                        inputRef={ref}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
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
                Continue <EastOutlined sx={{marginLeft: "12px"}}/>
            </Button>
        </form>
    </Box>
  );
};

export default SignupStep2;
