import axiosClient from "@/lib/axiosClient";
import { GetUserResponseProps } from "@/types/user";

export const loginApi = async (data: { account: string; password: string }) => {
  const res = await axiosClient.post("/auth/signin", data);
  return res.data.data.access_token;
};

export const signupApi = async (data: {
  account: string;
  password: string;
}) => {
  const res = await axiosClient.post("/auth/signup", data);
  return res.data.data.access_token;
};

export const getMe = async () => {
  const res = await axiosClient.get<GetUserResponseProps>("/auth/me");
  return res.data;
};
