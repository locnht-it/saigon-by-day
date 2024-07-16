import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listServices = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/service/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deleteService = (serviceId) => {
  return axios.delete(REST_API_BASE_URL + "/service/delete/" + serviceId, {
    headers: getHeaders(),
  });
};

export const createService = (service) => {
  return axios.post(REST_API_BASE_URL + "/service/save", service, {
    headers: getHeaders(),
  });
};

export const getService = (serviceId) => {
  return axios.get(REST_API_BASE_URL + "/service/find-id/" + serviceId, {
    headers: getHeaders(),
  });
};

export const updateService = (serviceId, service) => {
  return axios.put(
    REST_API_BASE_URL + "/service/update/" + serviceId,
    service,
    {
      headers: getHeaders(),
    }
  );
};
