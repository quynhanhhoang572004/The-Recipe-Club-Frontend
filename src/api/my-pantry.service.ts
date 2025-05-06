import axiosClient from "@/lib/axiosClient";

export const fetchCategories = async () => {
  const response = await axiosClient.get("/ingredients/categories");
  return response.data?.data ?? [];
};

export const fetchIngredients = async () => {
  const response = await axiosClient.get("/ingredients");
  return response.data?.data ?? [];
};

export const fetchUserPantry = async (accessToken: string) => {
  const response = await axiosClient.get("users/pantries", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data?.data ?? [];
};

export const putUserPantry = async (
  accessToken: string,
  ingredientsIds: number[],
): Promise<number[]> => {
  const body = { ingredient_ids: ingredientsIds };

  const response = await axiosClient.put<{ data: number[] }>(
    "/users/pantries",
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data?.data ?? [];
};
