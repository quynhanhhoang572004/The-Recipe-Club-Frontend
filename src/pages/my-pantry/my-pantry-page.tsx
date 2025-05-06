import { AuthProvider } from "@/components/hooks/contexts/AuthContext";
import NavBar from "@/components/nav-bar/nav-bar";
import { Box, Typography } from "@mui/material";
import IngredientGroup from "@/sections/pantry-ingredient/ingredient-group";
import SideBar from "@/components/side-bar/side-bar";
import SearchBar from "@/components/inputs/search-bar";

const MyPantryPage = () => {
  return (
    <AuthProvider>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <NavBar />
        <Box sx={{ display: "flex", flexGrow: 2, marginTop: "4.5rem" }}>
          
          <SideBar>
     <Box sx ={{
      textAlign: "center",
      justifyContent:"center"

     }}>
            <Typography
              sx={{
                color: "#FF885B",
                fontSize: 20,
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
              you have ingredient
            </Typography>
            </Box>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems:"center",
              marginBottom : "1.5rem"
            }}>
            
            <SearchBar PlaceHolder="add/remove/paste ingredient" Width="20rem"/>
            </Box>
            <IngredientGroup />
          </SideBar>
        </Box>
      </Box>
    </AuthProvider>
  );
};

export default MyPantryPage;
