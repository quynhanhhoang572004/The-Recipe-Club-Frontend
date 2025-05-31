import SeoMetaTags from "@/components/seo-meta-tags";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <SeoMetaTags title="Home" />
      {/* {children} */}
      <Outlet />
    </>
  );
};

export default HomeLayout;
