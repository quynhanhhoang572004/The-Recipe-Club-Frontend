import SearchBar from "@/components/inputs/search-bar";
import { useAppSelector } from "@/hooks/use-app-selector";
import { grey } from "@/theme/color";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "@/stores/user-slice";

import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  styled,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { CircleUserRound, Settings } from "lucide-react";
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

const AuthButton = styled(Button)<{
  borderColor: string;
  backgroundColor: string;
  textColor: string;
}>(({ borderColor, backgroundColor, textColor }) => ({
  padding: "8px 16px",
  boxSizing: "border-box",
  border: `1px solid ${borderColor}`,
  backgroundColor: backgroundColor,
  transition: "all 0.2s ease",
  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: 16,
    color: textColor,
  },
  "&:hover": {
    backgroundColor: backgroundColor === "white" ? "#FFF0E6" : "#e26b3f",
    borderColor: "#FF885B",
  },
}));

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    localStorage.removeItem("access_token");
    dispatch(signOut());
    handleClose();
    navigate("/signin");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(signOut());
    handleClose();
    navigate("/signin");
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        position: "fixed",
        top: 0,
        backgroundColor: "#FFFFF6",
        justifyContent: "center",
        height: "4.5rem",
        border: "none",
        borderWidth: "0px",
        borderStyle: "none",
        outline: "none",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        borderRadius: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
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
              <NavBarLink href="/home" isActive={pathname === "/home"}>
                About
              </NavBarLink>
              <NavBarLink href="/pantry" isActive={pathname === "/pantry"}>
                My pantry
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
          <SearchBar
            PlaceHolder={"What’s in your fridge? Start typing..."}
            Width="24rem"
          />
          {isAuthenticated ? (
            <>
              <Tooltip title="User profile">
                <IconButton onClick={() => navigate("/profile")}>
                  <CircleUserRound color="#FF885B" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Settings">
                <IconButton onClick={handleSettingsClick}>
                  <Settings color="#FF885B" />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleProfile}>User Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <AuthButton
                borderColor="#FF885B"
                backgroundColor="white"
                textColor="#FF885B"
                onClick={() => navigate("/signup")}
              >
                <Typography>Sign up</Typography>
              </AuthButton>
              <AuthButton
                borderColor="#FF885B"
                backgroundColor="#FF885B"
                textColor="white"
                onClick={() => navigate("/signin")}
              >
                <Typography>Sign In</Typography>
              </AuthButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
