import Api from "../api/api";

// export const fetchUser = async ({ queryKey }) => {
//   return Api.get(`/user`).then((res) => res.data);
// };
export const login = async (payload) => {
  return Api.post("login/", payload).then((res) => res.data);
};
