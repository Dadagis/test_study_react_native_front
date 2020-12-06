import React from "react";
import { Link } from "react-router-dom";

export default function MainHeader() {
  return (
    <div className="main-header">
      <h1 className="title">Pokedex</h1>
      <Link className="login-link" to="/login">
        Se connecter
      </Link>
    </div>
  );
}
