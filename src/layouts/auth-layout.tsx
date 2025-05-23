import SeoMetaTags from "@/components/seo-meta-tags";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <SeoMetaTags title="Auth" />
      {/* {children} */}
      <Outlet />
    </>
  );
};

export default AuthLayout;
