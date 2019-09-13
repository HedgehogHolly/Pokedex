import React from "react";
import styled from "styled-components";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import upperFirst from "lodash/upperFirst";
import { Pokedex } from "pokeapi-js-wrapper";

import "./App.css";
import PokemonCard from "./components/PokemonCard";
import pokemons from "./pokemon.json";

const P = new Pokedex({
  cache: true
});

const PokemonWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function App() {
  const [region, setRegion] = React.useState();
  const [type, setType] = React.useState();

  // const [regions, setRegions] = React.useState([]);
  // const [pokemon, setPokemon] = React.useState([]);

  // [
  //   {
  //     name: "piplup",
  //     region: "Matt's house"
  //   }
  // ]

  // React.useEffect(() => {
  //   P.getPokemonsList().then(data => {
  //     setPokemon(pokemon.results);
  //   });
  // }, []);

  // React.useEffect(() => {
  //   P.getRegionsList().then(data => {
  //     setRegions(data.results);
  //   });
  // }, [pokemon]);

  // React.useState(() => {
  //   regions.forEach(region => {
  //     P.resource(region.url).then(data => {
  //       const pokedexes = data.pokedexes;

  //       pokedexes.forEach(pokedex => {
  //         P.resource(pokedex.url).then(data => {
  //           const pokemonEntries = data.pokemon_entries.map(entry => entry.pokemon_species.name);

  //           const nextPokemon =
  //         })
  //       })
  //     });
  //   })
  // }, [regions])

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
          {/*pokemon.map(({ name }) => (
            <div>{name}</div>
          ))*/}
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
