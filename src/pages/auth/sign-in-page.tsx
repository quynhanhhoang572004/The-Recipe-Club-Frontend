import SignInForm from "@/sections/auth/sign-in-form";
import { Box, Card, Stack, Typography } from "@mui/material";
import backgroundImage from "../../assets/images/sign-in-background.png";


const signInPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: " left center",
        position: "relative",
        padding: "80px",
        margin: 0,

        "&::before": {
          content: '""', // Required for pseudo-elements
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",

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
          margin: "30px",
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
          {/* <img src="/vite.svg" />
          <Stack>
            <Typography fontWeight={800}>Recipe Club - Admin</Typography>
            <Typography
              sx={{
                color: "#737373",
              }}
            >
              Welcome to The Recipe Club
            </Typography>
          </Stack> */}
        
        </Box>
        <SignInForm />
      </Card>
    </Box>
  );
};
export default signInPage;
