import React from "react";
import { Link } from "@reach/router";
import "./Header.css";

const Header = () => (
  <header className="Header">
    <h1>Pokédex</h1>
    <div>
      <nav>
        <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
      </nav>
    </div>
  </header>
);

export default Header;
