import SignInpage from "@/pages/auth/sign-in-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
import Profile from "./pages/auth/profile";
import MyPantryPage from "./pages/my-pantry/my-pantry-page";
import Home from "./pages/homepage/home";
import AuthLayout from "@/layouts/auth-layout";
import Rating from "./pages/rating-page/rating-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pantry" element={<MyPantryPage />} />
        <Route path="/rating" element={<Rating/>} />
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignInpage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
