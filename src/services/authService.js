import Api from "../api/api";

export const fetchUser = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/patient/${patientId}`).then((res) => res.data);
};
export const login = async (payload) => {
  return Api.post("/patient/login/", payload).then((res) => res.data);
};
