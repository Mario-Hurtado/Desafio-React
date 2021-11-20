// Material UI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

// Styles for search button
const btnStyles = {
  marginLeft: "10px",
  fontFamily: "Nunito Sans",
  backgroundColor: "#ff452b",
  marginTop: "2px",
  height: "55px",
};

const Search = (props) => {
  // A state hook is used to store the input name given by the user
  const [heroName, setHeroName] = useState("");

  const [option, setOption] = useState("More than 20 comics");

  let heroes = [...props.heroes];
  let { setHeroes } = props;

  // Default element to show when the search does not obtain any results
  const emptySearch = [
    {
      name: "No heroes found",
      description: "Please try again",
      thumbnail: {
        path: "https://blogs.unsw.edu.au/nowideas/files/2018/11/error-no-es-fracaso",
        extension: "jpg",
      },
      urls: [
        {
          type: "detail",
          url: "https://blogs.unsw.edu.au/nowideas/files/2018/11/error-no-es-fracaso.jpg",
        },
        {
          type: "comiclink",
          url: "https://blogs.unsw.edu.au/nowideas/files/2018/11/error-no-es-fracaso.jpg",
        },
      ],
      comics: {
        available: 0,
      },
      series: {
        available: 0,
      },
      stories: {
        available: 0,
      },
    },
  ];

  // Function to store the input name for the search
  const handleChange = (event) => {
    const newHeroName = event.target.value;
    setHeroName(newHeroName);
  };

  // Function to search the hero using the input name given by the user
  const filterByHeroName = (hero) => {
    return hero.name === heroName;
  };

  // Function to handle behavior when the user clicks on the search button
  const handleClick = () => {
    if (heroName === "") {
      setHeroes(emptySearch);
    } else {
      let heroesTemp = heroes.filter(filterByHeroName);
      setHeroes(heroesTemp);
    }
  };

  const handleFilterChange = (event) => {
    let heroesTemp = heroes;
    setOption(event.target.value);
    if (option == "More than 20 comics") {
      heroesTemp = heroes.filter(function f(element) {
        return element.comics.available > 20;
      });
    }
    if (option == "Less than 10 series") {
      heroesTemp = heroes.filter(function f(element) {
        return element.series.available < 10;
      });
    }
    if (option == "More than 8 stories") {
      heroesTemp = heroes.filter(function f(element) {
        return element.stories.available > 8;
      });
    }
    setHeroes(heroesTemp);
  };

  return (
    <div>
      <div>
        <TextField
          id="filled-search"
          label="Search hero by name"
          type="search"
          style={{ fontFamily: "Nunito Sans" }}
          variant="filled"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          onClick={() => {
            handleClick();
          }}
          style={btnStyles}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>
      <br></br>
      <div>
        <FormControl>
          <InputLabel
            style={{ fontFamily: "Nunito Sans" }}
            id="demo-simple-select-label"
          >
            Filter
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={option}
            style={{
              marginLeft: "10px",
              width: "200px",
              fontFamily: "Nunito Sans",
            }}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value={"More than 20 comics"}>
              More than 20 comics
            </MenuItem>
            <MenuItem value={"Less than 10 series"}>
              Less than 10 series
            </MenuItem>
            <MenuItem value={"More than 8 stories"}>
              More than 8 stories
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Search;
