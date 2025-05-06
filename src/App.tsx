import AuthLayout from "./layouts/auth-layout";
import SignInpage from "@/pages/auth/sign-in-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
import { AuthProvider } from "@/components/hooks/contexts/AuthContext"; 
import MyPantryPage from "./pages/my-pantry/my-pantry-page";
import Home from "./pages/homepage/home";

import HomepageAfterLogin from "./pages/homepage/homepage-with-login";

const App = () => {
    return ( 
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInpage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/mypantry" element={<MyPantryPage/>}/>
            
           
            <Route path="/home" element={<HomepageAfterLogin/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    );
  };
 

export default App;
