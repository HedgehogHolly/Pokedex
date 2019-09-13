import React from "react";
import { Router, Link } from "@reach/router";

import Home from "./views/Home";
import Header from "./views/Header";

import "./App.css";
import Pokemon from "./views/Pokemon";

const Dashboard = () => {
  return <h1>Dashboard</h1>;
};

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Home path="/" />
        <Dashboard path="dashboard" />
        <Pokemon path="pokemon/:pokemonNumber" />
      </Router>
    </div>
  );
};

export default App;
