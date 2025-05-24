import { Box, Button, Typography,Grid } from "@mui/material";
import HeroSection from "@/components/home/hero-section";
import { useNavigate } from "react-router-dom";
import ReviewSection from "@/components/home/review";
import NavBar from "@/components/nav-bar/nav-bar";
import SeoMetaTags from "@/components/seo-meta-tags";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useEffect, useState, useRef } from "react";
import { Recipe, getRecommendRecipeGuest } from "@/api/recipe.service";
import RecipeCard from "@/components/recipe-card/recipe-card";


const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const imgRef = useRef(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecommendRecipeGuest();
        setRecipes(response.recipes);
      } catch (err) {
        console.log("Cannot fetch the recipe", err);
      }
    };
    fetchRecipes();
  }, [isAuthenticated]);

   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = 'fadeInRotate 6s ease-out forwards';
            setTimeout(() => {
              (entry.target as HTMLElement).style.animation = 'none';
            }, 20000);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: "#FFFFF6", position: "relative" }}>
      <SeoMetaTags title="Home" />
      <NavBar />
      <HeroSection />
{isAuthenticated ? (<Box
sx={{
    backgroundColor: "#ff885b",
        width: "100%",
        py: { xs: "6rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        justifyContent:"center"
}}>
  <Box sx={{  alignItems: "center", width: "100%", maxWidth: "1200px", mx: "auto" }}>
<Grid container
         spacing={2} 
        justifyContent="center" 
        alignItems="center">
              {recipes.map((recipe) => (
                <Grid
                   size={2.3}
                >
                  <RecipeCard
                    name={recipe.title}
                    link_recipe={recipe.domain}
                    image_url={recipe.image_url}
                    num_of_ingredient={recipe.matched_ingredients}
                  />
                </Grid>
              ))}
            </Grid>
</Box>
</Box>
) : (
      <ReviewSection /> )}
      <Box
        component="footer"
        sx={{
          mt: 10,
          px: 2,
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            component="div"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 500,
              fontFamily: "Montserrat, sans-serif",
              color: "#FF885B",
              lineHeight: 1.4,
            }}
          >
            Turn Your Kitchen Chaos into
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.875rem" },
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
              color: "#FF885B",
              mt: "0.25rem",
            }}
          >
            Culinary Creativity! 👩‍🍳👨‍🍳
          </Typography>
        </Box>
        <Box
         ref={imgRef}
          component="img"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad4e863fa4d509f70a2f26500672e61ba7fe521c?placeholderIfAbsent=true&apiKey=54645ae1b26d40969fecd1dde095fca5"
          alt="Kitchen creativity"
        sx={{
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "100%",
    maxWidth:"33rem",
    zIndex: 1,
    position: "relative",
    opacity: 0,
    transform: "rotate(-5deg)",
    animation: "fadeInRotate 3s ease-out forwards",
    "@keyframes fadeInRotate": {
      from: {
        opacity: 0,
        transform: "rotate(-90deg)",
      },
      to: {
        opacity: 1,
        transform: "rotate(0deg)",
      }
    },
  }}
        />
        <Button
          variant="contained"
          onClick={() => navigate("/signin")}
          sx={{
            backgroundColor: "#FF885B",
            color: "#fff",
            px: 4,
            py: 1.5,
            borderRadius: "0.5rem",
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.25)",
            "&:hover": {
              backgroundColor: "#e6764f",
            },
            mb: 6,
          }}
        >
          Get Started
        </Button>
      
        <Typography
          sx={{
            color: "#000",
            fontSize: "1.2rem",
            fontWeight: 500,
            letterSpacing: "0.029rem",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          © 2025 UnIpin, Inc. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
