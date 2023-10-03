'use client';

import { useEffect, useState } from "react";
import { PokemonReference } from "../_utils/types";
import InputPanel from "./InputPanel";
import ResultsPanel from "./ResultsPanel";
import { Pokeball } from "../_assets/icons";
import theme from "../_utils/themes";
import { cleanLocalStorage } from "../_utils/dataCleaners";

export default function PokeFinder() {
  const [results, setResults] = useState<PokemonReference[]>([]);

  useEffect(() => {
    cleanLocalStorage({ latestUpdate: '10-2-2023-9:58pm' });
  }, []);

  return (
    <div className="lg:flex h-screen">
      <div className={`overflow-auto lg:w-[350px] flex-none p-8 ${theme.sidebar}`}>
        <div className="debug_hider">
          <div className="text-3xl mb-6 font-bold flex items-center gap-2">
            <Pokeball className="w-14" fillColorClass={theme.logoIcon} />
            <div>
              Poké Finder
            </div>
          </div>
          <InputPanel setResults={setResults} />
          <div className="mt-4 text-sm">
            Code by <a className={`underline ${theme.link}`} target="_blank" href="https://github.com/yaphi1/pokemon-tools">Yaphi</a>.
            Data from <a className={`underline ${theme.link}`} target="_blank" href="https://pokeapi.co/">PokéApi</a>.
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <ResultsPanel results={results} />
      </div>
    </div>
  );
}
