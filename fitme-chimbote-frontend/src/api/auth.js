import axios from "./axios";

export const registerRequest = (user) => axios.post(`/user/register`, user);

export const loginRequest = (user) => axios.post(`/user/login`, user);

export const verityTokenRequest = () => axios.get("/verify");
