import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listPackages = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/package/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deletePackage = (packageId) => {
  return axios.delete(REST_API_BASE_URL + "/package/delete/" + packageId, {
    headers: getHeaders(),
  });
};

export const createPackage = (packageRequestDTO) => {
  return axios.post(REST_API_BASE_URL + "/package/save", packageRequestDTO, {
    headers: getHeaders(),
  });
};

export const getPackage = (packageId) => {
  return axios.get(REST_API_BASE_URL + "/package/find-id/" + packageId, {
    headers: getHeaders(),
  });
};

export const updatePackage = (packageId, packageRequestDTO) => {
  return axios.put(
    REST_API_BASE_URL + "/package/update/" + packageId,
    packageRequestDTO,
    {
      headers: getHeaders(),
    }
  );
};
