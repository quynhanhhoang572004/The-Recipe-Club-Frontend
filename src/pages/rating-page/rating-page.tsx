import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "@/components/nav-bar/nav-bar";
import RatingForm from "@/components/rating-form/rating-form";
import { useParams } from "react-router-dom";

const RatingPage: React.FC = () => {
  const { recipeId: urlRecipeId } = useParams<{ recipeId?: string }>();

  if (!urlRecipeId) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            textAlign: "center",
            mt: 7,
            p: 4,
            backgroundColor: "#FFFFF6",
            minHeight: "calc(100vh - 8rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">
            Please select a recipe to rate. No recipe ID was provided.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 7, backgroundColor: "#FFFFF6" }}>
        <RatingForm recipeId={urlRecipeId} />
      </Box>
    </>
  );
};

export default RatingPage;
