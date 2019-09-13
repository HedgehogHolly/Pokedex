import React from "react";
import pokemon from "../pokemon.json";

const Pokemon = props => {
  const pokemonData = pokemon.find(
    item => parseInt(props.pokemonNumber) === item.index
  );
  return (
    <div>
      <h1>{pokemonData.title}</h1>
      <img src={`/images/${pokemonData.image}`} />
    </div>
  );
};

export default Pokemon;
