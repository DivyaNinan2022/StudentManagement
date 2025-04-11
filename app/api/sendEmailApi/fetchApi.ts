import axios from "axios";

const API_URL = "api/sendEmailApi";

export const sendEmail = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
