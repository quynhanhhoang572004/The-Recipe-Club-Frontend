import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Category, Ingredient } from '@/types/pantry/ingredient';
import PantryCategoryBlock from '@/components/pantry-category/pantry-category-block';
import { fetchCategories, fetchIngredients, fetchUserPantry,putUserPantry } from '@/api/my-pantry.service';

interface Props {
  onCountChange?: (count: number) => void;  
  onPantryUpdate?: () => void;
}

const IngredientGroup = ({ onCountChange,onPantryUpdate }:Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  
  const reportCount = (ids: Set<number>) => {
    if (onCountChange) onCountChange(ids.size);
  };

  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const [cats, ings] = await Promise.all([
          fetchCategories(),
          fetchIngredients(),
        ]);


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

        const mergedIngredients = ings.map((i: Ingredient) => ({
          ...i,
          category_id: i.category_id ?? i.category?.id,
          selected: userIngredientIds.has(i.id),
        }));

        setCategories(cats);
        setIngredients(mergedIngredients);
        setSelectedIds(userIngredientIds)
        reportCount(userIngredientIds);
      } catch {
        
      } finally {
        setLoading(false);
      }
    };

    fetchPantry();
  }, []);

  const toggleIngredient = async (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    
    else next.add(id);

    setSelectedIds(next);
    setIngredients((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, selected: next.has(id) } : i
      )
    );
    reportCount(next);

    try {
      const token = localStorage.getItem("access_token")!;
      await putUserPantry(token, Array.from(next));
      if (onPantryUpdate) onPantryUpdate();
    } catch (err) {
      console.error("Save error:", err);
     
    }
  };

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
            selectedIds={selectedIds}       
            onToggle={toggleIngredient}
          />
        );
      })}
    </Box>
  );
};

export default IngredientGroup;
