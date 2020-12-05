import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
        console.log("response", response);
        setPokemons(response.data.results);
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
        setLoaded(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const displayPokemons = pokemons.map((pokemon) => {
    return <Card name={pokemon.name} url={pokemon.url} />;
  });

  return (
    <div className="pokemons-list">
      <div className="grid">{loaded && displayPokemons}</div>
    </div>
  );
}
