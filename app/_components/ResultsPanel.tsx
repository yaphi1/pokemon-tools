import { useEffect, useState } from "react";
import { getPokemonData } from "../_utils/dataGetters";
import { PokemonData, PokemonReference } from "../_utils/types";

type ResultsPanelProps = {
  results: PokemonReference[];
};

type SortBy = |
  'name' |
  'hp' |
  'attack' |
  'defense' |
  'specialAttack' |
  'specialDefense' |
  'speed'
;
type SortOrder = 'defaultOrder' | 'reverseOrder';

const statTypes: {id: SortBy, label: string}[] = [
  { id: 'hp', label: 'HP' },
  { id: 'attack', label: 'Atk' },
  { id: 'defense', label: 'Def' },
  { id: 'specialAttack', label: 'SpA' },
  { id: 'specialDefense', label: 'SpD' },
  { id: 'speed', label: 'Spe' },
];

function sortFullResults(
  fullResults: PokemonData[],
  sortBy: SortBy,
  sortOrder: SortOrder,
) {
  const sortedResults = fullResults.sort((a, b) => {
    const resultA = {name: a.name, ...a.stats }[sortBy];
    const resultB = {name: b.name, ...b.stats }[sortBy];
    const defaultOrder = sortBy === 'name' ?
      Number(resultA > resultB) :
      Number(resultA < resultB)
    ;
    const reverseOrder = sortBy === 'name' ?
      Number(resultA < resultB) :
      Number(resultA > resultB)
    ;
    return sortOrder === 'defaultOrder' ? defaultOrder : reverseOrder;
  });

  return sortedResults;
}

function handleHyphens(name: string) {
  return name.replace(/-/, ' (') + ')';
}

function formatName(name: string) {
  const capitalizedName = `${name[0].toUpperCase()}${name.slice(1)}`;
  const hasHyphen = capitalizedName.includes('-');
  const formattedName = hasHyphen ?
    handleHyphens(capitalizedName) :
    capitalizedName
  ;
  return formattedName;
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('defaultOrder');

  useEffect(() => {
    async function getFullResults() {
      const fullResultPromises = results.map(async (result) => {
        const pokemonData = getPokemonData(result);
        return pokemonData;
      });
      const fullResults = await Promise.all(fullResultPromises);
      const sortedResults = sortFullResults(fullResults, sortBy, sortOrder);
      setPokemonData(sortedResults);
    }
    getFullResults();
  }, [results, sortBy, sortOrder]);

  function getOppositeSortOrder(currentOrder: SortOrder) {
    const newOrder = currentOrder === 'defaultOrder' ? 'reverseOrder' : 'defaultOrder';
    return newOrder;
  }

  function sort(category: SortBy) {
    const oldCategory = sortBy;
    let currentOrder = sortOrder;
    if (category === oldCategory) {
      currentOrder = getOppositeSortOrder(currentOrder);
    } else {
      currentOrder = 'defaultOrder';
    }
    const sortedResults = sortFullResults(pokemonData, category, currentOrder);

    setPokemonData(sortedResults);
    setSortBy(category);
    setSortOrder(currentOrder);
  }

  function getSortArrow() {
    return sortOrder === 'defaultOrder' ? '∨' : '∧';
  }

  return (
    <div className="overflow-auto md:overflow-visible -mr-10 md:mr-0">
      {pokemonData.length > 0 && (
        <table className="table-fixed border-collapse mt-8 w-full">
          <thead>
            <tr className="bg-white font-bold sticky top-0 select-none">
              <td
                className="w-14 py-3 px-4 cursor-pointer whitespace-nowrap"
                onClick={() => { sort('name'); }}
              >
                <span className="underline decoration-2">
                  Pokémon
                </span> {sortBy === 'name' && getSortArrow()}
              </td>
              <td className="py-3 px-4 w-60"></td>
              {statTypes.map((statType, key) => (
                <td
                  key={key}
                  className="w-28 text-right py-3 px-4 cursor-pointer"
                  onClick={() => { sort(statType.id); }}
                >
                  {sortBy === statType.id && getSortArrow()} <span className="underline decoration-2">
                    {statType.label}
                  </span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {pokemonData.map((pokemon, key) => {
              return (
                <tr key={key} className="group bg-white odd:bg-orange-100">
                  <td className="p-2">
                    <img className="w-full transition-transform group-hover:scale-150" src={pokemon.spriteUrl} alt="" />
                  </td>
                  <td className="p-2">{formatName(pokemon.name)}</td>
                  {Object.values(pokemon.stats).map((stat, key) => (
                    <td key={key} className="py-2 px-4 text-right">{stat}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
