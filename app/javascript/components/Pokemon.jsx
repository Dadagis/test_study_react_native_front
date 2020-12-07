import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import isAuthenticated from "../services/authService";
import mySvg from "../../assets/images/pokemon.svg";

import "../style/details.css";
import AboutInfo from "./AboutInfo";
import Notes from "./Notes";
import PokemonHeader from "./PokemonHeader";
import PokemonTypes from "./PokemonTypes";
import StatInfo from "./StatInfo";

export default function Pokemon(props) {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [image, setImage] = useState("");
  const [hp, setHp] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [specialAttack, setSpecialAttack] = useState(0);
  const [specialDefense, setSpecialDefense] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [captureRate, setCaptureRate] = useState(0);
  const [genderRate, setGenderRate] = useState(0);
  const [genera, setGenera] = useState("");
  const [types, setTypes] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`)
      .then((r) => {
        setHeight(r.data.height);
        setWeight(r.data.weight);
        setName(r.data.name);
        setId(r.data.id);
        setImage(r.data.sprites.other.dream_world.front_default);
        setHp(r.data.stats[0].base_stat);
        setAttack(r.data.stats[1].base_stat);
        setDefense(r.data.stats[2].base_stat);
        setSpecialAttack(r.data.stats[3].base_stat);
        setSpecialDefense(r.data.stats[4].base_stat);
        setSpeed(r.data.stats[5].base_stat);
      }, []);
  });

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon-species/1/").then((r) => {
      setCaptureRate(r.data.capture_rate);
      setGenderRate(r.data.gender_rate);
      setGenera(r.data.genera[7].genus);
    });
  }, []);

  useEffect(() => {
    setTypes(props.location.search.slice(7).split(","));
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(isAuthenticated());
      fetchUser();
    } else {
      setUser({ fav_pokemons: [], logged: false });
    }
    setLoaded(true);
  }, [id]);

  const calculateGenderRate = () => {
    if (genderRate != -1) {
      const female = (genderRate / 8) * 100;
      const male = 100 - female;
      return (
        <span className="about-value">
          <i id="male" className="fas fa-mars"></i>
          {` ${male} %`} - <i id="female" className="fas fa-venus"></i>
          {` ${female} %`}
        </span>
      );
    } else {
      return <span className="about-value">Unknown gender</span>;
    }
  };

  const handleClick = () => {
    props.history.push("/");
  };

  const fetchUser = async () => {
    try {
      axios.get(`/api/v1/users/${user.id}?pokemon_id=${id}`).then((r) => {
        setUser(r.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    if (!user.fav_pokemons.includes(id)) {
      try {
        axios
          .post("/api/v1/liked_pokemons/", {
            liked_pokemons: {
              user_id: user.id,
              pokemon_id: id,
            },
          })
          .then((r) => fetchUser());
      } catch (error) {
        console.log(error);
      }
    } else {
      const payload = { liked_pokemons: { user_id: user.id, pokemon_id: id } };
      try {
        axios
          .delete(`/api/v1/liked_pokemons/${id}`, { data: payload })
          .then((r) => fetchUser());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div
        className={`pokemon-details ${
          props.location.search.slice(7).split(",")[0]
        }`}
      >
        <img className="large-svg" src={mySvg} alt="pokeball" />
        <PokemonHeader
          previous={handleClick}
          favorite={handleFavorite}
          user={user}
          id={id}
          loaded={loaded}
        />
        <h1 className="name-big">{name}</h1>
        <PokemonTypes types={props.location.search} />
        <img src={image} alt={name} className="large-image" />
      </div>
      <div className="pokemon-stats">
        {loaded && (
          <Tabs className="tabs">
            <TabList>
              <Tab>About</Tab>
              <Tab>Base Stats</Tab>
              <Tab disabled={user.logged === false ? true : false}>Notes</Tab>
            </TabList>

            <TabPanel className="tab-panel">
              <h2 className="category">About</h2>
              <AboutInfo data={`${height / 10} m`} label="Height" />
              <AboutInfo data={`${weight / 10} kg`} label="Weight" />
              <AboutInfo data={genera} label="Genre" />
              <AboutInfo
                data={`${Math.round((captureRate * 100) / 255)} %`}
                label="Capture rate"
              />
              <AboutInfo data={calculateGenderRate()} label="Gender rate" />
            </TabPanel>
            <TabPanel className="tab-panel">
              <h2 className="category">Base stats</h2>
              <StatInfo data={hp} label="HP" />
              <StatInfo data={attack} label="Attack" />
              <StatInfo data={defense} label="Defense" />
              <StatInfo data={specialAttack} label="Special Attack" />
              <StatInfo data={specialDefense} label="Special Defense" />
              <StatInfo data={speed} label="Speed" />
            </TabPanel>
            <TabPanel className="tab-panel">
              <Notes userInfos={user} id={id} />
            </TabPanel>
          </Tabs>
        )}
      </div>
    </div>
  );
}
