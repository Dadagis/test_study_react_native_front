import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../style/login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // API call to get a JWT if user email and password are correct
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/v1/tokens/", { email: email, password: password })
        .then((response) => {
          localStorage.setItem("pokedexToken", response.data.jwt);
        });
      props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle keyboard inputs and update the state
  const handleChange = ({ currentTarget: input }) => {
    if (input.id === "email") {
      setEmail(input.value);
    } else {
      setPassword(input.value);
    }
  };

  return (
    <div className="login-container">
      <div className="form">
        <h1>Log in</h1>
        <form>
          <div className="form-inputs">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              placeholder="toto@exemple.fr"
              id="email"
              value={email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*********"
              id="password"
              value={password}
              onChange={handleChange}
            />
            <button onClick={handleClick} type="submit">
              Log in
            </button>
          </div>
        </form>
        <div className="link-div">
          <Link to="/signup" className="login-link">
            I don't have an account
          </Link>
        </div>
      </div>
    </div>
  );
}
