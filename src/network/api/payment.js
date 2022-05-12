import axiosInstance from "../instance";
const PAYMENT_URL = `/payment`;
export const createPayment = async (data) => {
  // console.log(data);
  return axiosInstance.post(`${PAYMENT_URL}/create-url`, data);
};

