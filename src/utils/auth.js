/* eslint-disable camelcase */

import jwtDecode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const getDecodedJwt = (tokn = "") => {
  try {
    const token = getToken();
    const t = token || tokn;

    const decoded = jwtDecode(t);
    return decoded;
  } catch (e) {
    return e;
  }
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeDomainObj = () => {
  localStorage.removeItem("domain");
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const logOut = (cb) => {
  removeToken();
  cb();
};

export const isAuthenticated = () => {
  try {
    // const decodedToken = getDecodedJwt();
    return true;
    // if (decodedToken) {
    //   const { exp } = decodedToken;
    //   const currentTime = Date.now() / 1000;
    //   return exp > currentTime;
    // } else {
    //   return false;
    // }
  } catch (e) {
    return false;
  }
};
