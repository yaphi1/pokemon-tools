import { Query, PokemonReference } from "./types";
import {
  filterByMoves,
  filterByTypes,
  filterByAbility,
  filterByEggGroups,
} from "./filters";
import {
  isValidMove,
  isValidType,
  isValidAbility,
  isValidEggGroup,
} from "./validators";

type PokemonType = string;
type PokemonMove = string;
type Ability = string;
type EggGroup = string;

export async function getPokemonByMove(move: PokemonMove): Promise<PokemonReference[]> {
  if (!isValidMove(move)) { return []; }

  const localData = window.localStorage.getItem(move);
  if (localData) {
    const pokemon: PokemonReference[] = JSON.parse(localData);
    return pokemon;
  }
  const response = await fetch(`https://pokeapi.co/api/v2/move/${move}/`);
  const json = await response.json();
  const pokemon: PokemonReference[] = json.learned_by_pokemon;
  window.localStorage.setItem(move, JSON.stringify(pokemon));
  return pokemon;
}

export async function getPokemonByType(type: PokemonType): Promise<PokemonReference[]> {
  if (!isValidType(type)) { return []; }

  const localData = window.localStorage.getItem(type);
  if (localData) {
    const pokemon: PokemonReference[] = JSON.parse(localData);
    return pokemon;
  }
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
  const json = await response.json();
  const pokemon: PokemonReference[] = json.pokemon.map((entry: { pokemon: PokemonReference }) => entry.pokemon);
  window.localStorage.setItem(type, JSON.stringify(pokemon));
  return pokemon;
}

export async function getPokemonByAbility(ability: Ability): Promise<PokemonReference[]> {
  if (!isValidAbility(ability)) { return []; }

  const localData = window.localStorage.getItem(ability);
  if (localData) {
    const pokemon: PokemonReference[] = JSON.parse(localData);
    return pokemon;
  }
  const response = await fetch(`https://pokeapi.co/api/v2/ability/${ability}/`);
  const json = await response.json();
  const pokemon: PokemonReference[] = json.pokemon.map((entry: { pokemon: PokemonReference }) => entry.pokemon);
  window.localStorage.setItem(ability, JSON.stringify(pokemon));

  return pokemon;
}

export async function getPokemonByEggGroup(eggGroup: EggGroup): Promise<PokemonReference[]> {
  if (!isValidEggGroup(eggGroup)) { return []; }

  const localData = window.localStorage.getItem(eggGroup);
  if (localData) {
    const pokemon: PokemonReference[] = JSON.parse(localData);
    return pokemon;
  }
  const response = await fetch(`https://pokeapi.co/api/v2/egg-group/${eggGroup}/`);
  const json = await response.json();
  const pokemon: PokemonReference[] = json.pokemon_species;
  window.localStorage.setItem(eggGroup, JSON.stringify(pokemon));

  return pokemon;
}

export async function getPokemonByQuery(query: Query) {
  let pokemonList: PokemonReference[] = [];

  pokemonList = await filterByMoves(pokemonList, query.moves);
  pokemonList = await filterByTypes(pokemonList, query.types);
  pokemonList = await filterByAbility(pokemonList, query.ability);
  pokemonList = await filterByEggGroups(pokemonList, query.eggGroups);

  console.log({pokemonList});
  return pokemonList;
}

// examples:
// getPokemonByType('ground');
// getPokemonByMove('super-fang');
// getPokemonByAbility('mold-breaker');
// getPokemonByEggGroup('monster');
