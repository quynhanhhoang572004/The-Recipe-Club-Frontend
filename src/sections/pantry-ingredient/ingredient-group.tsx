import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Category, Ingredient } from '@/types/pantry/ingredient';
import PantryCategoryBlock from '@/components/pantry-category/pantry-category-block';
import { fetchCategories, fetchIngredients, fetchUserPantry } from '@/api/my-pantry.service';

const IngredientGroup: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const categoriesData = await fetchCategories();
        const ingredientsData = await fetchIngredients();


        const accessToken = localStorage.getItem('access_token');
        let userIngredientIds = new Set<number>();

        if (accessToken) {
         try{
          const userPantry = await fetchUserPantry(accessToken);
          userIngredientIds = new Set(userPantry.map((i: Ingredient) => i.id));

         }
         catch(error){
            console.error("k load dc", error)
         }
        }

        const mergedIngredients = ingredientsData.map((i: Ingredient) => ({
          ...i,
          category_id: i.category_id ?? i.category?.id,
          selected: userIngredientIds.has(i.id),
        }));

        setCategories(categoriesData);
        setIngredients(mergedIngredients);
      } catch {
        
      } finally {
        setLoading(false);
      }
    };

    fetchPantry();
  }, []);

  if (loading) return <CircularProgress />;

  if (!Array.isArray(categories) || categories.length === 0) {
    return <Typography>Error Loading</Typography>;
  }

  return (
    <Box>
      {categories.map((category) => {
        const items = ingredients.filter((i) => i.category_id === category.id);
        return (
          <PantryCategoryBlock
            key={category.id}
            category={category.name}
            items={items}
          />
        );
      })}
    </Box>
  );
};

export default IngredientGroup;
