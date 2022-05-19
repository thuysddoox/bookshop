import axiosInstance from "../instance";
const USER_URL = `/user`;
export const getUser = async (access_token, username) => {
  return axiosInstance.get(`${USER_URL}/detail`, { headers: { "Authorization": `Bearer ${access_token}` }, params: { username: username } });
};
export const getUserFB = async (access_token, userId) => {
  return axiosInstance.get(`${USER_URL}/detail`, { headers: { "Authorization": `Bearer ${access_token}` }, params: { user_fb: userId } });
};
const REGISTER_URL = `/user/register`;
export const register = async (data) => {
  return axiosInstance.post(`${REGISTER_URL}`, data);
};

