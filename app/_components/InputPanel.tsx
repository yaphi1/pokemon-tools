import { useState } from "react";
import { produce } from "immer";
import { Query, PokemonReference } from "../_utils/types";
import TextInput from "./TextInput";
import { getPokemonByQuery } from "../_utils/dataGetters";
import { cleanQueryText } from "../_utils/dataCleaners";

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
        className="grid gap-4 grid-cols-4"
      >
        {query.types.map((_, index) => {
          return (
            <TextInput
              key={index}
              label={`Type ${index + 1}:`}
              queryCriterion="types"
              className="col-span-2"
              handleInput={(cleanedText) => {
                const newQuery = produce<Query>(draftQuery => {
                  draftQuery.types[index] = cleanedText;
                });
                setQuery(newQuery);
              }}
            />
          );
        })}
        
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

        <button
          type="submit"
          className="rounded-md col-span-4 p-3 bg-cyan-950 hover:bg-cyan-700 text-slate-100"
        >Click to Search</button>
      </form>

      {/* <div>
        Query:
        <div>{JSON.stringify(query)}</div>
      </div> */}

    </div>
  );
}
