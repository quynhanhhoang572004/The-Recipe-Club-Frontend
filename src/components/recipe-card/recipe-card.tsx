import { Card, CardContent, CardMedia, Typography } from "@mui/material"

interface Props{
    name: string,
    image_url: string,
    num_of_ingredient:number,
    link_recipe: string,
}

const RecipeCard = ({name, link_recipe, image_url, num_of_ingredient}: Props) =>{
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
                fontSize:13,
                fontWeight:500,
                  
            }}>
                {link_recipe}
            </Typography>
            <Typography>
                You have <span>{num_of_ingredient}</span> {" "} match ingredient
            </Typography>

        </CardContent>

        
    </Card>);
}
export default RecipeCard;