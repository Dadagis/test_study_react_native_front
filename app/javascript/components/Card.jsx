import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

export default function Card(props) {
  const { name, url } = props;
  const [pokeTypes, setPokeTypes] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    let value = [];
    axios.get(url).then((r) => {
      setImage(r.data.sprites.front_default);
      for (const key in r.data.types) {
        value.push(r.data.types[key].type.name);
      }
      setPokeTypes(value);
    });
  }, []);

  //   const fetchImage = () => {
  //     console.log("je suis dans fetch image");
  //     axios.get(url).then((r) => {
  //       //   console.log(r.data.types);
  //       setImage(r.data.sprites.front_default);
  //       setTypes(r.data.types);
  //       //   for (const key in r.data.types) {
  //       //     console.log("OUI");
  //       //     // console.log(r.data.types[key].type.name);
  //       //     // setTypes([r.data.sprites.front_default]);
  //       //   }
  //     });
  //   };

  //   const pokemonCard = () => {
  //     fetchImage(url);
  //     console.log(types);
  //     return (
  //       <Fragment>
  //         <p>{name}</p>
  //         <p>{types}</p>
  //         <img src={image} alt={name} />
  //       </Fragment>
  //     );
  //   };

  return (
    <div className="pokemon-card" key={name}>
      {console.log(name, pokeTypes)}
      <p>{name}</p>
      {pokeTypes.map((type) => {
        return <p>{type}</p>;
      })}
      <img src={image} alt={name} />
    </div>
  );
}
