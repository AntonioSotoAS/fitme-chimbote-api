import axios from "./axios";

export const getDashboard = (date) => axios.post(`/membership/range`, date);