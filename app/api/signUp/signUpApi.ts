import { SignUpData } from "@/redux/signUpSlice";
import axios from "axios";

const API_URL = "api/signUp";

export const signUpApi = async (data: SignUpData) => {
  const response = await axios.post(API_URL, { data });
  return response.data;
};
export const LoginDetails = async (username: string, password: string) => {
  const response = await axios.get(
    `${API_URL}?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`
  );
  return response.data;
};
