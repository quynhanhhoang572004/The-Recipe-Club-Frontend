import axiosClient from "@/lib/axiosClient";
import { SignUpProps } from "@/types/auth/signup";
import { GetUserResponseProps } from "@/types/user";

export const loginApi = async (values: {
  account: string;
  password: string;
}) => {
  const { data } = await axiosClient.post("/auth/signin", values);
  return data.data;
};

export const signUpApi = async (
  values: Omit<SignUpProps, "confirmPassword">,
) => {
  const { data } = await axiosClient.post("/auth/signup", {
    username: values.username,
    email: values.email,
    first_name: values.firstName,
    last_name: values.lastName,
    password: values.password,
  });
  return data.data;
};

export const getMe = async () => {
  const res = await axiosClient.get<GetUserResponseProps>("/auth/me");
  return res.data;
};
