import { Query, PokemonReference, PokemonData } from "./types";
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
import { cleanEggGroupData, removeDuplicatePokemon } from "./dataCleaners";

type PokemonType = string;
type PokemonMove = string;
type Ability = string;
type EggGroup = string;

export async function getPokemonData({ name, url }: PokemonReference): Promise<PokemonData> {
  const localData = window.localStorage.getItem(name);
  if (localData) {
    const pokemonData: PokemonData = JSON.parse(localData);
    return pokemonData;
  }
  const response = await fetch(url);
  const json = await response.json();
  const { sprites, stats, species } = json;
  const displayName = await getPokemonDisplayName({ name, url: species.url });

  const pokemonData: PokemonData = {
    name,
    displayName,
    spriteUrl: sprites.other.home.front_default || sprites.front_default,
    stats: {
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      specialAttack: stats[3].base_stat,
      specialDefense: stats[4].base_stat,
      speed: stats[5].base_stat,
    },
  };
  window.localStorage.setItem(name, JSON.stringify(pokemonData));
  return pokemonData;
}

async function getPokemonDisplayName({ name, url }: PokemonReference) {
  const hasHyphen = name.includes('-');
  if (!hasHyphen) {
    const capitalizedName = `${name[0].toUpperCase()}${name.slice(1)}`;
    return capitalizedName;
  }

  const response = await fetch(url);
  const json = await response.json();
  const localizedNames: any[] = json.names;
  const language = 'en';
  const displayName: string = localizedNames.find(item => item.language.name === language).name;

  const baseNameInfo = displayName.toLowerCase().replace(/\s/g, '-');
  const nameHasExtraInfo = baseNameInfo !== name;
  const extraInfo = name.replace(baseNameInfo, '').slice(1);

  const fullDisplayName = nameHasExtraInfo ?
    `${displayName} (${extraInfo})` :
    displayName
  ;

  return fullDisplayName;
}

export function getPokedexUrl(displayName: string) {
  const nameWithoutExtraInfo = displayName.split(' (')[0];
  const nameWithSpacesReplaced = nameWithoutExtraInfo.replace(/\s/g, '_');
  const url = `https://bulbapedia.bulbagarden.net/wiki/${nameWithSpacesReplaced}_(Pok%C3%A9mon)`;

  return url;
}

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
  const pokemon = cleanEggGroupData(json.pokemon_species);
  window.localStorage.setItem(eggGroup, JSON.stringify(pokemon));

  return pokemon;
}

export async function getPokemonByQuery(query: Query) {
  let pokemonList: PokemonReference[] = [];

  pokemonList = await filterByMoves(pokemonList, query.moves);
  pokemonList = await filterByTypes(pokemonList, query.types);
  pokemonList = await filterByAbility(pokemonList, query.ability);
  pokemonList = await filterByEggGroups(pokemonList, query.eggGroups);

  pokemonList = removeDuplicatePokemon(pokemonList);

  return pokemonList;
}

// examples:
// getPokemonByType('ground');
// getPokemonByMove('super-fang');
// getPokemonByAbility('mold-breaker');
// getPokemonByEggGroup('monster');
