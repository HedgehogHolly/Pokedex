import React from "react";
import styled from "styled-components";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import upperFirst from "lodash/upperFirst";
import extend from "lodash/extend";
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
  const [type, setType] = React.useState();

  // [{
  //   name,
  //   region
  // }]
  const [pokemon, setPokemon] = React.useState([]);

  // [region]
  const [regions, setRegions] = React.useState([]);

  // Todo: remove this and use `regions` + `setRegions`
  const [region, setRegion] = React.useState();

  React.useEffect(() => {
    // fetch /pokemon
    P.getPokemonsList().then(data => {
      setPokemon(data.results.map(pokemon => ({
        name: pokemon.name,
      })));
    });

    // fetch /region
    P.getRegionsList().then(data => {
      setRegions(data.results.map(region => region.name));
    });
  }, []);

  // implementation not perfect. ideally we'd have a dependency on `pokemon`, whilst avoiding recursion.
  React.useEffect(() => {
    async function fetchData() {
      let nextPokemon = [...pokemon];

      await Promise.all(regions.map(async (region) => {
        // fetch /region/[name]
        const pokedexes = (await P.getRegionByName(region)).pokedexes.map(pokedex => pokedex.name);

        await Promise.all(pokedexes.map(async pokedex => {
          // fetch /pokedex/[id]
          const pokedexByName = await P.getPokedexByName(pokedex);
          const pokemonInRegion = pokedexByName.pokemon_entries.map(entry => entry.pokemon_species.name);

          const filtered = nextPokemon.filter(({ name }) => pokemonInRegion.includes(name))
          const mapped = filtered.map(pokemon => ({
            ...pokemon,
            region,
          }));

          extend(nextPokemon, mapped);
        }));
      }));

      setPokemon(nextPokemon);
    }

    fetchData();
  }, [regions]);

  console.log('pokemon', pokemon);

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
                <option key={region} value={region}>{region}</option>
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
                <option key={type} value={type}>{upperFirst(type)}</option>
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
