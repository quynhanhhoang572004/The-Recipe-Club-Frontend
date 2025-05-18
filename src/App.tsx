import AuthLayout from "./layouts/auth-layout";
import SignInpage from "@/pages/auth/sign-in-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
import MyPantryPage from "./pages/my-pantry/my-pantry-page";
import Home from "./pages/homepage/home";
import HomepageAfterLogin from "./pages/homepage/homepage-with-login";
import ReviewAndRating from "./pages/review/review-and-rating-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInpage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypantry" element={<MyPantryPage />} />
          <Route path="/home" element={<HomepageAfterLogin />} />
          <Route path="/review" element={<ReviewAndRating />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
