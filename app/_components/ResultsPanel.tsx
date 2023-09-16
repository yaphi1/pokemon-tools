import { PokemonReference } from "../_utils/types";

type ResultsPanelProps = {
  results: PokemonReference[];
};

export default function ResultsPanel({ results }: ResultsPanelProps) {
  return (
    <div>
      {/* <div className="text-2xl mt-8 mb-4">
        Results:
      </div> */}
      <table className="border-collapse mt-8 w-full">
        <thead>
          <tr>
            <td>Pokémon</td>
            <td>URL</td>
          </tr>
        </thead>
        <tbody>
          {results.map((result, key) => (
            <tr key={key} className="bg-white odd:bg-orange-100">
              <td className="p-2">{result.name}</td>
              <td className="p-2">{result.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
