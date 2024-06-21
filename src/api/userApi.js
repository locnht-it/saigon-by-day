import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token) => {
  window.localStorage.setItem("auth_token", token);
};

export const signIn = (data) =>
  axios.post(REST_API_BASE_URL + "/auth/signin", data);
