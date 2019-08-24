import React from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import pokemons from "./pokemon.json";
import styled from "styled-components";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import upperFirst from "lodash/upperFirst";

const PokemonWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function App() {
  const [region, setRegion] = React.useState();
  const [type, setType] = React.useState();

  const availableRegions = uniq(pokemons.map(pokemon => pokemon.region));

  const availableTypes = uniq(flatten(pokemons.map(pokemon => pokemon.types)));

  const filterByRegion = pokemon => {
    if (!region) {
      return true;
    }
    return pokemon.region === region;
  };

  const filterByType = pokemon => {
    if (!type) {
      return true;
    }
    return pokemon.types.includes(type);
  };

  return (
    <div className="App">
      <header>
        <h1>Pokédex</h1>
      </header>
      <main>
        <fieldset>
          <legend>Filters or something</legend>
          <label>
            Region:
            <select
              className="select"
              onChange={event => setRegion(event.target.value)}
            >
              <option value="">All</option>
              {availableRegions.map(region => (
                <option value={region}>{region}</option>
              ))}
            </select>
          </label>
          <label>
            Type:
            <select
              className="select"
              onChange={event => setType(event.target.value)}
            >
              <option value="">All</option>
              {availableTypes.map(type => (
                <option value={type}>{upperFirst(type)}</option>
              ))}
            </select>
          </label>
        </fieldset>
        <div>
          <PokemonWrapper>
            {pokemons
              .filter(filterByRegion)
              .filter(filterByType)
              .map(pokemon => (
                <PokemonCard
                  name={pokemon.title}
                  number={pokemon.index}
                  image={`./images/${pokemon.image}`}
                  types={pokemon.types}
                  key={pokemon.index}
                />
              ))}
          </PokemonWrapper>
        </div>
      </main>
    </div>
  );
}

export default App;
