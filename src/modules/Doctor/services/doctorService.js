import Api from "../../../api/api";

export const fetchInfo = async ({ queryKey }) => {
  const [, { doctorId }] = queryKey;
  return Api.get(`/appointments/info/doctor/${doctorId}`).then(
    (res) => res.data
  );
};
export const fetchUpcoming = async ({ queryKey }) => {
  const [, { doctorId }] = queryKey;
  return Api.get(`/appointments/upcoming/doctor/${doctorId}`).then(
    (res) => res.data
  );
};
export const fetchAppointmentsDoctor = async ({ queryKey }) => {
  const [, { doctorId, limit, page, status }] = queryKey;
  return Api.get(
    `/appointments/doctor/${doctorId}?page=${page}${
      limit ? "&limit=" + limit : ""
    }${status ? "&status=" + status : ""}`
  ).then((res) => res.data);
};

export const book = async (payload) => {
  return Api.post("/appointment/book/", payload).then((res) => res.data);
};
