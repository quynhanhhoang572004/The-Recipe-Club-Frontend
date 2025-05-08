import NavBar from "@/components/nav-bar/nav-bar";
import { Box, Typography } from "@mui/material";
import IngredientGroup from "@/sections/pantry-ingredient/ingredient-group";
import SideBar from "@/components/side-bar/side-bar";
import SearchBar from "@/components/inputs/search-bar";
import { useState } from "react";

const MyPantryPage = () => {
  const [pantryCount, setPantryCount] = useState(0);
  const [recipeCount, setRecipesCount] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#FFFF6",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
        
      }}
    >
      <NavBar />
    
      <Box sx={{ display: "flex", flexGrow: 2, marginTop: "4.5rem",  alignItems: "flex-start",  height: "100vh",}}>
        <SideBar>
          <Box
            sx={{
              textAlign: "center",
              justifyContent: "center",
            }}
          >
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

            <Typography
              sx={{
                fontSize: 14,
                marginBottom: 2,
              }}
            >
              You have
              <span
                style={{
                  fontSize: "1.3rem",
                  color: "#FF885B",
                  fontWeight: 500,
                }}
              >
              {" "}{pantryCount} {pantryCount === 1 ? "item" : "items"}
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
          <IngredientGroup onCountChange={setPantryCount} />
        </SideBar>

        <Box 
        sx={{
          flexGrow: 1, 
          padding: 3,
          bgcolor :"#FFFFF6",
          display:"flex",
          justifyContent: "center",
          alignItems: "center",  
        }}>
          <Typography
          sx={{
            color: "#FF885B",
                fontSize: 30,
                marginTop: 2,
                marginBottom: 1,
                fontWeight: 600,
                height: "100vh",
                textAlign:"center"
          }}>
            Suggest Ingredient

          </Typography>
          
        </Box>
      </Box>
    </Box>
  );
};

export default MyPantryPage;
