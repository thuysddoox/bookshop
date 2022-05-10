import axiosInstance from "../instance";
const USER_URL = `/user`;
export const getUser = async (access_token, username) => {
  return axiosInstance.get(`${USER_URL}`, { headers: { "Authorization": `Bearer ${access_token}` }, params: { username: username } });
};

const REGISTER_URL = `/user/register`;
export const register = async (data) => {
  return axiosInstance.post(`${REGISTER_URL}`, data);
};

