import axiosClient from "./axiosClient";

const packageInDestinationApi = {
  getAll(params) {
    const url = `/packageInDestinations`;
    return axiosClient.get(url, { params: params });
  },

  get(id) {
    const url = `/packageInDestinations/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = `/packageInDestinations`;
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/packageInDestinations/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/packageInDestinations/${id}`;
    return axiosClient.delete(url);
  },
};

export default packageInDestinationApi;
