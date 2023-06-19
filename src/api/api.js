import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { toast } from "react-toastify";
import {
  getRefreshToken,
  getToken,
  isAuthenticated,
  removeToken,
  setToken,
} from "../utils/auth";

let refreshed = false;

export const baseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api/v2";

// "https://backendtemplate-production.up.railway.app/api/v1";
export const subscriber = new BehaviorSubject(0);
const Api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Request interceptor for API calls
Api.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: isAuthenticated() ? `Bearer ${getToken()}` : "",
    };
    return config;
  },
  (err) => {
    if (
      err?.response?.status === 401 &&
      err?.response?.data?.detail === "Incorrect authentication credentials." &&
      !refreshed
    ) {
      refreshed = true;
      Api.post("/auth/token/refresh/", {
        refresh: getRefreshToken(),
      })
        .then((res) => {
          setToken(res.data.access);
          Api(err.config);
        })
        .catch((error) => {
          toast.error(error?.message || "Session expired", {
            position: "top-center",
          });
          setTimeout(() => {
            removeToken();
            window.history.pushState({}, "User Login", "/login");
          }, 4000);
          return error;
        });
      return;
    }
    refreshed = false;
    // Promise.reject(err);
    return err;
  }
);

// Response interceptor for API calls
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log({ error });
    // const originalRequest = error?.config;
    // if (error?.response?.status === 401 && !originalRequest?._retry) {
    //   originalRequest._retry = true;
    //   const rToken = getRefreshToken();
    //   if (rToken) {
    //     const access_token = await refreshToken(rToken);
    //     axios.defaults.headers.common["Authorization"] =
    //       "Bearer " + access_token;
    //   }
    //   return Api(originalRequest);
    // }
    return Promise.reject(error);
  }
);

// function refreshToken(token: string) {
//   return Api.post("/auth/token/refresh/", {
//     refresh: token,
//   });
// }

export const Post = async (url, data, config, newUrl) => {
  try {
    return await axios.post(`${newUrl ? newUrl : baseUrl}${url}`, data, {
      responseType: "blob",
      headers: {
        Authorization: isAuthenticated() ? `Bearer ${getToken()}` : "",
        ...config,
      },
    });
  } catch (error) {
    subscriber.next(error.response);
    throw error.response;
  }
};

export default Api;
