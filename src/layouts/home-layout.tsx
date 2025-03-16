import SeoMetaTags from "@/components/seo-meta-tags";
import { ChildrenNodeProps } from "@/types/children";

type HomeLayoutProps = ChildrenNodeProps;

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <SeoMetaTags title="Home" />
      {children}
    </>
  );
};

export default HomeLayout;
