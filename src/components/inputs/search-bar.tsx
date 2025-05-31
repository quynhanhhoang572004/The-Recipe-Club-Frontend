import { InputAdornment, TextField} from "@mui/material";

import { SearchIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";


interface SearchBarProps {
  PlaceHolder: string;
  Width: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ PlaceHolder, Width, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);


const onHandleKey = useCallback(
  (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchRef.current?.value.trim()) {
      const query = searchRef.current.value.trim();
      if (onSearch) {
        onSearch(query); 
      }
    }
  },
  [onSearch]
);


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value;
  setValue(newValue);
  if (onSearch) {
    onSearch(newValue);
  }
};




  return (
    <TextField
      inputRef={searchRef}
      value={value}
      onKeyDown={onHandleKey}
      onChange={handleChange}
      variant="outlined"
      placeholder={PlaceHolder}
      sx={{
        width: Width,
        "& .MuiInputBase-root": {
          height: "2.3rem",
          borderRadius: "0.625rem",
        },
        "& .MuiOutlinedInput-root": {
          fontWeight: 300,
          fontSize: 16,
      
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF885B",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF885B",
            borderWidth: 2,
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FF885B",
        },
      }}
         slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="#FF885B" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
