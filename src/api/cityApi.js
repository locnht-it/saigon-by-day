import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listCities = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/city/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deleteCity = (cityId) => {
  return axios.delete(REST_API_BASE_URL + "/city/delete/" + cityId, {
    headers: getHeaders(),
  });
};

export const createCity = (city) => {
  return axios.post(REST_API_BASE_URL + "/city/save", city, {
    headers: getHeaders(),
  });
};

export const getCity = (cityId) => {
  return axios.get(REST_API_BASE_URL + "/city/find-id/" + cityId, {
    headers: getHeaders(),
  });
};

export const updateCity = (cityId, city) => {
  return axios.put(REST_API_BASE_URL + "/city/update/" + cityId, city, {
    headers: getHeaders(),
  });
};
