"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getMe } from "@/api/auth.service";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUsername] = useState("");
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      setUsername("");
      return;
    }

    const fetchMe = async () => {
      try {
        const response = await getMe();
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchMe();
  }, [isAuthenticated]);

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: "93.75rem",
        marginTop: "4.5rem",
        paddingTop: "3.125rem",
        minHeight: { xs: "56.25rem", md: "56.25rem" },
        mx: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1.25rem",
          flexWrap: { xs: "wrap", md: "nowrap" },
          width: "100%",
        }}
      >
        {!isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "50%" },
              mt: { xs: "2.5rem", md: "5.625rem" },
            }}
          >
            <Box
              sx={{
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                mr: { xs: 0, md: "-2.875rem" },
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              <Box>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: { xs: "2.5rem", md: "3.75rem" },
                    fontWeight: 500,
                    fontFamily: "Montserrat, sans-serif",
                    color: "#000",
                  }}
                >
                  Unlock Your Pantry's
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: { xs: "2.5rem", md: "6.875rem" },
                    fontWeight: 600,
                    fontFamily: "Montserrat, sans-serif",
                    color: "#ff885b",
                  }}
                >
                  Potential!
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#000",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  fontFamily: "Montserrat, sans-serif",
                  width: "29.125rem",
                  maxWidth: "100%",
                  mt: "0.125rem",
                  ml: "0.6875rem",
                }}
              >
                From leftovers to gourmet meals
                <br />
                —your next recipe is just a search away
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: "1.5625rem",
                  mt: { xs: "2.5rem", md: "3.625rem" },
                  fontSize: "1.25rem",
                  fontWeight: 500,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/signin")}
                  sx={{
                    minHeight: "2.5625rem",
                    backgroundColor: "#FF885B",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    letterSpacing: "0.025rem",
                    textTransform: "none",
                    padding: "0.5625rem 1rem",
                    boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.25)",
                    "&:hover": {
                      backgroundColor: "#e6764f",
                    },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/signup")}
                  sx={{
                    color: "#ff885b",
                    borderColor: "#ff885b",
                    backgroundColor: "#ef6c000a",
                    textTransform: "capitalize",
                    letterSpacing: "0.02875rem",
                    borderRadius: "0.625rem",
                    minHeight: "2.5625rem",
                    padding: "0.5rem 1.375rem",
                    boxShadow: "0 0.25rem 0.25rem #00000040",
                    "&:hover": {
                      borderColor: "#ff885b",
                      backgroundColor: "#fff5ee",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "50%" },
              mt: { xs: "2.5rem", md: "5.625rem" },
            }}
          >
            <Box
              sx={{
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                mr: { xs: 0, md: "-2.875rem" },
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              <Box>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: { xs: "2.5rem", md: "3.75rem" },
                    fontWeight: 500,
                    fontFamily: "Montserrat, sans-serif",
                    color: "#000",
                  }}
                >
                  Welcome back!!!
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: { xs: "1.5rem", md: "4.875rem" },
                    fontWeight: 600,
                    fontFamily: "Montserrat, sans-serif",
                    color: "#ff885b",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    hyphens: "auto",
                    maxWidth: { xs: "75%", md: "70%" },
                    lineHeight: { xs: "2.75rem", md: "7rem" },
                  }}
                >
                  {user}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#000",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  width: "29.125rem",
                  maxWidth: "100%",
                  mt: "0.125rem",
                  ml: "0.6875rem",
                }}
              >
                Ready to cook something amazing today?
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: "1.5625rem",

                  mt: { xs: "2.5rem", md: "3.625rem" },
                  fontSize: "1.25rem",
                  fontWeight: 500,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/pantry")}
                  sx={{
                    minHeight: "2.5625rem",
                    backgroundColor: "#FF885B",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    letterSpacing: "0.025rem",
                    textTransform: "none",
                    padding: "0.5625rem 1rem",
                    boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.25)",
                    "&:hover": {
                      backgroundColor: "#e6764f",
                    },
                  }}
                >
                  What's in your Kitchen
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            ml: { md: "-4rem" },
            position: "relative",
          }}
        >
          <Box
            component="img"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/50fc4b1a5ca7d3e2d18ba885f5c0f0f4a6faf926?placeholderIfAbsent=true&apiKey=54645ae1b26d40969fecd1dde095fca5"
            alt="Kitchen"
            sx={{
              aspectRatio: "1",
              objectFit: "contain",
              objectPosition: "center",
              width: "100%",
              zIndex: 1,
              position: "relative",
              opacity: 0,
              transform: "scale(0.95)",
              animation: "fadeInZoom 1s ease-out forwards",
              "@keyframes fadeInZoom": {
                from: {
                  opacity: 0,
                  transform: "scale(0.95)",
                },
                to: {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "3rem",
              left: "26.25rem",
              transform: "translateX(-50%)",
              width: { xs: "25.3125rem", md: "50.625rem" },
              height: { xs: "25.3125rem", md: "50.625rem" },
              backgroundColor: "#ff885b",
              borderRadius: "50%",
              zIndex: 0,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
