import { useState } from "react";
import { produce } from "immer";
import { Query, PokemonReference } from "../_utils/types";
import TextInput from "./TextInput";
import { getPokemonByQuery } from "../_utils/dataGetters";

type InputPanelProps = {
  setResults: (results: PokemonReference[]) => void;
};

const defaultQuery = {
  moves: ['', '', '', ''],
  types: ['', ''],
  ability: '',
  eggGroups: ['', ''],
};

export default function InputPanel({ setResults }: InputPanelProps) {
  const [query, setQuery] = useState<Query>(defaultQuery);

  async function updateResults() {
    const results = await getPokemonByQuery(query);
    setResults(results);
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          updateResults();
        }}
        className="grid gap-4"
      >
        <div className="p-4 bg-slate-300 rounded-md">
          <div className="mb-2">
            Types
          </div>
          <div className="grid grid-cols-2 gap-4">
            {query.types.map((_, index) => {
              return (
                <TextInput
                  key={index}
                  label={`Type ${index + 1}:`}
                  queryCriterion="types"
                  className=""
                  handleInput={(cleanedText) => {
                    const newQuery = produce<Query>(draftQuery => {
                      draftQuery.types[index] = cleanedText;
                    });
                    setQuery(newQuery);
                  }}
                />
              );
            })}
          </div>
        </div>
        
        <div className="p-4 bg-slate-300 rounded-md">
          <div className="mb-2">
            Moves
          </div>
          <div className="grid grid-cols-2 gap-4">
            {query.moves.map((_, index) => {
              return (
                <TextInput
                  key={index}
                  label={`Move ${index + 1}:`}
                  queryCriterion="moves"
                  handleInput={(cleanedText) => {
                    const newQuery = produce<Query>(draftQuery => {
                      draftQuery.moves[index] = cleanedText;
                    });
                    setQuery(newQuery);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-300 rounded-md">
          <div className="mb-2">
            Ability
          </div>
          <TextInput
            label="Ability:"
            queryCriterion="ability"
            className="col-span-2"
            handleInput={(cleanedText) => {
              const newQuery = produce<Query>(draftQuery => {
                draftQuery.ability = cleanedText;
              });
              setQuery(newQuery);
            }}
          />
        </div>
        
        <div className="p-4 bg-slate-300 rounded-md">
          <div className="mb-2">
            Egg Groups
          </div>
          <div className="grid grid-cols-2 gap-4">
            {query.eggGroups.map((_, index) => {
              return (
                <TextInput
                  key={index}
                  label={`Egg group ${index + 1}:`}
                  queryCriterion="eggGroups"
                  handleInput={(cleanedText) => {
                    const newQuery = produce<Query>(draftQuery => {
                      draftQuery.eggGroups[index] = cleanedText;
                    });
                    setQuery(newQuery);
                  }}
                />
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md col-span-full p-4 bg-cyan-950 hover:bg-cyan-700 text-slate-200"
        >Click to Search</button>
      </form>
    </div>
  );
}
