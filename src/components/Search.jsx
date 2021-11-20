import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const btnStyles = {
  marginLeft: "10px",
  fontFamily: "Nunito Sans",
  backgroundColor: "#ff452b",
  height: "55px",
};

const Search = (props) => {
  const [heroName, setHeroName] = useState("");

  let heroes = [...props.heroes];
  let { setHeroes } = props;

  const emptySearch = [
    {
      name: "Error while connecting with API. Please try again later",
      description: "Try again later",
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

  const handleChange = (event) => {
    const newHeroName = event.target.value;
    setHeroName(newHeroName);
  };

  const filterByHeroName = (hero) => {
    return hero.name === heroName;
  };

  const handleClick = () => {
    if (heroName === "") {
      setHeroes(emptySearch);
    } else {
      let heroesTemp = heroes.filter(filterByHeroName);
      setHeroes(heroesTemp);
    }
  };

  return (
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
  );
};

export default Search;
