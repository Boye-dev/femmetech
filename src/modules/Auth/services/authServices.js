import Api from "../../../api/api";

export const login = async (payload) => {
  return Api.post(`/signin`, payload).then((res) => res.data);
};
export const schedule = async (payload) => {
  return Api.put(`/add-schedule/${payload.id}`, payload).then(
    (res) => res.data
  );
};

export const signup = async (payload) => {
  return Api.post(`/signup`, payload).then((res) => res.data);
};
export const editProfile = async ({ formData, id }) => {
  return Api.put(`/edit-profile/${id}`, formData).then((res) => res.data);
};
export const editPassword = async ({ payload, id }) => {
  return Api.put(`/edit-password/${id}`, payload).then((res) => res.data);
};

export const verifyPatient = async ({ queryKey }) => {
  const [, { token }] = queryKey;
  return Api.get(`/verify/${token}`).then((res) => res.data);
};

export const getUserById = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  return Api.get(`/users/${id}`).then((res) => res.data);
};
