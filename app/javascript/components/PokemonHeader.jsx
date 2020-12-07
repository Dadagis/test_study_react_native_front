import React from "react";

export default function PokemonHeader(props) {
  const { previous, favorite, user, id, loaded } = props;

  return (
    <div className="pokemon-header">
      <i className="fas fa-arrow-left" onClick={previous}></i>
      {loaded ? (
        <i
          style={{
            display: user === false ? "none" : "block",
            color: user.fav_pokemons.includes(id) ? "red" : "white",
          }}
          className="far fa-heart"
          onClick={favorite}
        ></i>
      ) : null}
    </div>
  );
}
