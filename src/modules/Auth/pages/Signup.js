import {
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
  Send,
  Visibility,
  VisibilityOff,
  West,
} from "@mui/icons-material";
import { useAlert } from "../../../context/NotificationProvider";
import { useMutation } from "react-query";
import { signup } from "../services/authServices";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import loginImg from "../../../assets/images/femmetech-logo-removebg-preview.png";

import { yupResolver } from "@hookform/resolvers/yup";

const Signup = () => {
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const { mutate, isLoading } = useMutation(signup, {
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
      navigate("/verify", { replace: true });
    },
  });
  const onSubmit = async (payload) => {
    const formData = new FormData();
    formData.append("lastname", payload.lastName);
    formData.append("firstname", payload.firstName);
    formData.append("email", payload.email);

    formData.append("phone", payload.phone);
    formData.append("password", payload.password);
    formData.append("role", payload.role);

    mutate(formData);
  };
  const schema = yup.object().shape({
    email: yup.string().required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
    confirmPassword: yup
      .string()
      .required("Confrim Password Is Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    firstName: yup.string().required("First Name Is Required"),
    lastName: yup.string().required("Last Name Is Required"),
    phone: yup.string().required("Phone Number Is Required"),
    role: yup.string().required("Role Is Required"),
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
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",

          textAlign: "center",

          display: "flex",
          alignItems: "center",
          height: { xs: "100vh", md: "100vh" },
        }}
      >
        <Box
          sx={{
            margin: "auto",
            width: { xs: "80%", md: "35%" },
            backgroundColor: "#F8F8F8",
            borderRadius: "10px",
            padding: "20px 30px",
          }}
        >
          <Box
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mb: 5,
            }}
          >
            <img
              src={loginImg}
              alt={"logo"}
              width="250px"
              height="250px"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              marginBottom: "12px",
              fontWeight: 700,
              // marginTop: "10vh",
              fontSize: "28px !important",
            }}
          >
            Sign up <span style={{ color: "#87B7C7" }}> FemmeTech</span>
          </Typography>

          <form action="">
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  label="Email"
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
              defaultValue=""
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
                  sx={{ mt: 5 }}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    trigger("phone");
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
                  label="Password"
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
                    trigger("password");
                  }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
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
                    trigger("confirmPassword");
                  }}
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <RadioGroup
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  onKeyUp={() => {
                    trigger("role");
                  }}
                >
                  <FormControlLabel
                    value="PATIENT"
                    control={<Radio />}
                    label="Patient"
                  />
                  <FormControlLabel
                    value="CONSULTANT"
                    control={<Radio />}
                    label="Consultant"
                  />
                  <Typography
                    color="#F48989"
                    variant="caption"
                    sx={{ textAlign: "left" }}
                  >
                    {error?.message}
                  </Typography>
                </RadioGroup>
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
              Sign Up
            </LoadingButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  marginTop: "10px",
                  color: "black",
                }}
              >
                Already have an account?{" "}
                <Link
                  style={{ decoration: "none", color: "#87B7C7" }}
                  to={"/signin"}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
