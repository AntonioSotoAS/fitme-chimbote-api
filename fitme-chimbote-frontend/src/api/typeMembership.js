import axios from "./axios";

export const getMembershipTypeRequest = () => axios.get(`/membership-type`);
export const membershipTypeRequest = (membershipType) =>
  axios.post(`/membership-type`, membershipType);
export const updateMembershipTypeRequest = (membershipTypeId, membershipType) =>
  axios.put(`/membership-type/${membershipTypeId}`, membershipType);
export const deleteMembershipTypeRequest = (membershipTypeId) =>
  axios.delete(`/membership-type/${membershipTypeId}`);
