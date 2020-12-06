import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../style/app.css";

import Pokemons from "./Pokemons";
import Pokemon from "./Pokemon";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/pokemons/:id" component={Pokemon} />
        <Route path="/pokemons" component={Pokemons} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect from="/" exact to="/pokemons" />
      </Switch>
    </div>
  );
}
