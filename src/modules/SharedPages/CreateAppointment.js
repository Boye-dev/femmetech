import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import {
  createAppointment,
  fetchAppointmentById,
  fetchConsultants,
  fetchUserById,
  updateAppointment,
} from "../Patient/services/patientService";
import { useMutation, useQuery } from "react-query";
import { useAlert } from "../../context/NotificationProvider";
import { getDecodedJwt } from "../../utils/auth";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";

const CreateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const { mutate, isLoading: isCreating } = useMutation(createAppointment, {
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (data) => {
      showNotification?.("Appointment Booked Successfully", {
        type: "success",
      });
      navigate(-1);
    },
  });
  const { mutate: update, isLoading: isUpdating } = useMutation(
    updateAppointment,
    {
      onError: (error) => {
        handleErrors(error);
      },
      onSuccess: (data) => {
        showNotification?.("Appointment updated Successfully", {
          type: "success",
        });
        navigate(-1);
      },
    }
  );
  const disabledDates = (day) => {
    const newDay = new Date(day).getDay();
    if (consultant) {
      if (consultant.schedule.friday.length <= 0 && newDay === 5) {
        return true;
      }
      if (consultant.schedule.saturday.length <= 0 && newDay === 6) {
        return true;
      }
      if (consultant.schedule.sunday.length <= 0 && newDay === 0) {
        return true;
      }
      if (consultant.schedule.monday.length <= 0 && newDay === 1) {
        return true;
      }
      if (consultant.schedule.tuesday.length <= 0 && newDay === 2) {
        return true;
      }
      if (consultant.schedule.wednesday.length <= 0 && newDay === 3) {
        return true;
      }
      if (consultant.schedule.thursday.length <= 0 && newDay === 4) {
        return true;
      }
    }
  };

  const decodedUser = getDecodedJwt();
  const [selectedHour, setSelectedHour] = useState();
  const [selectedHourEnd, setSelectedHourEnd] = useState();
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState();
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [description, setDescription] = useState("");
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [consultant, setConsultant] = useState();
  const [startHours, setStartHours] = React.useState([]);

  const handleChange = (event) => {
    setSelectedHour(event.target.value);
  };
  const handleChangeMinute = (event) => {
    setSelectedMinute(event.target.value);
  };
  const handleChangeEnd = (event) => {
    setSelectedHourEnd(event.target.value);
  };
  const handleChangeMinuteEnd = (event) => {
    setSelectedMinuteEnd(event.target.value);
  };

  const { showNotification } = useAlert();

  const { data, isLoading } = useQuery(["consultants"], fetchConsultants, {
    onError: (error) => {
      showNotification?.(
        error.response?.data?.message ||
          error.response?.data?.name ||
          error.message,
        {
          type: "error",
        }
      );
    },
  });
  const { data: appointment, isLoading: isLoadingAppointmnet } = useQuery(
    ["appointment", { id: id }],
    fetchAppointmentById,
    {
      onError: (error) => {
        showNotification?.(
          error.response?.data?.message ||
            error.response?.data?.name ||
            error.message,
          {
            type: "error",
          }
        );
      },
      enabled: Boolean(id),
    }
  );
  useEffect(() => {
    if (appointment) {
      setValue(appointment.consultant);
    }
  }, [id, appointment]);

  const { isLoading: isLoadingUser } = useQuery(
    ["user-by-id", { user: value?._id }],
    fetchUserById,
    {
      onError: (error) => {
        showNotification?.(
          error.response?.data?.message ||
            error.response?.data?.name ||
            error.message,
          {
            type: "error",
          }
        );
      },
      enabled: Boolean(value?._id),
      onSuccess: (data) => {
        setConsultant(data);
      },
    }
  );

  useEffect(() => {
    if (!value) {
      setSelectedDate();
    }
  }, [value]);

  useEffect(() => {
    setStartHours([]);
    const day = new Date(selectedDate).getDay();
    const dayOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayPicked = dayOfTheWeek[day];
    if (consultant && selectedDate) {
      for (const { open, close } of consultant?.schedule[dayPicked]) {
        for (let i = open.split(":")[0]; i <= close.split(":")[0]; i++) {
          setStartHours((prev) => [
            ...prev,
            i <= 9 ? `0${Number(i)}` : Number(i),
          ]);
        }
      }
    }
  }, [consultant, selectedDate]);

  const onSubmit = () => {
    if (id) {
      const payload = {
        id: id,

        date: selectedDate,
        startTime: `${selectedHour}:${selectedMinute}`,
        endTime: `${selectedHourEnd}:${selectedMinuteEnd}`,
        consultant: consultant._id,
      };
      if (selectedHourEnd < selectedHour) {
        showNotification?.("End time cannot be less than start time", {
          type: "error",
        });
      } else if (selectedMinuteEnd <= selectedMinute) {
        if (selectedMinuteEnd === "00") {
          update(payload);
        } else {
          showNotification?.("End time cannot be less than start time", {
            type: "error",
          });
        }
      } else {
        update(payload);
      }
    } else {
      const payload = {
        patient: decodedUser._id,
        consultant: consultant._id,
        description,
        date: selectedDate,
        startTime: `${selectedHour}:${selectedMinute}`,
        endTime: `${selectedHourEnd}:${selectedMinuteEnd}`,
      };
      if (selectedHourEnd < selectedHour) {
        showNotification?.("End time cannot be less than start time", {
          type: "error",
        });
      } else if (selectedMinuteEnd <= selectedMinute) {
        if (selectedMinuteEnd === "00") {
          mutate(payload);
        } else {
          showNotification?.("End time cannot be less than start time", {
            type: "error",
          });
        }
      } else {
        mutate(payload);
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          marginTop: "20px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLoading || isLoadingAppointmnet ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h4" mb={8}>
              {id ? "Update" : "Create"} Appointment
            </Typography>
            {Boolean(id) || (
              <>
                <Autocomplete
                  mb={8}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  sx={{ width: 300, mb: 8 }}
                  options={data}
                  noOptionsText={"No options"}
                  getOptionLabel={(consultant) =>
                    `${consultant.lastname} ${consultant.firstname} `
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      label={"Consultant"}
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ width: 300, mb: 8 }}
                  label="Description"
                  rows={10}
                  multiline
                />
              </>
            )}
            {value &&
              (isLoadingUser ? (
                <Box>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{}}>
                  <DateCalendar
                    sx={{ width: 300, mb: 8 }}
                    disablePast
                    shouldDisableDate={disabledDates}
                    value={selectedDate}
                    onChange={(newValue) => {
                      const newDate = new Date(newValue);
                      setSelectedHour();
                      setSelectedHourEnd();
                      setSelectedMinute();
                      setSelectedMinuteEnd();

                      setSelectedDate(
                        `${newDate.getUTCFullYear()}-${
                          newDate.getMonth() + 1 > 9
                            ? newDate.getMonth() + 1
                            : `0${newDate.getMonth() + 1}`
                        }-${newDate.getDate()}`
                      );
                    }}
                  />
                </Box>
              ))}

            {selectedDate !== undefined && (
              <>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5">Start Time</Typography>
                  <Box sx={{ display: "flex", mt: 5 }}>
                    <FormControl sx={{ width: 150, mb: 8 }}>
                      <InputLabel id="start-hour">hh</InputLabel>
                      <Select
                        labelId="start-hour"
                        value={selectedHour}
                        label="hh"
                        onChange={handleChange}
                      >
                        {startHours?.map((item) => {
                          return <MenuItem value={item}>{item}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ width: 150, mb: 8 }}>
                      <InputLabel id="start-min">mm</InputLabel>
                      <Select
                        labelId="start-min"
                        value={selectedMinute}
                        label="mm"
                        onChange={handleChangeMinute}
                      >
                        {["00", "10", "20", "30", "40", "50"]?.map((item) => {
                          return <MenuItem value={item}>{item}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography variant="h5">End Time</Typography>
                  <Box sx={{ display: "flex", mt: 5 }}>
                    <FormControl sx={{ width: 150, mb: 8 }}>
                      <InputLabel id="start-hour">hh</InputLabel>
                      <Select
                        labelId="start-hour"
                        value={selectedHourEnd}
                        label="hh"
                        onChange={handleChangeEnd}
                      >
                        {startHours?.map((item) => {
                          return <MenuItem value={item}>{item}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ width: 150, mb: 8 }}>
                      <InputLabel id="start-min">mm</InputLabel>
                      <Select
                        labelId="start-min"
                        value={selectedMinuteEnd}
                        label="mm"
                        onChange={handleChangeMinuteEnd}
                      >
                        {["00", "10", "20", "30", "40", "50"]?.map((item) => {
                          return <MenuItem value={item}>{item}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </>
            )}

            <LoadingButton
              loading={isCreating || isUpdating}
              variant="contained"
              sx={{ color: "white", mb: 8 }}
              onClick={onSubmit}
              disabled={
                id
                  ? !selectedHour ||
                    !selectedDate ||
                    !selectedHourEnd ||
                    !selectedMinute ||
                    !selectedMinuteEnd
                  : !selectedHour ||
                    !selectedDate ||
                    !selectedHourEnd ||
                    !selectedMinute ||
                    !selectedMinuteEnd ||
                    !value ||
                    !description
              }
            >
              {id ? "Update" : "Create"} Appointment
            </LoadingButton>
          </>
        )}
      </Box>
    </>
  );
};

export default CreateAppointment;
