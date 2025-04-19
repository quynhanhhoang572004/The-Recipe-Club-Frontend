import SearchBar from "@/components/inputs/search-bar";
import { grey } from "@/theme/color";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { CircleUserRound, Settings } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavBarLink = styled(Link)(({ isActive }: { isActive?: boolean }) => ({
  underline: "hover",
  fontWeight: "400",
  lineHeight: "24px",
  textDecoration: isActive ? "underline" : "none",
  textUnderlineOffset: 3,
  color: isActive ? "#FF885B" : grey[800],
  cursor: "pointer",
  "&:hover": {
    color: "#FF885B",
    textDecoration: "underline",
  },
  "&.Mui-selected": {
    color: "#FF885B",
    fontWeight: "600",
    borderBottom: "2px solid #FF885B",
  },
}));

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: "#FFFFF6",
        justifyContent: "center",
        height: "4.5rem",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
            }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <img src="/icons/logo.svg" alt="logo" />
              
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <NavBarLink href="/" isActive={pathname === "/"}>
                Home
              </NavBarLink>
              <NavBarLink href="/about" isActive={pathname === "/about"}>
                About
              </NavBarLink>
              <NavBarLink href="/about" isActive={pathname === "/find-recipe"}>
                Find Your Recipe
              </NavBarLink>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SearchBar />
          <Box
            sx={{
              color: "#FF885B",
              alignItems: "center",
              display: "flex",
              gap: 2,
            }}
          >
            <Tooltip title="Notification">
              <IconButton color="inherit">
                <Settings />
              </IconButton>
            </Tooltip>
            <Tooltip title="Messages">
              <IconButton color="inherit">
                <CircleUserRound />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
