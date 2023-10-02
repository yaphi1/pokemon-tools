import { PokemonReference } from "./types";

export function cleanQueryText(text: string) {
  const spacesOrUnderscores = /[\s_]+/g;
  const anythingExceptLettersOrHyphens = /[^a-z-]/g;
  return text
    .trim()
    .toLowerCase()
    .replace(spacesOrUnderscores, '-')
    .replace(anythingExceptLettersOrHyphens, '');
}

export function cleanEggGroupData(pokemon_species: PokemonReference[]) {
  const cleanedData: PokemonReference[] = pokemon_species.map(species => {
    const cleanedCopy = { ...species };
    cleanedCopy.url = cleanedCopy.url.replace('-species', '');
    return cleanedCopy;
  });

  return cleanedData;
}

export function removeDuplicatePokemon(pokemon: PokemonReference[]) {
  const foundPokemon = new Set();
  const result = pokemon.filter(individual => {
    const isDuplicate = foundPokemon.has(individual.name);
    foundPokemon.add(individual.name);
    return !isDuplicate;
  });

  return result;
}
