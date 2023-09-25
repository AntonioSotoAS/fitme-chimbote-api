import axios from "./axios";


export const membershipRequest = (membership) =>
  axios.post(`membership/membership-type`, membership);
export const getMembershipRequest = () => axios.get(`membership/all`);
export const updateMembershipRequest = (membershipId, membership) =>
  axios.put(`membership/${membershipId}`, membership);
export const deleteMembershipRequest = (membershipId) =>
  axios.delete(`membership/${membershipId}`);
