import axiosInstance from "../instance";
const LOGIN_URL = `/auth`;
export const login = async (data) => {
  console.log(data);
  return axiosInstance.post(`${LOGIN_URL}/login`, data);
};
export const login_facebook = async () => {
  return axiosInstance.get(`${LOGIN_URL}/facebook`);
};
