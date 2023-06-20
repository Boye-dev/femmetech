import Api from "../../../api/api";

export const login = async (payload) => {
  return Api.post("/patient/login/", payload).then((res) => res.data);
};

export const setPassword = async (payload) => {
  return Api.post("/personnels/create-password/", payload).then(
    (res) => res.data
  );
};
export const verifyToken = async (payload) => {
  return Api.post("/personnels/verify-token/", payload).then((res) => res.data);
};

export const forgotPassword = async (payload) => {
  return Api.post("/personnels/reset-password/", payload).then(
    (res) => res.data
  );
};
export const resetPassword = async (payload) => {
  return Api.post("/personnels/create-password/", payload).then(
    (res) => res.data
  );
};
