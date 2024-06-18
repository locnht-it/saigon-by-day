import axiosClient from "./axiosClient";

const packageApi = {
  getAll(params) {
    const url = `/packages`;
    return axiosClient.get(url, { params: params });
  },

  get(id) {
    const url = `/packages/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = `/packages`;
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/packages/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/packages/${id}`;
    return axiosClient.delete(url);
  },
};

export default packageApi;
