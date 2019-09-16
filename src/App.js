import React from "react";
import styled from "styled-components";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import upperFirst from "lodash/upperFirst";
import find from "lodash/find";
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

  // Todo: set regions from P.getRegionsList()
  const [region, setRegion] = React.useState();

  React.useEffect(() => {
    async function fetchData() {
      // fetch /pokemon
      const pokemonData = (await P.getPokemonsList()).results.map(result => ({
        name: result.name,
      }));

      // fetch /region
      const regionData = (await P.getRegionsList()).results.map(region => region.name);

      await Promise.all(regionData.map(async (region) => {
        // fetch /region/[name]
        const pokedexNames = (await P.getRegionByName(region)).pokedexes.map(pokedex => pokedex.name);

        await Promise.all(pokedexNames.map(async pokedeName => {
          // fetch /pokedex/[id]
          const pokedex = await P.getPokedexByName(pokedeName);
          const pokemonInPokedex = pokedex.pokemon_entries.map(entry => entry.pokemon_species.name);

          pokemonInPokedex.forEach(name => {
            const match = find(pokemonData, { name });

            if (match) {
              match.region = region;
            }
          });
        }));
      }));

      setPokemon(pokemonData);
    }

    fetchData();
  }, []);

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
