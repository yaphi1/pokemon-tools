'use client';

import { useState } from "react";
import { PokemonReference } from "../_utils/types";
import InputPanel from "./InputPanel";
import ResultsPanel from "./ResultsPanel";
import { Pokeball } from "../_assets/icons";

export default function PokeFinder() {
  const [results, setResults] = useState<PokemonReference[]>([]);

  return (
    <div className="lg:flex h-screen">
      <div className="overflow-auto lg:w-[350px] flex-none p-8 bg-slate-200">
        <div className="debug_hider">
          <div className="text-3xl mb-6 font-bold flex items-center gap-2">
            <Pokeball className="w-14" fillColorClass="fill-slate-600" />
            <div>
              Poké Finder
            </div>
          </div>
          <InputPanel setResults={setResults} />
          <div className="mt-4 text-sm">
            Code by <a className="underline text-cyan-600 hover:text-cyan-500" target="_blank" href="https://github.com/yaphi1/pokemon-tools">Yaphi</a>.
            Data from <a className="underline text-cyan-600 hover:text-cyan-500" target="_blank" href="https://pokeapi.co/">PokéApi</a>.
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <ResultsPanel results={results} />
      </div>
    </div>
  );
}
