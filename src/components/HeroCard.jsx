import * as React from "react";
// Material UI imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Grid, Container } from "@mui/material";
// Axios is imported for the HTTP request
import axios from "axios";
// MD5 dependency to get the hashed string required as a parameter to fetch the info
import md5 from "md5";

const HeroCard = (props) => {
  let heroes = [...props.heroes];
  let { setHeroes } = props;

  const cardStyle = {
    boxShadow: "5px 10px #ff452b",
    height: "910px",
  };

  // Effect hook is used to make the request to the Marvel API
  React.useEffect(() => {
    const baseURL = "https://gateway.marvel.com:443/v1/public/characters";
    const publicKey = "d3117b862aa475e233f64f8d0198832b";
    const privateKey = "5d9c47f0d9b15b2bdc7f509f290056d784e55966";
    const ts = "peticion";
    const string = ts + privateKey + publicKey;
    axios
      .get(baseURL, {
        params: {
          ts: ts,
          apikey: publicKey,
          hash: md5(string),
        },
      })
      .then((response) => setHeroes(response.data.data.results));
  }, [setHeroes]);

  // Alternate description to display for the heroes who have an empty string as their description
  const altDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum felis nec dui ultrices, vel congue orci interdum. Pellentesque nunc nisi, egestas eu sagittis maximus, venenatis ac est. Nullam sed dignissim nisi. In eu mi non velit laoreet tristique. Cras varius felis facilisis, aliquet orci vitae, egestas quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras et nisi sollicitudin, luctus dui nec, laoreet nisl.";

  // Function to obtain the URL to the hero's comics
  const searchHeroComicLink = (heroUrls) => {
    if (heroUrls.type === "comiclink") {
      return heroUrls.url;
    }
  };

  // Function to obtain the URL to the hero's detail
  const searchHeroDetail = (heroUrls) => {
    if (heroUrls.type === "detail") {
      return heroUrls.url;
    }
  };

  return (
    <Container fixed>
      <Grid container spacing={3}>
        {heroes.map((hero) => (
          // These attributes allow the page to be responsive
          <Grid item xs={12} sm={4} md={3} key={hero.name}>
            <Card style={cardStyle} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="320"
                  image={hero.thumbnail.path + "." + hero.thumbnail.extension}
                  alt={hero.name + " image"}
                />
                <CardContent>
                  <Typography
                    style={{ fontWeight: "bold", fontFamily: "Nunito Sans" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {hero.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: "justify",
                      fontFamily: "Nunito Sans",
                      fontSize: "16px",
                    }}
                    color="text.secondary"
                  >
                    {hero.description === ""
                      ? altDescription
                      : hero.description}
                  </Typography>
                  <ul
                    style={{
                      textAlign: "left",
                      fontFamily: "Nunito Sans",
                      fontSize: "16px",
                    }}
                  >
                    <li style={{ textColor: "dark-grey" }}>
                      Number of comics: {hero.comics.available}
                    </li>
                    <li>Number of series: {hero.series.available}</li>
                    <li>Number of stories: {hero.stories.available}</li>
                  </ul>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  href={hero.urls.filter(searchHeroComicLink)[0].url}
                  style={{ color: "#ff452b", fontFamily: "Nunito Sans" }}
                  target="_blank"
                >
                  See comic info
                </Button>
                <Button
                  size="small"
                  style={{ color: "#ff452b", fontFamily: "Nunito Sans" }}
                  href={hero.urls.filter(searchHeroDetail)[0].url}
                  target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HeroCard;
