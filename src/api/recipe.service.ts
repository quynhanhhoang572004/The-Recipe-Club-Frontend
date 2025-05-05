import apiClient from "../lib/apiClient";

export type Recipe = {
  id: string;
  title: string;
  image_url: string;
  rating: number;
};

export const getRecommendedRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await apiClient.get('/recipes/recommend');
    return Array.isArray(response.data.recipes) ? response.data.recipes : [];
  } catch (error) {
    console.error("Error fetching recommended recipes:", error);
    return [];
  }
};

export default apiClient;