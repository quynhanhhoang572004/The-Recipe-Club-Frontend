import AuthLayout from "./layouts/auth-layout";
import SignInpage from "@/pages/auth/sign-in-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
import { AuthProvider } from "@/components/hooks/contexts/AuthContext"; 

const App = () => {
    return ( 
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignInpage />} />
            <Route path="/signup" element={<SignUpPage />} />
           
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    );
  };

export default App;
