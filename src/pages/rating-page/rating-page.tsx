import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getRecommendedRecipes } from "@/api/recipe.service";
import Navbar from "@/components/nav-bar/nav-bar";
import RatingForm from "@/components/rating-form/rating-form";

const RatingPage: React.FC = () => {
  const [recipeId, setRecipeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedRecipe = async () => {
      try {
        const data = await getRecommendedRecipes();
        if (data.recipes.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.recipes.length);
          setRecipeId(data.recipes[randomIndex].id);
        }
      } catch (error) {
        console.error("Failed to fetch recommended recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedRecipe();
  }, []);

  if (!recipeId) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No recommended recipes found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 7, backgroundColor: "#FFFFF6" }}>
        <RatingForm recipeId={recipeId} />;
      </Box>
    </>

  )
};

export default RatingPage;
