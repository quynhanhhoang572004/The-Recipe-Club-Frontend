import apiClient from "@/lib/apiClient";

export const getRecommendedRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await apiClient.get('/recipes/recommend');
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended recipes:", error);
  }
};

export default apiClient;