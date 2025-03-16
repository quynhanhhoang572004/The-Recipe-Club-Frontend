import { Helmet } from "react-helmet";

interface SeoMetaTagsProps {
  title: string;
}

const SeoMetaTags = ({ title }: SeoMetaTagsProps) => {
  return (
    <Helmet>
      <title>{title} - Recipe Admin</title>
    </Helmet>
  );
};

export default SeoMetaTags;
