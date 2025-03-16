import HomeLayout from "@/layouts/home-layout";
import SignInForm from "@/sections/auth/sign-in-form";
import { Box, Card, Stack, Typography } from "@mui/material";

const App = () => {
  return (
    <HomeLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(/bg.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&::before": {
            content: '""', // Required for pseudo-elements
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1,
          },
        }}
      >
        <Card
          elevation={12}
          sx={{
            padding: "24px",
            width: "30rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img src="/vite.svg" />
            <Stack>
              <Typography fontWeight={800}>Recipe Club - Admin</Typography>
              <Typography
                sx={{
                  color: "#737373",
                }}
              >
                Admin dashboard system management
              </Typography>
            </Stack>
          </Box>
          <SignInForm />
        </Card>
      </Box>
    </HomeLayout>
  );
};

export default App;
