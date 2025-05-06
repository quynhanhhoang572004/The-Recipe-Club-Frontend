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