import { useState } from "react";
import { produce } from "immer";
import { Query, PokemonReference } from "../_utils/types";
import TextInput from "./TextInput";
import { getPokemonByQuery } from "../_utils/dataGetters";
import Dropdown from "./Dropdown";
import { typeNames } from "../_data/types";
import { eggGroupNames } from "../_data/eggGroups";
import { Gift, MagnifyingGlass, Swatch, Tag, Trophy } from "../_assets/icons";
import theme from "../_utils/themes";

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
        <div className={`p-4 ${theme.sidebarGroup} rounded-md`}>
          <div className="mb-2 flex items-center">
            <Tag
              className="w-5 mr-1"
              strokeColorClass={theme.icon}
            />
            <span>Types</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {query.types.map((_, index) => {
              return (
                <Dropdown
                  key={index}
                  values={typeNames}
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
        
        <div className={`p-4 ${theme.sidebarGroup} rounded-md`}>
          <div className="mb-2 flex items-center">
            <Swatch
              className="w-5 mr-1"
              strokeColorClass={theme.icon}
            />
            <span>Moves</span>
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

        <div className={`p-4 ${theme.sidebarGroup} rounded-md`}>
          <div className="mb-2 flex items-center">
            <Trophy
              className="w-5 mr-1"
              strokeColorClass={theme.icon}
            />
            <span>Ability</span>
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
        
        <div className={`p-4 ${theme.sidebarGroup} rounded-md`}>
          <div className="mb-2 flex items-center">
            <Gift
              className="w-5 mr-1"
              strokeColorClass={theme.icon}
            />
            <span>Egg Groups</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {query.eggGroups.map((_, index) => {
              return (
                <Dropdown
                  key={index}
                  values={eggGroupNames}
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
          className={`${theme.button} group rounded-md col-span-full p-4 flex items-center justify-center`}
        >
          <MagnifyingGlass
            className="w-5 mr-2 pointer-events-none"
            strokeColorClass="stroke-slate-200/70 group-hover:stroke-slate-100/70"
          />
          <span className="pr-4">Click to Search</span>
        </button>
      </form>
    </div>
  );
}
