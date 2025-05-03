import { Box, Button, Typography } from "@mui/material";
import React from "react";
import NavBarHome from "@/components/nav-bar/nav-bar-home";
import HeroSection from "@/components/home0log/hero-section";
import { useNavigate } from "react-router-dom";
import ReviewSection from "@/components/home0log/review";
import NavBar from "@/components/nav-bar/nav-bar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#FFFFF6" }}>
      <NavBar />
      <HeroSection />
      <ReviewSection />

      {/* Main Content Section */}
      {/* Footer CTA Section */}
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
        {/* Updated Title with 2-line format */}
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
            Culinary Creativity! 👩‍🍳 👩‍🍳
          </Typography>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad4e863fa4d509f70a2f26500672e61ba7fe521c?placeholderIfAbsent=true&apiKey=54645ae1b26d40969fecd1dde095fca5"
          alt="Kitchen creativity"
          sx={{
            width: "100%",
            maxWidth: "33rem", 
            height: "auto",
            mb: 4, 
            borderRadius: "0.75rem", 
          }}
        />

        {/* Call to Action Button */}
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

        {/* Footer text */}
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
