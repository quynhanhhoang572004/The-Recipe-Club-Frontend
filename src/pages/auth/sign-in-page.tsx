import SeoMetaTags from "@/components/seo-meta-tags";
import SignInForm from "@/sections/auth/sign-in-form";
import { Box, Card } from "@mui/material";

const signInPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        backgroundImage: `url(images/sign-in-background.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        position: "relative",
        padding: "5rem",
      }}
    >
      <SeoMetaTags title="Sign in" />
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
          margin: "1.875rem",
          marginRight: "3.75rem",
          marginTop: "0.3125rem",
        }}
      >
        <SignInForm />
      </Card>
    </Box>
  );
};
export default signInPage;
