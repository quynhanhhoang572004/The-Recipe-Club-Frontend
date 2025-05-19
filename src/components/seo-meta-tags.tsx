import { Helmet } from "react-helmet";

interface SeoMetaTagsProps {
  title: string;
}

const SeoMetaTags = ({ title }: SeoMetaTagsProps) => {
  return (
    <Helmet>
      <title>{title} - Recipe Club</title>
    </Helmet>
  );
};

export default SeoMetaTags;
