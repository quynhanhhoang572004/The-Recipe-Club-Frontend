import SeoMetaTags from "@/components/seo-meta-tags";
import { ChildrenNodeProps } from "@/types/children";
import {Outlet} from "react-router-dom";

// type HomeLayoutProps = ChildrenNodeProps;
// { children }: HomeLayoutProps

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
