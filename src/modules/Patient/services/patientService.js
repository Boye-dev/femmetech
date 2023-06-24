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

export const book = async (payload) => {
  return Api.post("/appointment/book/", payload).then((res) => res.data);
};

export const fetchChats = async ({ queryKey }) => {
  const [, { userId }] = queryKey;
  return Api.get(`/chats/${userId}`).then((res) => res.data);
};
export const fetchMessages = async ({ queryKey }) => {
  const [, { chatId }] = queryKey;
  return Api.get(`/messages/${chatId}`).then((res) => res.data);
};
export const postMessages = async (payload) => {
  return Api.post(`/message/${payload.userId}`, payload).then(
    (res) => res.data
  );
};
