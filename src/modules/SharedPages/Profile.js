import React from "react";
import {
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  EastOutlined,
  Person,
  Send,
  Visibility,
  VisibilityOff,
  West,
} from "@mui/icons-material";
import { useAlert } from "../../context/NotificationProvider";
import { useMutation, useQuery } from "react-query";
import {
  editPassword,
  editProfile,
  getUserById,
  signup,
} from "../Auth/services/authServices";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import loginImg from "../../assets/images/femmetech-logo-removebg-preview.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDecodedJwt } from "../../utils/auth";
const Profile = () => {
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const [selectedPicture, setSelectedPicture] = useState("");
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name Is Required"),
    lastName: yup.string().required("Last Name Is Required"),
    phone: yup.string().required("Phone Number Is Required"),
  });

  const { handleSubmit, trigger, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const schemaPassword = yup.object().shape({
    oldPassword: yup.string().required("Old Password Is Required"),
    newPassword: yup.string().required("New Password Is Required"),
    confirmPassword: yup
      .string()
      .required("Confrim Password Is Required")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const {
    handleSubmit: handleSubmitP,
    trigger: triggerP,
    control: controlP,
  } = useForm({
    resolver: yupResolver(schemaPassword),
  });
  const handlePictureClick = async () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";

    await inputElement.click();

    inputElement.onchange = (event) => {
      const file = event.target.files[0];

      setSelectedPicture(URL.createObjectURL(file));

      setValue("files", file);
    };
  };

  const { mutate, isLoading } = useMutation(editProfile, {
    onError: (error) => {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 500 || error.response.status === 400)
      ) {
        // Handle the 500 error here
        showNotification?.(
          error?.response?.data?.message ||
            error.response?.data?.name ||
            "Internal Server Error",
          {
            type: "error",
          }
        );
      } else {
        // Handle other errors
        console.log(error);
        showNotification?.(
          error.response.data.errors[0] ||
            error?.response?.data?.message ||
            error.response?.data?.name ||
            error.message ||
            error.error ||
            "An error occurred",
          {
            type: "error",
          }
        );
      }
    },
    onSuccess: (data) => {
      window.location.reload();
    },
  });
  const { mutate: mutateP, isLoading: isLoadingP } = useMutation(editPassword, {
    onError: (error) => {
      console.log({ error });

      if (
        error.response &&
        (error.response.status === 500 || error.response.status === 400)
      ) {
        // Handle the 500 error here
        showNotification?.(
          error?.response?.data?.message ||
            error.response?.data?.name ||
            "Internal Server Error",
          {
            type: "error",
          }
        );
      } else {
        // Handle other errors
        console.log(error);
        showNotification?.(
          error.response.data.errors[0] ||
            error?.response?.data?.message ||
            error.response?.data?.name ||
            error.message ||
            error.error ||
            "An error occurred",
          {
            type: "error",
          }
        );
      }
    },
    onSuccess: (data) => {
      window.location.reload();
    },
  });
  console.log(decodedUser);
  const { isLoading: userLoading, data } = useQuery(
    [
      "getUserById",
      {
        id: decodedUser?._id,
      },
    ],
    getUserById,
    {
      enabled: true,

      onError: (error) => {
        if (
          error.response &&
          (error.response.status === 500 || error.response.status === 400)
        ) {
          // Handle the 500 error here
          showNotification?.(
            error?.response?.data?.message ||
              error.response?.data?.name ||
              "Internal Server Error",
            {
              type: "error",
            }
          );
        } else {
          // Handle other errors
          console.log(error);
          showNotification?.(
            error.response.data.errors[0] ||
              error?.response?.data?.message ||
              error.response?.data?.name ||
              error.message ||
              error.error ||
              "An error occurred",
            {
              type: "error",
            }
          );
        }
      },
      onSuccess: (data) => {
        setSelectedPicture(data?.profilePicture);
      },
    }
  );
  const onSubmit = async (payload) => {
    console.log(payload);
    const formData = new FormData();
    formData.append("lastname", payload.lastName);
    formData.append("firstname", payload.firstName);

    formData.append("files", payload.files);

    formData.append("phone", payload.phone);

    mutate({ formData, id: decodedUser._id });
  };

  const onSubmitP = async (payload) => {
    mutateP({ payload, id: decodedUser._id });
  };

  const [values, setValues] = useState({
    vertical: "bottom",
    horizontal: "center",
    open: false,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const [values2, setValues2] = useState({
    vertical: "bottom",
    horizontal: "center",
    open: false,
    showPassword: false,
  });

  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword: !values2.showPassword,
    });
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10% 20%",
          }}
        >
          {userLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box
                onClick={handlePictureClick}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={100}
                height={100}
                borderRadius="50%"
                bgcolor="#F5F5F6"
                sx={{
                  border: "1px solid lightgray",
                  borderRadius: "50%",
                  marginRight: "12px",
                }}
              >
                {selectedPicture ? (
                  <img
                    src={selectedPicture}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box>
                    <Person
                      bgcolor="#F1F3F9"
                      style={{
                        fontSize: "70px",
                        color: "black",
                        background: "#F1F3F9",
                        padding: "6px",
                        border: "10px solid #F1F3F9",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Controller
                name="firstName"
                control={control}
                defaultValue={data?.firstname}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    size="small"
                    label="First Name"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    sx={{ mt: 5 }}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("firstName");
                    }}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue={data?.lastname}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Last Name"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    sx={{ mt: 5 }}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("lastName");
                    }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue={data?.email}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    disabled
                    sx={{ mt: 5 }}
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue={data?.phone}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Phone Number"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    sx={{ mt: 5, mb: 5 }}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("phone");
                    }}
                  />
                )}
              />
              <LoadingButton
                fullWidth
                size="small"
                loading={isLoading}
                onClick={handleSubmit(onSubmit)}
                endIcon={<Send />}
                loadingPosition="end"
                variant="contained"
                sx={{
                  fontSize: "18px !important",
                  background: "#87B7C7",
                  padding: "6px",
                  marginBottom: "6px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#87B7C7",
                    opacity: "0.9",
                  },
                }}
              >
                Edit Profile
              </LoadingButton>
              <Controller
                name="oldPassword"
                control={controlP}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    label="Old Password"
                    fullWidth
                    sx={{ mt: 5 }}
                    size="small"
                    {...fields}
                    type={values.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleClickShowPassword}>
                          {values.showPassword === true ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      ),
                      style: {
                        fontSize: "13px",
                      },
                    }}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      triggerP("oldPassword");
                    }}
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={controlP}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    label="New Password"
                    fullWidth
                    sx={{ mt: 5 }}
                    size="small"
                    {...fields}
                    type={values.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleClickShowPassword}>
                          {values.showPassword === true ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      ),
                      style: {
                        fontSize: "13px",
                      },
                    }}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      triggerP("newPassword");
                    }}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={controlP}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    label="Confirm Password"
                    fullWidth
                    sx={{ mt: 5, mb: 5 }}
                    size="small"
                    {...fields}
                    type={values2.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleClickShowPassword2}>
                          {values2.showPassword === true ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      ),
                      style: {
                        fontSize: "13px",
                      },
                    }}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      triggerP("confirmPassword");
                    }}
                  />
                )}
              />

              <LoadingButton
                fullWidth
                size="small"
                loading={isLoadingP}
                onClick={handleSubmitP(onSubmitP)}
                endIcon={<Send />}
                loadingPosition="end"
                variant="contained"
                sx={{
                  fontSize: "18px !important",
                  background: "#87B7C7",
                  padding: "6px",
                  marginBottom: "6px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#87B7C7",
                    opacity: "0.9",
                  },
                }}
              >
                Change Password
              </LoadingButton>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Profile;

// firstname,
// lastname,
// email,
// phone,
// role,
// password,
// files,
// schedule
