import SignInpage from "@/pages/auth/sign-in-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
import Profile from "./pages/auth/profile";
import MyPantryPage from "./pages/my-pantry/my-pantry-page";
import Home from "./pages/homepage/home";
import HomepageAfterLogin from "./pages/homepage/homepage-with-login";
import Rating from "./pages/rating-page/rating-page";

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInpage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/test" element={<Profile />} />
          <Route path="/mypantry" element={<MyPantryPage />} />
          <Route path="/home" element={<HomepageAfterLogin />} />
          <Route path="/rating" element={<Rating/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
};

export default App;