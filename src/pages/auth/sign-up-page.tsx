import SeoMetaTags from "@/components/seo-meta-tags";
import SignUpForm from "@/sections/auth/sign-up-form";
import { Box, Card } from "@mui/material";

const signUpPage = () => {
  return (
    <>
      <SeoMetaTags title="Sign up" />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          backgroundImage: `url(images/sign-up-background.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          position: "relative",
          padding: "5rem",
        }}
      >
        <Card
          elevation={12}
          sx={{
            padding: "1.5rem",
            width: "40rem",
          }}
        >
          <SignUpForm />
        </Card>
      </Box>
    </>
  );
};
export default signUpPage;
