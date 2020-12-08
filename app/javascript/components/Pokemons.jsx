import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import PageSelector from "./PageSelector";
import MainHeader from "./MainHeader";
import isAuthenticated from "../services/authService";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [sortedPokemons, setSortedPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(false);
  const [favorites, setFavorites] = useState();

  const types = [
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy",
  ];

  // Fetch pokemons url (20 pokemons in once)
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

  // Check if authenticated
  useEffect(() => {
    setUser(isAuthenticated());
    fetchFavorites();
  }, [loaded]);

  // display all the pokemons card component
  const displayPokemons = pokemons.map((pokemon) => {
    return <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />;
  });

  // display all the pokemon card component with only the selected type
  const displaySortedPokemons = sortedPokemons.map((pokemon) => {
    return (
      <Card
        key={pokemon.pokemon.name}
        name={pokemon.pokemon.name}
        url={pokemon.pokemon.url}
      />
    );
  });

  // handle a click on the next or previous page button
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

  // Fetch only certain types of pokemons depending on which one is selected
  const fetchType = async (type) => {
    await axios.get(`https://pokeapi.co/api/v2/type/${type}`).then((r) => {
      setSortedPokemons(r.data.pokemon);
    });
  };

  const fetchFavorites = () => {
    axios.get(`/api/v1/users/${user.id}`).then((r) => {
      setFavorites(r.data.fav_pokemons);
    });
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
        <Tabs className="main-tabs">
          <TabList>
            <Tab>All</Tab>
            {loaded &&
              types.map((type, index) => {
                return (
                  <Tab key={type} onClick={() => fetchType(index + 1)}>
                    {type}
                  </Tab>
                );
              })}
          </TabList>

          <TabPanel className="main-tab-panel">
            {loaded && displayPokemons}
          </TabPanel>
          {types.map((type) => {
            return (
              <TabPanel key={type} className="main-tab-panel">
                {displaySortedPokemons}
              </TabPanel>
            );
          })}
        </Tabs>
        <PageSelector
          nextUrl={nextUrl}
          previousUrl={previousUrl}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
