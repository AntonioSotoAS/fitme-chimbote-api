import axios from "./axios";

export const registerClientRequest = (client) =>
  axios.post(`/client`, client);

export const getClientRequest = () => axios.get(`/client`);
