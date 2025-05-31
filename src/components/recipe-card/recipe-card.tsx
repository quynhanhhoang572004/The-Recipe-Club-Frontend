import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";

interface Props {
  name: string;
  image_url: string;
  num_of_ingredient: number;
  link_recipe: string;
}

const RecipeCard = ({
  name,
  link_recipe,
  image_url,
  num_of_ingredient,
}: Props) => {
  const formattedLink = link_recipe.startsWith("http")
    ? link_recipe
    : `https://${link_recipe}`;

  return (
    <Card
      sx={{
        cursor: "pointer",
        display: "flex",
      minHeight: 320,
        flexDirection: "column",
        gap: 2,
        border: "1px solid #d4d4d4",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          transform: "scale(1.05)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <CardMedia component="img" image={image_url} alt={name} />
      <CardContent>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{name}</Typography>
        <Typography
          sx={{
            color: "#FF885B",
            fontSize: 14,
          }}
        >
          You have <span>{num_of_ingredient}</span> match ingredient
        </Typography>
        <Link
          sx={{
            fontSize: 14,
            fontWeight: 700,
          }}
          href={formattedLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link_recipe}
        </Link>
      </CardContent>
    </Card>
  );
};
export default RecipeCard;
