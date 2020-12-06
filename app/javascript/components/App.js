import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../style/app.css";

import Pokemons from "./Pokemons";
import Pokemon from "./Pokemon";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/pokemons/:id" component={Pokemon} />
        <Route path="/pokemons" component={Pokemons} />
        <Redirect from="/" exact to="/pokemons" />
      </Switch>
    </div>
  );
}
