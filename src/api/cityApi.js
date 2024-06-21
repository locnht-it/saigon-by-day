import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "http://localhost:8080/api/v1";

export const listCities = (page, limit, headers) =>
  axios.get(REST_API_BASE_URL + "/city/find-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: headers,
  });

export const deleteCity = (cityId) =>
  axios.delete(REST_API_BASE_URL + "/city/delete/" + cityId);
