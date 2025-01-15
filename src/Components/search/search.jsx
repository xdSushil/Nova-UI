import React from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBar() {
    const [searchText, setSearchText] = React.useState("");

    const handleClear = () => {
        setSearchText("");
    };

    const handleSearch = () => {
        console.log("Searching for:", searchText);
        // Add your search logic here
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "10vh",
                width: "50vw",
                backgroundColor: "transparent",
                padding: "0 16px",

            }}
        >
            <TextField
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                variant="outlined"
                fullWidth
                sx={{
                    boxShadow: "0px 4px 25px 5px #1a1919",
                    maxWidth: "600px",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "30px",
                    "& .MuiOutlinedInput-root": {
                        color: "#d1d1d1",
                        "& fieldset": {
                            borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                            borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent",
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "#27cccc" }} />
                        </InputAdornment>
                    ),
                    endAdornment: searchText && (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClear} sx={{ color: "#31a3a3" }}>
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <IconButton
                onClick={handleSearch}
                sx={{
                    boxShadow: "0px 4px 25px 15px #1a1919",
                    marginLeft: "16px",
                    backgroundColor: "#31a3a3",
                    color: "#121212",
                    padding: "12px",
                    borderRadius: "50%",
                    "&:hover": {
                        backgroundColor: "#2e8f8f",
                    },
                }}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    );
}

export default SearchBar;
