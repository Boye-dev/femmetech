import Api from "../../../api/api";

export const fetchInfo = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/appointments/info/${patientId}`).then((res) => res.data);
};
export const fetchUpcoming = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/appointments/upcoming/${patientId}`).then((res) => res.data);
};
export const fetchAppointments = async ({ queryKey }) => {
  const [, { patientId, limit, page, status }] = queryKey;
  return Api.get(
    `/appointments/${patientId}?page=${page}${limit ? "&limit=" + limit : ""}${
      status ? "&status=" + status : ""
    }`
  ).then((res) => res.data);
};
