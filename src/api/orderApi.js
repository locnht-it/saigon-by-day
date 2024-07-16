import axios from "axios";
import { getAuthToken } from "./axios_helper";

const REST_API_BASE_URL = "https://trip-by-day-backend.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const getTotalMoney = () => {
  return axios.get(REST_API_BASE_URL + "/order/total-money", {
    headers: getHeaders(),
  });
};

export const getRevenueByMonth = (month, year) => {
  return axios.post(
    `${REST_API_BASE_URL}/payment-history/total-money-with-month?month=${month}&year=${year}`,
    {},
    {
      headers: getHeaders(),
    }
  );
};

export const getAllPayment = (page, limit) => {
  return axios.get(
    REST_API_BASE_URL + "/payment-history/find-all-pay-dashboard",
    {
      params: {
        page: page,
        limit: limit,
      },
      headers: getHeaders(),
    }
  );
};
