import axiosInstance from "../instance";
const CART_URL = `/cart`;
export const getCarts = async (access_token, userId) => {
  return axiosInstance.get(`${CART_URL}`, { headers: { "Authorization": `Bearer ${access_token}` }, params: { user: userId } });
};

export const addCart = async (access_token, data) => {
  return axiosInstance.post(`${CART_URL}/add`, data, { headers: { "Authorization": `Bearer ${access_token}` } });
};

export const createOrder = async (data) => {
  return axiosInstance.post(`${CART_URL}/create-order`, data);
};
