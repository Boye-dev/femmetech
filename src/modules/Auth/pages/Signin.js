import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { AdminPaths, BasePaths } from "../../../routes/paths";
import { Roles } from "../../../constants/roles";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useAlert } from "../../../context/NotificationProvider";
// import { yupResolver } from "@hookform/resolvers/yup";
import { getDecodedJwt, setToken } from "../../../utils/auth";
import handleApiError from "../../../utils/handleApiError";
import { useMutation } from "react-query";
import { login } from "../services/authServices";
import { useLocation, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  // const validationSchema = yup.object().shape({
  //   email: yup.string().email().required(),
  //   password: yup.string().required(),
  // });
  const { handleSubmit, control } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setNavigationPath = (user) => {
    if (user?.role?.includes(Roles.ADMIN)) {
      return `${AdminPaths.MDA_DETAILS}/${user.mda}`;
    } else if (user?.role?.includes(Roles.ADMIN)) {
      return AdminPaths.MDAS;
    } else {
      return BasePaths.USER;
    }
  };
  const { mutate, isLoading } = useMutation(login, {
    onError: (error) => {
      showNotification?.(handleApiError(error), { type: "error" });
    },
    onSuccess: (data) => {
      setToken(data?.token);

      const decodedUser = getDecodedJwt();

      if (
        decodedUser?.role?.length &&
        decodedUser?.role?.includes(Roles.ADMIN)
      ) {
        navigate(BasePaths.ADMIN, { replace: true });
      } else {
        const path =
          from?.split("/")[0] === "super" && decodedUser?.role === Roles.ADMIN
            ? from
            : setNavigationPath(decodedUser);

        navigate(path, { replace: true });
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const { showNotification } = useAlert();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...fields }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Email"
              type="email"
              error={Boolean(error?.message)}
              helperText={error?.message}
              inputRef={ref}
              {...fields}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { ref, ...fields }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Password"
              error={Boolean(error?.message)}
              helperText={error?.message}
              inputRef={ref}
              {...fields}
              variant="outlined"
            />
          )}
        />
        <Button
          fullWidth
          disableElevation
          variant="contained"
          sx={{
            textTransform: "none",
            padding: "10px",
            fontWeight: 600,
          }}
          type="submit"
          disabled={isLoading}
          startIcon={
            isLoading && (
              <CircularProgress
                size={16}
                sx={{
                  fontSize: 1,
                }}
              />
            )
          }
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Signin;
