import axios from "axios";
import React, { useEffect, useState } from "react";

import "../style/details.css";

export default function Pokemon(props) {
  console.log(props);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState("");
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
        console.log(r.data);
        setHeight(r.data.height);
        setWeight(r.data.weight);
        setName(r.data.name);
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

  return (
    <div className="container">
      <div
        className={`pokemon-details ${
          props.location.search.slice(7).split(",")[0]
        }`}
      >
        <h1 className="name">{name}</h1>
        <div className="types-div">
          {props.location.search
            .slice(7)
            .split(",")
            .map((type) => {
              return (
                <p
                  key={type}
                  className={`type ${
                    props.location.search.slice(7).split(",")[0]
                  }`}
                >
                  {type}
                </p>
              );
            })}
        </div>
        <img src={image} alt={name} className="large-image" />
      </div>
    </div>
  );
}
