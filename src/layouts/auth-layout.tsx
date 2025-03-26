import SeoMetaTags from "@/components/seo-meta-tags";
import {Outlet} from "react-router-dom";

// type HomeLayoutProps = ChildrenNodeProps;
// { children }: HomeLayoutProps

const AuthLayout = () => {
  return (
    <>
      <SeoMetaTags title="Auth" />
      {/* {children} */}
      <Outlet />
    </>
  );
};

export default AuthLayout;
