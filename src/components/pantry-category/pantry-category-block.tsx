import React, { useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import PantryTag from "@/components/pantry-tag/pantry-tag";
import { Ingredient } from "@/types/pantry/ingredient";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Props {
  category: string;
  items: Ingredient[];
  maxVisible?: number;
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
}

const PantryCategoryBlock: React.FC<Props> = ({
  category,
  items,
  selectedIds,
  onToggle,
  maxVisible = 10,
}) => {
  const [expanded, setExpanded] = useState(false);

  const displayedItems = expanded ? items : items.slice(0, maxVisible);

  const hiddenCount = items.length - displayedItems.length;

  const selectedCount = items.filter((i) => selectedIds.has(i.id)).length;

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #ddd",
        p: 2,
        mb: 3,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        backgroundColor: "#F2F2F2",
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
          color="#FF885B"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {category}
          {expanded ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>
          {selectedCount}/{items.length}
        </Typography>
      </Box>
      <Divider
        sx={{
          mt: 1,
          mb: 2,
          borderColor: "#FF885B",
          opacity: 0.6,
          height: "2px",
        }}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
        {displayedItems.map((item) => (
          <PantryTag
            key={item.id}
            label={item.name}
            selected={!!item.selected}
            onClick={() => onToggle(item.id)}
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
