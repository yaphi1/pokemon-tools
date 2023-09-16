import { PokemonReference } from "./types";
import {
  getPokemonByType,
  getPokemonByMove,
  getPokemonByAbility,
  getPokemonByEggGroup,
} from "./dataGetters";

export async function filterByMoves(pokemonList: PokemonReference[], moves: string[]) {
  let filteredPokemon: PokemonReference[] = JSON.parse(JSON.stringify(pokemonList));

  for(const move of moves) {
    if (move) {
      if (filteredPokemon.length === 0) {
        filteredPokemon = await getPokemonByMove(move);
      } else {
        const comparisonList = await getPokemonByMove(move);
        filteredPokemon = filteredPokemon.filter(currentPokemon => {
          const hasMatchingPokemon = comparisonList.some(comparisonPokemon => {
            return comparisonPokemon.name === currentPokemon.name;
          });
          return hasMatchingPokemon;
        });
      }
    }
  }

  return filteredPokemon;
}

export async function filterByTypes(pokemonList: PokemonReference[], types: string[]) {
  let filteredPokemon: PokemonReference[] = JSON.parse(JSON.stringify(pokemonList));

  for(const type of types) {
    if (type) {
      if (filteredPokemon.length === 0) {
        filteredPokemon = await getPokemonByType(type);
      } else {
        const comparisonList = await getPokemonByType(type);
        filteredPokemon = filteredPokemon.filter(currentPokemon => {
          const hasMatchingPokemon = comparisonList.some(comparisonPokemon => {
            return comparisonPokemon.name === currentPokemon.name;
          });
          return hasMatchingPokemon;
        });
      }
    }
  }

  return filteredPokemon;
}

export async function filterByAbility(pokemonList: PokemonReference[], ability: string) {
  let filteredPokemon: PokemonReference[] = JSON.parse(JSON.stringify(pokemonList));

  if (ability) {
    if (filteredPokemon.length === 0) {
      filteredPokemon = await getPokemonByAbility(ability);
    } else {
      const comparisonList = await getPokemonByAbility(ability);
      filteredPokemon = filteredPokemon.filter(currentPokemon => {
        const hasMatchingPokemon = comparisonList.some(comparisonPokemon => {
          return comparisonPokemon.name === currentPokemon.name;
        });
        return hasMatchingPokemon;
      });
    }
  }

  return filteredPokemon;
}

export async function filterByEggGroups(pokemonList: PokemonReference[], eggGroups: string[]) {
  let filteredPokemon: PokemonReference[] = JSON.parse(JSON.stringify(pokemonList));

  for(const eggGroup of eggGroups) {
    if (eggGroup) {
      if (filteredPokemon.length === 0) {
        filteredPokemon = await getPokemonByEggGroup(eggGroup);
      } else {
        const comparisonList = await getPokemonByEggGroup(eggGroup);
        filteredPokemon = filteredPokemon.filter(currentPokemon => {
          const hasMatchingPokemon = comparisonList.some(comparisonPokemon => {
            return comparisonPokemon.name === currentPokemon.name;
          });
          return hasMatchingPokemon;
        });
      }
    }
  }

  return filteredPokemon;
}


