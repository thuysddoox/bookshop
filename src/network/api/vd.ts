import axiosInstance from "../instance";
const CONTACT_URL = `/contact`;
export const sendMessage = async (data: any) => {
  return axiosInstance.post(`${CONTACT_URL}`, data, {
    headers: { 'X-Auth-Token': `${process.env.ACCESS_TOKEN_VALUE || "Glasshouse_Web_Token_20220429"}` },
  });
};
