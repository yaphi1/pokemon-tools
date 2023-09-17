import { useEffect, useState } from "react";
import { getPokemonData } from "../_utils/dataGetters";
import { PokemonData, PokemonReference } from "../_utils/types";

type ResultsPanelProps = {
  results: PokemonReference[];
};

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    async function getFullResults() {
      const fullResultPromises = results.map(async (result) => {
        const pokemonData = getPokemonData(result);
        return pokemonData;
      });
      const fullResults = await Promise.all(fullResultPromises);
      setPokemonData(fullResults);
    }
    getFullResults();
  }, [results]);

  return (
    <div>
      {/* <div className="text-2xl mt-8 mb-4">
        Results:
      </div> */}
      {pokemonData.length > 0 && (
        <table className="table-fixed border-collapse mt-8 w-full">
          <thead>
            <tr className="bg-white font-bold">
              <td className="w-14 py-3 px-4">Pokémon</td>
              <td className="py-3 px-4"></td>
              {[
                'HP',
                'Atk',
                'Def',
                'SpA',
                'SpD',
                'Spe',
              ].map((statHeading, key) => (
                <td key={key} className="w-28 text-right py-3 px-4">
                  {statHeading}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {pokemonData.map((pokemon, key) => {
              return (
                <tr key={key} className="group bg-white odd:bg-orange-100">
                  {/* <td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png" alt="" /></td> */}
                  {/* <td><img className="w-24" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/127.png" alt="" /></td> */}
                  {/* <td><img className="w-24" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/127.png" alt="" /></td> */}
                  <td className="p-2">
                    <img className="w-full transition-transform group-hover:scale-150" src={pokemon.spriteUrl} alt="" />
                  </td>
                  <td className="p-2">{pokemon.name}</td>
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
