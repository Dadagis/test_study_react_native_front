import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import "../style/login.css";

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Api call to create a user
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/v1/users/", {
          user: {
            name: name,
            email: email,
            password: password,
          },
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("pokedexToken", response.data.jwt);
        });

      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Update the state when keyboard inputs
  const handleChange = ({ currentTarget: input }) => {
    if (input.id === "name") {
      setName(input.value);
    } else if (input.id === "email") {
      setEmail(input.value);
    } else {
      setPassword(input.value);
    }
  };

  return (
    <div className="login-container">
      <div className="form">
        <h1>Register</h1>
        <form>
          <div className="form-inputs">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              placeholder="Toto"
              id="name"
              value={name}
              onChange={handleChange}
            />
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
              Register
            </button>
          </div>
        </form>
        <div className="link-div">
          <Link to="/login" className="login-link">
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}
