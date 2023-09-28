import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { toast } from "react-toastify";
import { getToken, isAuthenticated, removeToken } from "../utils/auth";

let refreshed = false;

export const baseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

// "http://13.48.194.188/api";
// "http://localhost:4000/api/v1";

export const subscriber = new BehaviorSubject(0);
const Api = axios.create({
  baseURL: baseUrl,
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
    console.log(err, "from");
    if (
      err?.response?.status === 401 &&
      err?.response?.data?.detail === "Incorrect authentication credentials." &&
      !refreshed
    ) {
      toast.error("Session expired", {
        position: "top-center",
      });
      setTimeout(() => {
        removeToken();
        window.history.pushState({}, "User Login", "/home");
      }, 4000);
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
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message === "No Valid Token Please Login"
    ) {
      console.log("yes");
      toast.error("Session expired", {
        position: "top-center",
      });
      setTimeout(() => {
        removeToken();
        window.location.reload();
        window.history.pushState({}, "User Login", "/home");
      }, 4000);
    }
    return Promise.reject(error);
  }
);

export default Api;
