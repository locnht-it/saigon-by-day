import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listDestinations = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/destination/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deleteDestination = (destinationId) => {
  return axios.delete(
    REST_API_BASE_URL + "/destination/delete/" + destinationId,
    {
      headers: getHeaders(),
    }
  );
};

export const createDestination = (destination) => {
  return axios.post(REST_API_BASE_URL + "/destination/save", destination, {
    headers: getHeaders(),
  });
};

export const getDestination = (destinationId) => {
  return axios.get(
    REST_API_BASE_URL + "/destination/find-id/" + destinationId,
    {
      headers: getHeaders(),
    }
  );
};

export const updateDestination = (destinationId, destination) => {
  return axios.put(
    REST_API_BASE_URL + "/destination/update/" + destinationId,
    destination,
    {
      headers: getHeaders(),
    }
  );
};
