import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/card.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { name, url } = props;
  const [pokeTypes, setPokeTypes] = useState([]);
  const [image, setImage] = useState("");
  const [pokeId, setPokeId] = useState("");

  useEffect(() => {
    let value = [];
    axios.get(url).then((r) => {
      //   console.log(r.data);
      setImage(r.data.sprites.other.dream_world.front_default);
      setPokeId(r.data.id);
      for (const key in r.data.types) {
        value.push(r.data.types[key].type.name);
      }
      setPokeTypes(value);
    });
  }, []);

  const stringifyPokeId = () => {
    const number = pokeId.toString().padStart(4, "0");
    return number;
  };

  return (
    <Link to={`/pokemons/${pokeId}?types=${pokeTypes}`} className="link">
      <div className={`pokemon-card ${pokeTypes[0]}`} key={name}>
        {/* {console.log(name, pokeTypes)} */}
        <p className="name-small">{name}</p>
        {pokeTypes.map((type) => {
          return (
            <p key={type} className={`type ${pokeTypes[0]}`}>
              {type}
            </p>
          );
        })}
        <p className="id">{`#${stringifyPokeId()}`}</p>
        <img className="image" src={image} alt={name} />
      </div>
    </Link>
  );
}
