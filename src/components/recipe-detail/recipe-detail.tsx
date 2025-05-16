import { CheckCircle } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  name: string;
  image_url: string;
  num_of_ingredient: number;
  link_recipe: string;
  ingedient: string[];
  nutrition_fact: string[];
  onClose: () => void;
}

const RecipeDetail = ({
  name,
  image_url,
  num_of_ingredient,
  link_recipe,
  ingedient,
  nutrition_fact,
  onClose,
}: Props) => {
    const formattedLink = link_recipe.startsWith("http")
    ? link_recipe
    : `https://${link_recipe}`;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "4.5rem",
        right: 0,
        width: 400,
        height: "calc(100vh - 4.5rem)",
        bgcolor: "#FFFFF6",

        boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
        overflowY: "auto",
        zIndex: 1200,
        p: 2,
        borderRadius: 2,

        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#FF885B",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#FF885B",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
        size="small"
      >
        <CloseIcon />
      </IconButton>
      <Card
        sx={{
          bgcolor: "#FFFFF6",
          marginTop: "1.4rem",
        }}
      >
        <CardMedia component="img" height="200" image={image_url} alt={name} />

        <CardContent>
          <Typography sx={{ fontWeight: 700, fontSize: 25 }}>{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            you have{" "}
            <span
              style={{ fontSize: "1.3rem", color: "#FF885B", fontWeight: 500 }}
            >
              {num_of_ingredient}{" "}
            </span>
            ingredient
          </Typography>

          <Typography variant="subtitle1" mt={2}>
            Ingredient
          </Typography>

          <List dense>
            {ingedient.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
                <ListItemIcon>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="24"
                      height="24"
                      transform="translate(0.510254 0.195312)"
                      fill="white"
                    />
                    <path
                      d="M9.51025 12.1953L11.5103 14.1953L15.5103 10.1953M22.5103 12.1953C22.5103 17.7182 18.0331 22.1953 12.5103 22.1953C6.98741 22.1953 2.51025 17.7182 2.51025 12.1953C2.51025 6.67246 6.98741 2.19531 12.5103 2.19531C18.0331 2.19531 22.5103 6.67246 22.5103 12.1953Z"
                      stroke="#00AA11"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            fullWidth
            href={formattedLink}
            target="_blank"
            sx={{
              mt: 2,
              backgroundColor: "#FF885B",
              fontSize: "1rem",
              color: "#FFFFF6",
              "&:hover": { backgroundColor: "#d35400" },
              alignItems:"center",
              justifyContent:"center",
            }}
          >
             <Box>
    <Typography variant="subtitle1" sx={{ lineHeight: 1.0 }}>
      View Full Recipe
    </Typography>
    <Typography
      variant="caption"
      sx={{  color: "#FFFFF6", opacity: 0.9 }}
    >
      {formattedLink}
    </Typography>
  </Box>
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{}}>
            Nutrition Facts
          </Typography>
          {nutrition_fact.map((fact, idx) => (
            <Box
              key={idx}
              display="flex"
              justifyContent="space-between"
              borderBottom="1px solid #eee"
              py={1}
            >
              <Typography color="#FF885B">{fact}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetail;
