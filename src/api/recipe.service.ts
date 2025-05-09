import axiosClient from "@/lib/axiosClient";

export type Recipe = {
  id: string;
  title: string;
  image_url: string;
  domain:string;
  matched_ingredients: number;
};

export const getRecommendedRecipes = async (): Promise<{ total:number, recipes: Recipe[]}> => {
  try {
    const response = await axiosClient.get("/recipes/recommend");
    return {
      total: response.data.total || 0 , 
      recipes: Array.isArray(response.data.recipes) ? response.data.recipes : []};
  } catch (error) {
    console.error("Error fetching recommended recipes:", error);
    return {
      total: 0, 
      recipes: [], 
  } }
};
