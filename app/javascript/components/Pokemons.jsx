import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import PageSelector from "./PageSelector";
import MainHeader from "./MainHeader";
import isAuthenticated from "../services/authService";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    try {
      axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
        setPokemons(response.data.results);
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
        setLoaded(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setUser(isAuthenticated());
  }, []);

  const displayPokemons = pokemons.map((pokemon) => {
    return <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />;
  });

  const handleClick = async (e) => {
    e.preventDefault();
    setPokemons([]);
    setLoaded(false);

    if (e.target.innerHTML === "Next") {
      await axios.get(nextUrl).then((r) => {
        setPokemons(r.data.results);
        setNextUrl(r.data.next);
        setPreviousUrl(r.data.previous);
        setLoaded(true);
      });
    } else {
      await axios.get(previousUrl).then((r) => {
        setPokemons(r.data.results);
        setNextUrl(r.data.next);
        setPreviousUrl(r.data.previous);
        setLoaded(true);
      });
    }
  };

  return (
    <div className="pokemons-list">
      <div className="grid">
        <MainHeader user={user} />
        <PageSelector
          nextUrl={nextUrl}
          previousUrl={previousUrl}
          handleClick={handleClick}
        />
        {loaded && displayPokemons}
        <PageSelector
          nextUrl={nextUrl}
          previousUrl={previousUrl}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
