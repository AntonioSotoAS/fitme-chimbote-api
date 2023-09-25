import axios from "./axios";

export const registerClientRequest = (client) => axios.post(`/client`, client);

export const getClientRequest = () => axios.get(`/client`);

export const updateClientRequest = (clientId, client) =>
  axios.put(`/client/${clientId}`, client);
