import Api from "../../../api/api";

export const fetchInfo = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;

  return Api.get(`/appointments/info/${patientId}`).then((res) => res.data);
};
export const fetchConsultants = async ({ queryKey }) => {
  return Api.get(`/consultants`).then((res) => res.data);
};
export const fetchUserById = async ({ queryKey }) => {
  const [, { user }] = queryKey;

  return Api.get(`/users/${user}`).then((res) => res.data);
};
export const fetchUpcoming = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/appointments/upcoming/${patientId}`).then((res) => res.data);
};

export const fetchAppointments = async ({ queryKey }) => {
  const [, { user, status, filter }] = queryKey;
  return Api.get(
    `/appointments/${user}?status=${status}&filter=${filter}`
  ).then((res) => res.data);
};
export const fetchAppointmentById = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  return Api.get(`/appointment/${id}`).then((res) => res.data);
};
export const profileUpdate = async (formData) => {
  const _id = formData.get("_id");
  return Api.put(`/patient/editProfile/${_id}`, formData).then(
    (res) => res.data
  );
};

export const passwordChange = async (payload) => {
  return Api.put(`/patient/updatePassword/${payload.id}`, payload).then(
    (res) => res.data
  );
};
export const fetchPastAppointmentsDoctor = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/past-appointments/patient/${patientId}`).then(
    (res) => res.data
  );
};
export const book = async (payload) => {
  try {
    return Api.post("/appointment/book/", payload).then((res) => res.data);
  } catch (error) {
    return error;
  }
};
export const cancel = async (payload) => {
  return Api.put(
    `/appointment/cancel/${payload.appointmentId}/${payload.userId}`,
    payload
  ).then((res) => res.data);
};
export const reschedule = async (payload) => {
  return Api.put(
    `/appointment/reschedule/${payload.appointmentId}`,
    payload
  ).then((res) => res.data);
};

export const fetchChats = async ({ queryKey }) => {
  const [, { userId }] = queryKey;
  return Api.get(`/chats/${userId}`).then((res) => res.data);
};
export const fetchGroups = async ({ queryKey }) => {
  const [, { userId }] = queryKey;
  return Api.get(`/groups/${userId}`).then((res) => res.data);
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
export const fetchUsers = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  return Api.get(`/users/chat/${id}`).then((res) => res.data);
};

export const fetchPosts = async ({ queryKey }) => {
  // const [, {}] = queryKey;
  return Api.get("/posts").then((res) => res.data);
};
export const fetchJournal = async ({ queryKey }) => {
  const [, { user }] = queryKey;
  return Api.get(`/journals/${user}`).then((res) => res.data);
};

export const fetchJournalById = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  return Api.get(`/journal/${id}`).then((res) => res.data);
};
export const fetchPost = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  return Api.get(`/post/${id}`).then((res) => res.data);
};

export const createPost = async (formData) => {
  return Api.post("/create-post", formData).then((res) => res.data);
};
export const createJournal = async (payload) => {
  return Api.post("/create-journal", payload).then((res) => res.data);
};
export const createAppointment = async (payload) => {
  return Api.post("/create-appointment", payload).then((res) => res.data);
};
export const updateAppointment = async (payload) => {
  return Api.put(`/update-appointment/${payload.id}`, payload).then(
    (res) => res.data
  );
};
export const createChat = async (payload) => {
  return Api.post("/create-chat", payload).then((res) => res.data);
};
export const createMessage = async ({ formData, chat }) => {
  return Api.post(`/create-message/${chat}`, formData).then((res) => res.data);
};
export const updateJournal = async (payload) => {
  return Api.put(`/update-journal/${payload.id}`, payload).then(
    (res) => res.data
  );
};
export const deleteJournal = async (payload) => {
  return Api.delete(`/delete-journal/${payload.id}`).then((res) => res.data);
};

export const likePost = async (payload) => {
  return Api.put(`/like-post/${payload.id}`, payload).then((res) => res.data);
};

export const createComment = async (payload) => {
  return Api.put(`/add-comment/${payload.id}`, payload).then((res) => res.data);
};
