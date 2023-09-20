'use client';

import { useState } from "react";
import { PokemonReference } from "../_utils/types";
import InputPanel from "./InputPanel";
import ResultsPanel from "./ResultsPanel";

export default function PokeFinder() {
  const [results, setResults] = useState<PokemonReference[]>([]);

  return (
    <div className="my-20 mx-auto max-w-6xl px-10">
      <div className="text-5xl mb-4">
        Poké Finder
      </div>
      <InputPanel setResults={setResults} />
      <ResultsPanel results={results} />
      <div className="mt-10 text-base">
        Code by <a className="underline text-cyan-600 hover:text-cyan-500" target="_blank" href="https://github.com/yaphi1/">Yaphi</a>.
        Data from <a className="underline text-cyan-600 hover:text-cyan-500" target="_blank" href="https://pokeapi.co/">PokéApi</a>.
      </div>
    </div>
  );
}
