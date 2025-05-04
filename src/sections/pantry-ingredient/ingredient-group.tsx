import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Category, Ingredient } from '@/types/pantry/ingredient';
import PantryCategoryBlock from '@/components/pantry-category/pantry-category-block';

const IngredientGroup: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const [catRes, ingRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/ingredients/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/ingredients`),
        ]);

        const categoriesJson = await catRes.json();
        const ingredientsJson = await ingRes.json();

        const categoriesData: Category[] = Array.isArray(categoriesJson)
          ? categoriesJson
          : categoriesJson?.data ?? [];

        const ingredientsData: Ingredient[] = ingredientsJson?.data ?? [];

        const accessToken = localStorage.getItem('access_token');
        let userIngredientIds = new Set<number>();

        if (accessToken) {
          try {
            const pantryRes = await fetch(`${process.env.VITE_API_URL}/users/pantries`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (pantryRes.ok) {
              const pantryJson = await pantryRes.json();
              const userPantry: Ingredient[] = Array.isArray(pantryJson?.data)
                ? pantryJson.data
                : [];

              userIngredientIds = new Set(userPantry.map((i) => i.id));
            }
          } catch {
            
          }
        }

        const mergedIngredients = ingredientsData.map((i) => ({
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
