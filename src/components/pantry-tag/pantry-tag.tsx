import React from "react";
import { Chip } from "@mui/material";

interface PantryTagProps {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

const PantryTag: React.FC<PantryTagProps> = ({  label, selected, onClick }) => (
  <Chip
    label={label}
    color={selected ? "warning" : "default"}
    variant={selected ? "filled" : "outlined"}  
     onClick={onClick}
    clickable

  />
);

export default PantryTag;
