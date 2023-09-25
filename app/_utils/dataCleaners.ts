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
