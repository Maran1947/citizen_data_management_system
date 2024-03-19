import {
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
      "& $notchedOutline": {
        borderColor: "red"
      },
      "&:hover $notchedOutline": {
        borderColor: "blue"
      },
      "&$focused $notchedOutline": {
        borderColor: "#03ff30!important"
      }
    },
    focused: {},
    notchedOutline: {}
  }));

export default function SearchInput({
    searchValue,
    setSearchValue,
    setIsFilter,
}) {
    const outlinedInputClasses = useOutlinedInputStyles();
    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchIcon = () => {
        setIsFilter(true);
    };

    const handleOnPressEnter = (e) => {
        if (e.key === "Enter") {
            handleSearchIcon();
        }
    };

    const handleSearchIconDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Stack direction={"row"} alignItems={"center"}>
            <FormControl
                sx={{
                    width: "50ch",
                    background: '#fff',
                    borderRadius: '20px',
                    color: '#000',
                    "@media (max-width: 768px)": {
                        width: "25ch"
                    },
                    "@media (max-width: 425px)": {
                        width: "20ch"
                    },
                }}
                variant="outlined"
            >
                <OutlinedInput
                    sx={{
                        borderRadius: '20px',
                    }}
                    color="success"
                    id="outlined-search-input"
                    type={"text"}
                    value={searchValue}
                    onChange={handleSearchInput}
                    onKeyDown={handleOnPressEnter}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                className="search-icon"
                                aria-label="Search Icon"
                                onClick={handleSearchIcon}
                                onMouseDown={handleSearchIconDownPassword}
                                edge="end"
                            >
                                <SearchIcon className="search-icon" />
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder="Search"
                />
            </FormControl>
        </Stack>
    );
}
