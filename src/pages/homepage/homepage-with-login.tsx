import { Typography, Button, Box, Card, CardMedia, CardContent, Grid } from "@mui/material";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { getRecommendedRecipes } from "../../api/recipe.service";
import Navbar from "../../components/nav-bar/nav-bar";
import { getMe } from "../../api/auth.service";
import Icon from '@mui/material/Icon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const HomepageAfterLogin = () => {
  const [name, setName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setName(userData.name);
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
        setRecipes(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error loading recipes:", err);
        setError(err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFFFF6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: 5,
        py: 6,
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

        <Box>
          <Typography variant="h4" sx={{ fontWeight: "medium", mb: 1 }}>
            Welcome back!!
          </Typography>

          <Typography variant="h2" sx={{ color: "#FF885B", fontWeight: "bold", mb: 2 }}>
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
                backgroundColor: "#FFA76B",
              },
            }}
          >
            What’s In Your Kitchen?
          </Button>
        </Box>

        <Box
          component="img"
          src="/images/homepageBanner.png"
          alt="Food"
          sx={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "end",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 4,
          justifyContent: "center",
        }}
      >
      </Box>

      <Box sx={{ mt: 4, mb: 2, backgroundColor: "#FF885B" }}>
        <Typography variant="h5" sx={{ mb: 2, p: 1, color: "#FFFFF6" }}>
          Recipe suggestion with your pantry
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={3} key={recipe.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={recipe.image_url}
                  alt={recipe.title}
                />
                <CardContent sx={{ flexGrow: 1, px: 2, pb: 2 }}>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {recipe.title}
                  </Typography>

                  <Typography variant="body1" sx={{ color: "#FFFFF6", fontWeight: "bold", my: 1 }}>
                    {recipe.cooking_time}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="body2">
                      {recipe.rating}
                      <Icon>star</Icon>;
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <FavoriteBorderIcon fontSize="small" />
                      <ChatBubbleOutlineIcon fontSize="small" />
                    </Box>
                  </Box>

                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    {recipe.tag}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomepageAfterLogin;