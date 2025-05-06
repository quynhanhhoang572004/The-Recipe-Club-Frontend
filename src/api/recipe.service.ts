import axiosClient from "@/lib/axiosClient";

export type Recipe = {
  id: string;
  title: string;
  image_url: string;
  rating: number;
};

export const getRecommendedRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axiosClient.get("/recipes/recommend");
    return Array.isArray(response.data.recipes) ? response.data.recipes : [];
  } catch (error) {
    console.error("Error fetching recommended recipes:", error);
    return [];
  }
};
