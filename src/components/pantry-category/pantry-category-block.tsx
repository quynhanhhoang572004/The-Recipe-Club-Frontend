import React, {useState} from "react";
import {Typography, Box } from "@mui/material";
import PantryTag from "@/components/pantry-tag/pantry-tag";
import { Ingredient } from "@/types/pantry/ingredient";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Props {
  category: string;
  items: Ingredient[];
  maxVisible?: number;
}

const PantryCategoryBlock: React.FC<Props> = ({
  category,
  items,
  maxVisible = 10,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [localItems, setLocalItems] = useState<Ingredient[]>(items);

  const displayedItems = expanded ? localItems : localItems.slice(0, maxVisible);
  const hiddenCount = localItems.length - displayedItems.length;
  const selectedCount = localItems.filter((i) => i.selected).length;

  const toggleSelected = (id: number) => {
    setLocalItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, selected: !i.selected } : i
      )
    );
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #ddd",
        p: 2,
        mb: 3,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        backgroundColor: "#f9f9f9",
      }}
    >
     
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#e88a54"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {category}
          {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>
          {selectedCount}/{localItems.length}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
        {displayedItems.map((item) => (
          <PantryTag
            key={item.id}
            label={item.name}
            selected={!!item.selected}
            onClick={() => toggleSelected(item.id)}
          />
        ))}

        {!expanded && hiddenCount > 0 && (
          <Box
            onClick={() => setExpanded(true)}
            sx={{
              backgroundColor: "#ddd",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              ":hover": { backgroundColor: "#ccc" },
            }}
          >
            + {hiddenCount} more
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PantryCategoryBlock;
