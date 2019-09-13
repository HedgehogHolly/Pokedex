import React from "react";
import PokemonCard from "../components/PokemonCard";
import pokemons from "../pokemon.json";
import styled from "styled-components";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import upperFirst from "lodash/upperFirst";
import { Link } from "@reach/router";

const PokemonWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Select = styled.select`
  appearance: none;
  width: 12em;
  height: 2.5em;
  background: #edffff;
  border-radius: 0.25em;
  margin: 0 6px;
`;

function Home() {
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
      <main>
        <fieldset>
          <legend>Filters or something</legend>
          <label>
            Region:
            <Select onChange={event => setRegion(event.target.value)}>
              <option value="">All</option>
              {availableRegions.map(region => (
                <option value={region}>{region}</option>
              ))}
            </Select>
          </label>
          <label>
            Type:
            <Select onChange={event => setType(event.target.value)}>
              <option value="">All</option>
              {availableTypes.map(type => (
                <option value={type}>{upperFirst(type)}</option>
              ))}
            </Select>
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

export default Home;
