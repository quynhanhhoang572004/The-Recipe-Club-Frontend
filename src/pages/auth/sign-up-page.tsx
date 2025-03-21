import SignUpForm from "@/sections/auth/sign-up-form";
import { Box, Card, Stack, Typography } from "@mui/material";
import backgroundImage from "../../assets/images/sign-up-background.png";

const signUpPage = () => {
  return (
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "left center",
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
          marginLeft: "80px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        ></Box>
        <SignUpForm />
      </Card>
    </Box>
  );
};
export default signUpPage;
