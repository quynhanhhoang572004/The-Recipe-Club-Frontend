import apiClient from "@/lib/apiClient";


export const fetchCategories = async() =>{
    const response = await apiClient.get("/ingredients/categories");
    return response.data?.data ?? [];
}

export const fetchIngredients = async () => {
    const response = await apiClient.get("/ingredients")
    return response.data?.data ?? [];
}

export const fetchUserPantry = async (accessToken: string) => {
    const response = await apiClient.get("users/pantries", {
        headers: {
            Authorization: `Bearer ${accessToken}` ,
        }
    });
    return response.data?.data ?? [];
}

export const putUserPantry = async (accessToken: string, ingredientsIds:number[]): Promise<number[]> => {
    const body = {ingredient_ids:ingredientsIds};

    const response = await apiClient.put<{ data: number[] }>(
        "/users/pantries",
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data?.data ?? [];
  
}