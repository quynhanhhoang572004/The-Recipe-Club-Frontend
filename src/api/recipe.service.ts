import axiosClient from "@/lib/axiosClient";

export type Recipe = {
  id: string;
  title: string;
  image_url: string;
  domain: string;
  matched_ingredients: number;
};

export type NutritionFacts = {
  [key: string]: number;
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

export const getRecommendedRecipes = async (): Promise<{
  total: number;
  recipes: Recipe[];
}> => {
  try {
    const response = await axiosClient.get("/recipes/recommend");
    return {
      total: response.data.total || 0,
      recipes: Array.isArray(response.data.recipes)
        ? response.data.recipes
        : [],
    };
  } catch (error) {
    console.error("Error fetching recommended recipes:", error);
    return {
      total: 0,
      recipes: [],
    };
  }
};

export const getRecipeById = async (
  recipeId: string,
): Promise<RecipeDetail | null> => {
  try {
    const response = await axiosClient.get(`/recipes/${recipeId}`);
    return response.data as RecipeDetail;
  } catch (error) {
    console.error(`Error fetching recipe ${recipeId}:`, error);
    return null;
  }
};
