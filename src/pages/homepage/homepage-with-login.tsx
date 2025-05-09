import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { getRecommendedRecipes, Recipe } from "../../api/recipe.service";
import Navbar from "../../components/nav-bar/nav-bar";
import { getMe } from "../../api/auth.service";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useMediaQuery } from "@mui/material";

const HomepageAfterLogin = () => {
  const [name, setName] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setName(userData.data?.username);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecommendedRecipes();
        setRecipes(data.recipes.slice(0, 10));
        setError(null);
      } catch (err) {
        console.error("Error loading recipes:", err);
        setRecipes([]);
        setError("Failed to load recipes. Please try again later.");
      }
    };
    fetchRecipes();
  }, []);

  const isXs = useMediaQuery("(min-width:500px) and (max-width: 700px)"); // Super small screen
  const isSm = useMediaQuery("(min-width:700px) and (max-width:990px)"); // Small screen
  const isMd = useMediaQuery("(min-width:990px) and (max-width:1280px)"); // Medium screen
  const isLg = useMediaQuery("(min-width:1280px) and (max-width:1420px)"); // Large screen

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFFFF6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3, md: 6, xl: 10 },
        py: { xs: 4, md: 6, xl: 10 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Navbar />
        <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
            Welcome back!!
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "#FF885B",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Ready to cook something amazing today?
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF885B",
              "&:hover": {
                backgroundColor: "#FF9000",
              },
            }}
          >
            What’s In Your Kitchen?
          </Button>
        </Box>
        <Box
          component="img"
          src="/images/homepageBanner.png"
          sx={{
            width: { xs: "25%", sm: "40%", md: "45%" },
            height: "auto",
            mt: { xs: 4, md: 0 },
          }}
        />
      </Box>

      <Box sx={{ mt: 4, mb: 2, backgroundColor: "#FF885B" }}>
        <Typography variant="h5" sx={{ p: 2, color: "#FFFFF6" }}>
          Recipe suggestion with your pantry
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            my: 2,
            mx: 4,
            gridTemplateColumns: isXs
              ? "repeat(2,1fr)"
              : isSm
                ? "repeat(3, 1fr)"
                : isMd
                  ? "repeat(4, 1fr)"
                  : isLg
                    ? "repeat(4,1fr)"
                    : "repeat(5, 1fr)",
          }}
        >
          {recipes.map((recipe) => (
            <Card key={recipe.id} sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                image={recipe.image_url}
                alt={recipe.title}
                sx={{ height: 220 }}
              />
              <CardContent
                sx={{
                  flexGrow: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {recipe.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                  }}
                >
                  <FavoriteBorderIcon fontSize="small" />
                  <ChatBubbleOutlineIcon fontSize="small" />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomepageAfterLogin;
