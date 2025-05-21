import React from "react";
import { Chip } from "@mui/material";

interface PantryTagProps {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

const PantryTag: React.FC<PantryTagProps> = ({  label, selected, onClick }) => (
  <Chip
  sx={{
    borderColor: selected ? "#FF885B"  : "#FF885B",
    fontSize: "1rem",
    fontWeight: 500,
  }}
    label={label}
    color={selected ? "warning" : "default"}
    variant={selected ? "filled" : "outlined"}  
     onClick={onClick}
    clickable

  />
);

export default PantryTag;
