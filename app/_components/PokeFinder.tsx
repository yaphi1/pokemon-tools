'use client';

import { useState } from "react";
import { PokemonReference } from "../_utils/types";
import InputPanel from "./InputPanel";
import ResultsPanel from "./ResultsPanel";

export default function PokeFinder() {
  const [results, setResults] = useState<PokemonReference[]>([]);

  return (
    <div className="my-20 mx-auto max-w-5xl">
      <div className="text-5xl mb-4">
        Poké Finder
      </div>
      <InputPanel setResults={setResults} />
      <ResultsPanel results={results} />
    </div>
  );
}
