import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../context/NotificationProvider";
import { useMutation } from "react-query";
import { schedule } from "../../Auth/services/authServices";
import { LoadingButton } from "@mui/lab";
import { getDecodedJwt } from "../../../utils/auth";

const Scheduler = () => {
  const scheduleSet = JSON.parse(localStorage.getItem("scheduleSet"));
  const navigate = useNavigate();
  const [scheduled, setScheduled] = useState(scheduleSet);
  const { showNotification } = useAlert();
  const decodedUser = getDecodedJwt();
  const handleErrors = (error) => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 400)
    ) {
      // Handle the 500 error here
      showNotification?.(
        error?.response?.data?.message ||
          error.response?.data?.name ||
          error?.response?.data?.errors[0] ||
          "Internal Server Error",
        {
          type: "error",
        }
      );
    } else {
      // Handle other errors
      console.log(error);
      showNotification?.(
        error?.response?.data?.errors[0] ||
          error?.response?.data?.message ||
          error.response?.data?.name ||
          error?.message ||
          error?.error ||
          "An error occurred",
        {
          type: "error",
        }
      );
    }
  };
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      monday: [{ open: "", close: "" }],
      tuesday: [{ open: "", close: "" }],
      wednesday: [{ open: "", close: "" }],
      thursday: [{ open: "", close: "" }],
      friday: [{ open: "", close: "" }],
      saturday: [{ open: "", close: "" }],
      sunday: [{ open: "", close: "" }],
      mondaycheck: false,
      tuesdaycheck: false,
      wednesdaycheck: false,
      thursdaycheck: false,
      fridaycheck: false,
      saturdaycheck: false,
      sundaycheck: false,
    },
  });
  const {
    fields: fieldsmonday,
    append: appendmonday,
    remove: removemonday,
  } = useFieldArray({
    control,
    name: "monday",
  });
  const {
    fields: fieldstuesday,
    append: appendtuesday,
    remove: removetuesday,
  } = useFieldArray({
    control,
    name: "tuesday",
  });
  const {
    fields: fieldswednesday,
    append: appendwednesday,
    remove: removewednesday,
  } = useFieldArray({
    control,
    name: "wednesday",
  });
  const {
    fields: fieldsthursday,
    append: appendthursday,
    remove: removethursday,
  } = useFieldArray({
    control,
    name: "thursday",
  });
  const {
    fields: fieldsfriday,
    append: appendfriday,
    remove: removefriday,
  } = useFieldArray({
    control,
    name: "friday",
  });
  const {
    fields: fieldssaturday,
    append: appendsaturday,
    remove: removesaturday,
  } = useFieldArray({
    control,
    name: "saturday",
  });
  const {
    fields: fieldssunday,
    append: appendsunday,
    remove: removesunday,
  } = useFieldArray({
    control,
    name: "sunday",
  });
  const {
    mondaycheck,
    tuesdaycheck,
    wednesdaycheck,
    thursdaycheck,
    fridaycheck,
    saturdaycheck,
    sundaycheck,
  } = watch();
  useEffect(() => {
    if (fridaycheck) {
      removefriday({});
    }
  }, [fridaycheck]);
  useEffect(() => {
    if (thursdaycheck) {
      removethursday({});
    }
  }, [thursdaycheck]);
  useEffect(() => {
    if (wednesdaycheck) {
      removewednesday({});
    }
  }, [wednesdaycheck]);
  useEffect(() => {
    if (tuesdaycheck) {
      removetuesday({});
    }
  }, [tuesdaycheck]);
  useEffect(() => {
    if (mondaycheck) {
      removemonday({});
    }
  }, [mondaycheck]);
  useEffect(() => {
    if (saturdaycheck) {
      removesaturday({});
    }
  }, [saturdaycheck]);
  useEffect(() => {
    if (sundaycheck) {
      removesunday({});
    }
  }, [sundaycheck]);
  const { mutate, isLoading } = useMutation(schedule, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      setScheduled(true);
      localStorage.setItem("scheduleSet", true);
      if (data?.role === "PATIENT") {
        navigate("/patient");
      } else if (data?.role === "CONSULTANT") {
        navigate("/consultant");
      }
    },
  });
  const onSubmit = (data) => {
    let payload = {};
    let scheduler = {};
    scheduler["monday"] = data.monday;
    scheduler["tuesday"] = data.tuesday;
    scheduler["wednesday"] = data.wednesday;
    scheduler["thursday"] = data.thursday;
    scheduler["friday"] = data.friday;
    scheduler["saturday"] = data.saturday;
    scheduler["sunday"] = data.sunday;

    payload.schedule = scheduler;

    payload.id = decodedUser._id;
    mutate(payload);
  };

  return (
    <>
      <Dialog
        open={!scheduled}
        PaperProps={{
          sx: {
            p: 0,
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "330px", md: "500px" },
            height: "auto",
            pt: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h4">Set Schedule</Typography>
            </Box>
          </Box>
          <Divider />

          <Box
            sx={{
              maxHeight: "calc(70vh - 170px)",
              overflowY: "auto",
              width: "100%",
            }}
          >
            <Box sx={{ padding: "10px 20px" }}>
              {[
                {
                  name: "Monday",
                  fields: fieldsmonday,
                  append: appendmonday,
                  remove: removemonday,
                },
                {
                  name: "Tuesday",
                  fields: fieldstuesday,
                  append: appendtuesday,
                  remove: removetuesday,
                },
                {
                  name: "Wednesday",
                  fields: fieldswednesday,
                  append: appendwednesday,
                  remove: removewednesday,
                },
                {
                  name: "Thursday",
                  fields: fieldsthursday,
                  append: appendthursday,
                  remove: removethursday,
                },
                {
                  name: "Friday",
                  fields: fieldsfriday,
                  append: appendfriday,
                  remove: removefriday,
                },
                {
                  name: "Saturday",
                  fields: fieldssaturday,
                  append: appendsaturday,
                  remove: removesaturday,
                },
                {
                  name: "Sunday",
                  fields: fieldssunday,
                  append: appendsunday,
                  remove: removesunday,
                },
              ].map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 10,
                    }}
                  >
                    <Box>
                      <Typography>{item.name}</Typography>
                      <Controller
                        name={`${item.name.toLowerCase()}check`}
                        control={control}
                        render={({
                          field: { ref, ...fields },
                          fieldState: { error },
                        }) => (
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Closed"
                            {...fields}
                            inputRef={ref}
                          />
                        )}
                      />
                    </Box>
                    <Box sx={{ width: "60%" }}>
                      {item.fields.map((v, index) => (
                        <Box
                          key={v}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 5,
                          }}
                        >
                          <Controller
                            name={`${item.name?.toLowerCase()}.${index}.open`}
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { ref, ...fields },
                              fieldState: { error },
                            }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                label="Open At"
                                type="time"
                                sx={{ width: "100px" }}
                                {...fields}
                                inputRef={ref}
                                error={Boolean(error?.message)}
                                helperText={error?.message}
                              />
                            )}
                          />
                          <Controller
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { ref, ...fields },
                              fieldState: { error },
                            }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                label="Close At"
                                type="time"
                                sx={{ width: "100px" }}
                                {...fields}
                                inputRef={ref}
                                error={Boolean(error?.message)}
                                helperText={error?.message}
                              />
                            )}
                            name={`${item.name?.toLowerCase()}.${index}.close`}
                            control={control}
                          />
                          <Delete
                            onClick={() => item.remove(index)}
                            sx={{ cursor: "pointer" }}
                          />
                        </Box>
                      ))}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => item.append({ open: "", close: "" })}
                      >
                        <Add />
                        <Typography>Add Time</Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                padding: "10px 20px 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LoadingButton
                loading={isLoading}
                fullWidth
                variant="contained"
                sx={{ color: "white" }}
                onClick={handleSubmit(onSubmit)}
              >
                Set Schedule
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Scheduler;
