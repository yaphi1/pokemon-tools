'use client';

import { useState } from "react";
import { PokemonReference } from "../_utils/types";
import InputPanel from "./InputPanel";
import ResultsPanel from "./ResultsPanel";

export default function PokeFinder() {
  const [results, setResults] = useState<PokemonReference[]>([]);

  return (
    <div className="flex h-screen">
      <div className="overflow-auto w-[350px] flex-none p-8 bg-slate-200">
        <div className="debug_hider">
          <div className="text-3xl mb-6 font-bold flex items-center gap-2">
            <svg className="w-14" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256">
              <metadata>Icon credit: https://www.onlinewebfonts.com/icon/174253</metadata>
              <g><g><path className="fill-slate-600" d="M128,10C62.9,10,10,62.9,10,128c0,65.1,52.9,118,118,118c65.1,0,118-52.9,118-118C246,62.8,193.1,10,128,10z M128,92.7c19.5,0,35.4,15.8,35.4,35.3s-15.8,35.4-35.4,35.4S92.6,147.5,92.6,128S108.5,92.7,128,92.7z M28,135.6h49.4c3.7,24.6,24.9,43.5,50.6,43.5c25.6,0,46.9-18.9,50.6-43.5H228c-3.9,51.8-47.2,92.7-100,92.7C75.2,228.3,31.9,187.4,28,135.6z"/></g></g>
            </svg>
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
      <div className="overflow-auto p-8">
        <ResultsPanel results={results} />
      </div>
    </div>
  );
}
