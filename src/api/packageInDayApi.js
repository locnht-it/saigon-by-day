import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listPackageInDays = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/package-in-day/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deletePackageInDay = (packageInDayId) => {
  return axios.delete(
    REST_API_BASE_URL + "/package-in-day/delete/" + packageInDayId,
    {
      headers: getHeaders(),
    }
  );
};

export const createPackageInDay = (packageInDay) => {
  return axios.post(REST_API_BASE_URL + "/package-in-day/save", packageInDay, {
    headers: getHeaders(),
  });
};

export const getPackageInDay = (packageInDayId) => {
  return axios.get(
    REST_API_BASE_URL + "/package-in-day/find-id/" + packageInDayId,
    {
      headers: getHeaders(),
    }
  );
};

export const updatePackageInDay = (packageInDayId, packageInDay) => {
  return axios.put(
    REST_API_BASE_URL + "/package-in-day/update/" + packageInDayId,
    packageInDay,
    {
      headers: getHeaders(),
    }
  );
};
