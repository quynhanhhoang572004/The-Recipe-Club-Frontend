import HomeLayout from "@/layouts/home-layout";
import SignInpage from "@/pages/auth/sign-in-page"
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
const App = () => {
    return ( 
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/sign-in" element={<SignInpage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };

export default App;
