import axiosClient from "@/lib/axiosClient";

export type Recipe = {
  id: string;
  title: string;
  image_url: string;
  rating: number;
};
export type RecipeDetail = {
  id: string;
  title: string;
  image_url: string;
  domain: string;
  ingredients: string[];
  nutrition_facts: NutritionFacts;
  matched_ingredients: number;
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

export const getRecipeById = async (recipeId?: string): Promise<RecipeDetail | null> => {
  if (!recipeId) {
    console.error("Invalid Recipe ID:", recipeId);
    return null;
  }
  try {
    const response = await axiosClient.get(`/recipes/${recipeId}`);
    return response.data as RecipeDetail;
  } catch (error) {
    console.error(`Error fetching recipe ${recipeId}:`, error);
    return null;
  }
};
