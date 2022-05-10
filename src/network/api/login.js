import axiosInstance from "../instance";
const LOGIN_URL = `/auth/login`;
export const login = async (data) => {
  console.log(data);
  return axiosInstance.post(`${LOGIN_URL}`, data);
};

