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

function compareForSort({ a, b, isAscending }: {
  a: string|number,
  b: string|number,
  isAscending: boolean
}) {
  const ascendingSort = a > b ? 1 : -1;
  const descendingSort = a < b ? 1 : -1;

  return isAscending ? ascendingSort : descendingSort;
}

function sortFullResults(
  fullResults: PokemonData[],
  sortBy: SortBy,
  sortOrder: SortOrder,
) {
  const sortedResults = [...fullResults].sort((a, b) => {
    const resultA = {name: a.name, ...a.stats }[sortBy];
    const resultB = {name: b.name, ...b.stats }[sortBy];
    const defaultOrder = sortBy === 'name' ?
      compareForSort({ a: resultA, b: resultB, isAscending: true }) :
      compareForSort({ a: resultA, b: resultB, isAscending: false })
    ;
    const reverseOrder = sortBy === 'name' ?
      compareForSort({ a: resultA, b: resultB, isAscending: false }) :
      compareForSort({ a: resultA, b: resultB, isAscending: true })
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
    <div className="overflow-auto md:overflow-visible relative -mr-10 md:mr-0">
      {pokemonData.length > 0 && (
        <table className="w-full block text-lg">
          <thead className="font-bold sticky -top-8 relative z-10">
            <tr className="select-none grid grid-cols-12 rounded-t-lg bg-white">
              <td
                className="py-4 px-4 col-span-2 cursor-pointer whitespace-nowrap"
                onClick={() => { sort('name'); }}
              >
                <span>
                  Pokémon
                </span> {sortBy === 'name' && getSortArrow()}
              </td>
              <td className="py-4 px-4 col-span-4"></td>
              {statTypes.map((statType, key) => (
                <td
                  key={key}
                  className="text-right py-4 pr-4 cursor-pointer whitespace-nowrap"
                  onClick={() => { sort(statType.id); }}
                >
                  {sortBy === statType.id && getSortArrow()} <span>
                    {statType.label}
                  </span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {pokemonData.map((pokemon, key) => {
              const isLastRow = key === pokemonData.length - 1;
              const rounding = isLastRow ? 'rounded-b-lg' : '';

              return (
                <tr key={key} className={`bg-white odd:bg-slate-200 grid grid-cols-12 ${rounding}`}>
                  <td className="px-4 py-1">
                    <div className="p-1">
                      <img className="w-full transition-transform hover:scale-125" src={pokemon.spriteUrl} alt="" />
                    </div>
                  </td>
                  <td className="p-2 pl-0 col-span-5 flex items-center">
                    <div className="flex-1">{formatName(pokemon.name)}</div>
                  </td>
                  {Object.values(pokemon.stats).map((stat, key) => (
                    <td key={key} className="py-2 px-4 text-right flex items-center">
                      <div className="flex-1">{stat}</div>
                    </td>
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
