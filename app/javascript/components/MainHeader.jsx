import React from "react";
import { Link } from "react-router-dom";

export default function MainHeader(props) {
  const { user } = props;
  console.log(user);

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
      <h1 className="title">Pokedex</h1>
      {loginOrOut()}
    </div>
  );
}
