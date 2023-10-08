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

export function cleanLocalStorage({ latestUpdate } : { latestUpdate: string }) {
  const lastCleaned = localStorage.getItem('lastCleaned');
  const wasNeverCleaned = !lastCleaned;
  const hasNewUpdate = lastCleaned !== latestUpdate;
  const shouldClean = wasNeverCleaned || hasNewUpdate || isLocalDataStale();

  if (shouldClean) {
    localStorage.clear();
    localStorage.setItem('lastCleaned', latestUpdate);
    localStorage.setItem('lastAutoUpdate', Date.now().toString());
  }
}

function weeksToMs(weeks: number) {
  const daysPerWeek = 7;
  const hoursPerDay = 24;
  const minutesPerHour = 60;
  const secondsPerMinute = 60;
  const msPerSecond = 1000;
  return weeks *
    daysPerWeek *
    hoursPerDay *
    minutesPerHour *
    secondsPerMinute *
    msPerSecond;
}

function isLocalDataStale() {
  const lastAutoUpdate = parseInt(localStorage.getItem('lastAutoUpdate') ?? '0');
  const interval = weeksToMs(1);
  const currentDate = Date.now();
  const timeSinceLastUpdate = currentDate - lastAutoUpdate;
  const isDataStale = timeSinceLastUpdate > interval;
  return isDataStale;
}
