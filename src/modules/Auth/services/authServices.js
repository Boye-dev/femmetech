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

export const verifyPatient = async ({ queryKey }) => {
  const [, { token }] = queryKey;
  return Api.get(`/verify/${token}`).then((res) => res.data);
};
