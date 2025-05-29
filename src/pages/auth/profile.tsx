import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/nav-bar/nav-bar";

import { useAppSelector } from "@/hooks/use-app-selector";
import { getMe } from "@/api/auth.service";
import { useState, useEffect } from "react";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUsername] = useState("");
  const [image_url, setImageUrl] = useState("");
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await getMe();
        setUsername(response.data.email);
        setImageUrl(response.data.profile.avatar_url);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchMe();
  }, [isAuthenticated]);

  return (
    <Box
      sx={{
        bgcolor: "#fffff6",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <Box
        sx={{
          top: "4.5rem",
          width: "100vw",
          height: "100vh",
          position: "fixed",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: { sm: "26vw", lg: "26em" },
            height: { sm: "23vw", lg: "23em" },
            top: "11vh",
            left: "-4vw",
            borderRadius: "50%",
            bgcolor: "#ff885b",
          }}
        />
        <Box
          sx={{
            position: "fixed",
            width: { sm: "26vw", lg: "26em" },
            height: { sm: "23vw", lg: "23em" },
            top: "65vh",
            left: "73vw",
            borderRadius: "50%",
            bgcolor: "#ff885b",
          }}
        />
        <Box
          sx={{
            position: "fixed",
            width: { sm: "26vw", lg: "26em" },
            height: { sm: "23vw", lg: "23em" },
            top: "13.5vh",
            left: "85vw",
            borderRadius: "50%",
            bgcolor: "#ff885b",
          }}
        />
        <Box
          sx={{
            position: "fixed",
            width: { sm: "20vw", lg: "14em" },
            height: { sm: "17vw", lg: "13em" },
            top: "66.5vh",
            left: "-3.5vh",
            borderRadius: "50%",
            bgcolor: "#ff885b",
          }}
        />
        <Box
          sx={{
            position: "fixed",
            width: { sm: "7vw", lg: "7em" },
            height: { sm: "6vw", lg: "6em" },
            top: "17vh",
            left: "77vw",
            borderRadius: "50%",
            bgcolor: "#ff885b",
          }}
        />
        <Box
          sx={{
            position: "fixed",
            width: { sm: "1.7vw", lg: "1.7em" },
            height: { sm: "1.8vw", lg: "1.8em" },
            top: "17.6vh",
            left: "75vw",
            borderRadius: "50%",
            bgcolor: "#ff885b",
          }}
        />
        <Box
          sx={{
            position: "fixed",
            width: { sm: "0.9vw", lg: "0.9em" },
            height: { sm: "0.9vw", lg: "0.9em" },
            top: "15.5vh",
            left: "76.5vw",
            borderRadius: "50%",
            bgcolor: "#ff885b",
          }}
        />

        {/* Hình ảnh */}
        <Box
          component="img"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad4e863fa4d509f70a2f26500672e61ba7fe521c?placeholderIfAbsent=true&apiKey=54645ae1b26d40969fecd1dde095fca5"
          sx={{
            position: "fixed",
            width: { sm: "30vw", lg: "30em" },
            height: { sm: "30vw", lg: "30em" },
            top: "27vh",
            left: "1vw",
            objectFit: "cover",
          }}
        />
        <Box
          component="img"
          src="/images/Red and Beige Food Sale Instagram Post (2) 3.png"
          sx={{
            position: "fixed",
            width: { sm: "50vw", lg: "60em" },
            height: { sm: "50vw", lg: "50em" },
            top: { sm: "13vh", lg: "-2vh" },
            left: 0,
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <Box
          component="img"
          src="/images/Red and Beige Food Sale Instagram Post (2) 4.png"
          alt="Background 2"
          sx={{
            position: "fixed",
            width: { sm: "50vw", lg: "50em" },
            height: { sm: "50vh", lg: "20em" },
            top: "50vh",
            left: "60vw",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      </Box>

      {/* Nội dung chính */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            color: "#ff885b",
            textAlign: "center",
            fontSize: "3em",
          }}
        >
          User profile
        </Typography>
        <Avatar
          sx={{
            width: 85,
            height: 85,
            marginBottom: 2,
          }}
          alt={user}
          src={image_url}
        />

        <Box
          sx={{
            bgcolor: "#FFFFF6",
            border: "2px solid #FF885B",
            width: "35rem",
            height: "4rem",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#FF885B",
              fontSize: "2rem",
            }}
          >
            {user}
          </Typography>
        </Box>

        <Button
          onClick={() => navigate("/signin")}
          variant="contained"
          sx={{
            bgcolor: "#ff885b",
            color: "#FFFFF6",
            borderRadius: "0.8vw",
            width: "20vw",
            height: "6.5vh",
            fontSize: "1.5rem",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#e57a51",
            },
          }}
        >
          Sign Out
        </Button>

        <Link
          component="button"
          onClick={() => navigate("/change-password")}
          underline="hover"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "1.2em",
            color: "#ff885b",
          }}
        >
          Change Password
        </Link>

        <Link
          component="button"
          onClick={() => navigate("/delete-account")}
          underline="hover"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "1.2em",
            color: "#ff885b",
          }}
        >
          Delete My Account
        </Link>
      </Container>
    </Box>
  );
};

export default UserProfile;
