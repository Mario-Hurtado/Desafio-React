import "./App.css";
import HeroCard from "./components/HeroCard";
import Search from "./components/Search";
import { useState } from "react";

function App() {
  // A state hook is used to store all the heroes and send them as props to the other components
  const [heroes, setHeroes] = useState([]);

  return (
    <div className="App">
      <h1 className="title"> MARVEL HEROES </h1>
      <Search heroes={heroes} setHeroes={setHeroes} />
      <br />
      <HeroCard heroes={heroes} setHeroes={setHeroes} />
    </div>
  );
}

export default App;
