import axios from "./axios";

export const registerRequest = (user) => axios.post(`/user/register`, user);

export const loginRequest = (user) => axios.post(`/user/login`, user);

export const verityTokenRequest = () => axios.get("/verify");

export const LogoutRequest = () =>
  axios.get("http://localhost:4000/api/v1/user/logout");

export const GetProfile = () =>
  axios.get("http://localhost:4000/api/v1/profile");
