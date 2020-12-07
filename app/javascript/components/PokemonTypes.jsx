import React from "react";

export default function PokemonTypes(props) {
  const { types } = props;

  return (
    <div className="types-div">
      {types
        .slice(7)
        .split(",")
        .map((type) => {
          return (
            <p key={type} className={`type ${type}`}>
              {type}
            </p>
          );
        })}
    </div>
  );
}
