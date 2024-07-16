import axios from "axios";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token) => {
  window.localStorage.setItem("auth_token", token);
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const signIn = (data) =>
  axios.post(REST_API_BASE_URL + "/auth/signin", data);

export const listUsers = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/user/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const getUser = (userId) => {
  return axios.get(REST_API_BASE_URL + "/user/find-id/" + userId, {
    headers: getHeaders(),
  });
};
