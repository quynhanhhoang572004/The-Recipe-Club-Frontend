import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material"

interface Props{
    name: string,
    image_url: string,
    num_of_ingredient:number,
    link_recipe: string,
}

const RecipeCard = ({name, link_recipe, image_url, num_of_ingredient}: Props) =>{

     const formattedLink = link_recipe.startsWith("http")
    ? link_recipe
    : `https://${link_recipe}`;

    return(
    <Card
    sx={{
        width:"15rem",
        height:"20rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        gap:2
    }}
    >
        <CardMedia
         component="img"
        image={image_url}
        />
        <CardContent>
            <Typography
            sx={{fontSize:15,
                fontWeight:800
            }}>
                {name}
            </Typography>
           
            <Typography 
            sx={{
            color: "#FF885B",
            
            }}>
                You have <span>{num_of_ingredient}</span> {" "} match ingredient
            </Typography>
             <Link
            sx={{
                fontSize:13,
                fontWeight:500,
                  
            }}
            href={formattedLink}
             target="_blank" 
              rel="noopener noreferrer"
            >
                
                {link_recipe}
            </Link>

        </CardContent>

        
    </Card>);
}
export default RecipeCard;