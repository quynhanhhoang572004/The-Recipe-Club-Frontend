import NavBar from "@/components/nav-bar/nav-bar";
import { Box, Typography, Pagination } from "@mui/material";
import IngredientGroup from "@/sections/pantry-ingredient/ingredient-group";
import SideBar from "@/components/side-bar/side-bar";
import SearchBar from "@/components/inputs/search-bar";
import { useEffect, useState } from "react";
import PantryTag from "@/components/pantry-tag/pantry-tag";
import { Recipe, getRecommendedRecipes } from "@/api/recipe.service";
import RecipeCard from "@/components/recipe-card/recipe-card";

const MyPantryPage = () => {
  const tags = [
    "Key ingredients",
    "Key exclude",
    "Quick&Easy",
    "Cusinses",
    "Diet",
    "Missing One ingredient",
    "Video only",
    "Max Ingredient",
    "Rating",
    "Recipe Time",
  ];

  const [pantryCount, setPantryCount] = useState(0);
  const [recipeCount, setRecipesCount] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pantryUpdated, setPantryUpdated] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 20;

  useEffect(() => {
    const fetchTotalRecipes = async () => {
      try {
        const response = await getRecommendedRecipes();
        setRecipesCount(response.total);
      } catch (error) {
        console.error("Error to get the total number of recipe");
        setRecipesCount(0);
      }
    };
    fetchTotalRecipes();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecommendedRecipes();
        setRecipes(response.recipes);
        setRecipesCount(response.total);
      } catch (error) {
        console.error("Error loading recipe", error);
      }
    };
    fetchRecipes();
  }, [pantryUpdated]);

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#FFFF6",
        backgroundPosition: "center",
      }}
    >
      <NavBar />
      <Box sx={{ marginTop: "4.5rem", display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            width: "25rem",
            flexShrink: 0,
            height: "100%",
            position: "sticky",
          }}
        >
          <SideBar>
            <Box sx={{ textAlign: "center", justifyContent: "center" }}>
              <Typography
                sx={{
                  color: "#FF885B",
                  fontSize: 30,
                  marginTop: 2,
                  marginBottom: 1,
                  fontWeight: 600,
                }}
              >
                My Pantry
              </Typography>

              <Typography sx={{ fontSize: 14, marginBottom: 2 }}>
                You have
                <span
                  style={{
                    fontSize: "1.3rem",
                    color: "#FF885B",
                    fontWeight: 500,
                  }}
                >
                  {" "}
                  {pantryCount} {pantryCount === 1 ? "item" : "items"}
                </span>{" "}
                in your pantry
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <SearchBar
                PlaceHolder="add/remove/paste ingredient"
                Width="20rem"
              />
            </Box>

            <IngredientGroup
              onCountChange={setPantryCount}
              onPantryUpdate={() => setPantryUpdated((prev) => !prev)}
            />
          </SideBar>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#FFFFF6",
            display: "flex",
            flexDirection: "column",
            padding: "1rem 4rem 4rem 3rem",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#FF885B",
              fontSize: 30,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Suggest Ingredient
          </Typography>

          <Typography sx={{ marginBottom: "1.3rem" }}>
            You have{" "}
            <span
              style={{
                color: "#FF885B",
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
            >
              {recipeCount}
            </span>{" "}
            Ingredient
          </Typography>

          <SearchBar PlaceHolder="Find" Width="50rem" />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
            {tags.map((tag) => (
              <PantryTag
                key={tag}
                label={tag}
                selected={selectedTags.includes(tag)}
                onClick={() => handleToggleTag(tag)}
              />
            ))}
          </Box>

          <Box sx={{ alignItems: "center" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {currentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  name={recipe.title}
                  link_recipe={recipe.domain}
                  image_url={recipe.image_url}
                  num_of_ingredient={recipe.matched_ingredients}
                />
              ))}
            </Box>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Pagination
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#FF885B",
                    color: "#FFFFFF",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#FF885B",
                    color: "#FFFFFF",
                  },
                }}
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyPantryPage;
