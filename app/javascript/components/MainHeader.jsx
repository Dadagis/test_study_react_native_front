import React from "react";
import { Link } from "react-router-dom";
import mySvg from "../../assets/images/pokemon.svg";
import squareSvg from "../../assets/images/square-of-rounded-corners.svg";

export default function MainHeader(props) {
  const { user } = props;

  const handleClick = () => {
    localStorage.removeItem("pokedexToken");
  };

  const loginOrOut = () => {
    if (user) {
      return (
        <Link onClick={handleClick} className="login-link" to="/">
          Log out
        </Link>
      );
    } else {
      return (
        <Link className="login-link" to="/login">
          Log in
        </Link>
      );
    }
  };

  return (
    <div className="main-header">
      <img className="square-svg" src={squareSvg} alt="square" />
      <img className="svg" src={mySvg} alt="pokeball" />
      <h1 className="title">Pokedex</h1>
      {loginOrOut()}
    </div>
  );
}
