"use client";
import SearchBar from "@/components/inputs/search-bar";
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavBarHome = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Find your recipe", href: "/find-recipe" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fffff6",
        px: { xs: "0.7rem", md: "0.2rem" },
        py: "0.7rem",
        fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
        fontSize: "0.9rem",
        fontWeight: 500,
        borderRadius: 0,
        boxShadow: "0 0.25rem 0.625rem #0000001a",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          maxWidth: "93.8rem",
          width: "100%",
          mx: "auto",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo bên trái */}
        <Box
          component={Link}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <Box
            component="img"
            src="/icons/logo.svg"
            alt="Logo"
            sx={{
              width: "19rem",
              aspectRatio: "4.61",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Menu giữa */}
        <Box
          sx={{
            position: "absolute",
            left: "31rem",
            transform: "translateX(-50%)",
            display: "flex",
            gap: { xs: "1.25rem", md: "2.5rem 2.9rem" },
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {navLinks.map(({ label, href }) => (
            <Typography
              key={label}
              component={Link}
              href={href}
              sx={{
                color: pathname === href ? "#ff885b" : "#000000",
                textDecoration: pathname === href ? "underline" : "none",
                fontWeight: 400,
                cursor: "pointer",
                textUnderlineOffset: "0.2rem",
                lineHeight: "1.5rem",
                "&:hover": {
                  color: "#ff885b",
                  textDecoration: "underline",
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate(href);
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* Search và nút auth bên phải */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            zIndex: 2,
          }}
        >
          <SearchBar />

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              ml: "6rem",
            }}
          >
            <Button
              sx={{
                color: "#fffff6",
                backgroundColor: "#ff885b",
                borderRadius: "0.7rem",
                textTransform: "capitalize",
                minHeight: "2.3rem",
                padding: "0.3125rem 0.625rem",
                fontSize: "1rem",
                boxShadow:
                  "0 0.0625rem 0.3125rem #0000001f, 0 0.125rem 0.125rem #00000024, 0 0.1875rem 0.0625rem -0.125rem #000000",
                "&:hover": {
                  backgroundColor: "#ff885b",
                },
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              sx={{
                color: "#ff885b",
                backgroundColor: "#ff885b1a", 
                border: "1px solid #ff885b",
                borderRadius: "0.7rem",
                textTransform: "capitalize",
                minHeight: "2.3rem",
                padding: "0.3125rem 0.625rem",
                boxShadow: "0 0.25rem 0.25rem #00000040",
                "&:hover": {
                  backgroundColor: "#fffff6",
                },
              }}
              onClick={() => navigate("/signin")}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarHome;
