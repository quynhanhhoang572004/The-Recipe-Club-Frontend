import apiClient from "@/lib/apiClient";


export const loginApi = async (data: { account: string; password: string }) => {
  const res = await apiClient.post("/auth/signin", data);
  return res.data.data.access_token;
};

export const signupApi = async (data: { account: string; password: string }) => {
  const res = await apiClient.post("/auth/signup", data);
  return res.data.data.access_token;
};

export const getMe = async () => {
  const token = localStorage.getItem("access_token");
  const res = await apiClient.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
