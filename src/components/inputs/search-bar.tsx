import { InputAdornment, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SearchIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  PlaceHolder: string;
  Width: string;
}

const SearchBar = ({ PlaceHolder, Width }: SearchBarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const onHandleKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (searchRef.current && searchRef.current.value.trim() !== "") {
          navigate(`/search?key=${searchRef.current.value}`);
        }
      }
    },
    [navigate],
  );

  return (
    <TextField
      inputRef={searchRef}
      onKeyDown={onHandleKey}
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
          color: grey[900],
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
