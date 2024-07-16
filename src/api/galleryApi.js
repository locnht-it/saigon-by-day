import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

// Helper function to get headers
const getHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No auth token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const listGalleries = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/gallery/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deleteGallery = (galleryId) => {
  return axios.delete(REST_API_BASE_URL + "/gallery/delete/" + galleryId, {
    headers: getHeaders(),
  });
};

export const createGallery = (gallery) => {
  return axios.post(REST_API_BASE_URL + "/gallery/save", gallery, {
    headers: getHeaders(),
  });
};

export const getGallery = (galleryId) => {
  return axios.get(REST_API_BASE_URL + "/gallery/find-id/" + galleryId, {
    headers: getHeaders(),
  });
};

export const getGalleryByDestinationId = (destinationId) => {
  return axios.get(
    REST_API_BASE_URL + "/gallery/find-by-destination-id/" + destinationId,
    {
      headers: getHeaders(),
    }
  );
};

export const updateGallery = (galleryId, gallery) => {
  return axios.put(
    REST_API_BASE_URL + "/gallery/update/" + galleryId,
    gallery,
    {
      headers: getHeaders(),
    }
  );
};
