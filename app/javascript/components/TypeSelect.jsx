import React from "react";

export default function TypeSelect(props) {
  const { handleClick } = props;

  return (
    <div className="types-bar">
      <span onClick={handleClick} id="12" className="type grass">
        grass
      </span>
      <span onClick={handleClick} id="10" className="type fire">
        fire
      </span>
      <span onClick={handleClick} id="11" className="type water">
        water
      </span>
      <span onClick={handleClick} id="7" className="type bug">
        bug
      </span>
      <span onClick={handleClick} id="3" className="type flying">
        flying
      </span>
      <span onClick={handleClick} id="1" className="type normal">
        normal
      </span>
      <span onClick={handleClick} id="4" className="type poison">
        poison
      </span>
      <span onClick={handleClick} id="13" className="type electric">
        electric
      </span>
      <span onClick={handleClick} id="5" className="type ground">
        ground
      </span>
      <span onClick={handleClick} id="18" className="type fairy">
        fairy
      </span>
      <span onClick={handleClick} id="2" className="type fighting">
        fighting
      </span>
      <span onClick={handleClick} id="14" className="type psychic">
        psychic
      </span>
      <span onClick={handleClick} id="6" className="type rock">
        rock
      </span>
      <span onClick={handleClick} id="8" className="type ghost">
        ghost
      </span>
      <span onClick={handleClick} id="15" className="type ice">
        ice
      </span>
      <span onClick={handleClick} id="16" className="type dragon">
        dragon
      </span>
      <span onClick={handleClick} id="17" className="type dark">
        dark
      </span>
      <span onClick={handleClick} id="9" className="type steel">
        steel
      </span>
    </div>
  );
}
