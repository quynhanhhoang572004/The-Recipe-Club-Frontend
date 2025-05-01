import SignUpForm from "@/sections/auth/sign-up-form";
import { Box, Card } from "@mui/material";


const signUpPage = () => {
  return (
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        backgroundImage: `url(images/sign-up-background.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "left center",
        position: "relative",
        padding: "5rem",
        margin: 0,

        "&::before": {
          content: '""', 
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
          padding: "1.5rem",
          width: "30rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
          zIndex: 2,
          marginRight: "3.75rem",
          marginTop: "0.3125rem",
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
