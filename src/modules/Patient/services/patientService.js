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
export const fetchAnnouncements = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/announcements/${patientId}`).then((res) => res.data);
};
export const updateStatusToRead = async ({ queryKey }) => {
  const [, { patientId, announcementId }] = queryKey;
  return Api.put(`/announcements/${announcementId}/${patientId}`).then((res) => res.data);
};

export const book = async (payload) => {
  return Api.post("/appointment/book/", payload).then((res) => res.data);
};
