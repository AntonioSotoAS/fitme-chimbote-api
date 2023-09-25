import axios from "./axios";

export const getShiftRequest = () => axios.get(`/shift`);
export const shiftRequest = (shift) => axios.post(`/shift`, shift);
export const updateShiftRequest = (shiftId, shift) =>
  axios.put(`/shift/${shiftId}`, shift);
export const deleteShiftRequest = (shiftId) =>
  axios.delete(`/shift/${shiftId}`);
