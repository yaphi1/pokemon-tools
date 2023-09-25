import { useId, useState } from "react";
import { moveNames } from "../_data/moves";
import { typeNames } from "../_data/types";
import { abilityNames } from "../_data/abilities";
import { eggGroupNames } from "../_data/eggGroups";
import { cleanQueryText } from "../_utils/dataCleaners";
import { QueryCriteria } from "../_utils/types";
import { isValidInput } from "../_utils/validators";

type TextInputProps = {
  label: string;
  queryCriterion: QueryCriteria;
  handleInput: (cleanedText: string) => void;
  className?: string;
};

const namesOfAll = {
  moves: moveNames,
  types: typeNames,
  ability: abilityNames,
  eggGroups: eggGroupNames,
};

function prioritizeStartOfNames(searchText: string, names: string[]) {
  const matchesAtWordStart: string[] = [];
  const matchesNotAtWordStart: string[] = [];
  const searchTextBeginning = new RegExp(`^${searchText}`);

  names.forEach(name => {
    const isAtBeginning = searchTextBeginning.test(name);
    if (isAtBeginning) {
      matchesAtWordStart.push(name);
    } else {
      matchesNotAtWordStart.push(name);
    }
  });

  return [...matchesAtWordStart, ...matchesNotAtWordStart];
}

export default function TextInput({
  label, queryCriterion, handleInput, className
}: TextInputProps) {
  const [isValid, setIsValid] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dataListId = `dataList-${useId()}`;
  const validityClassName = isValid ? '' : 'outline-red-700';

  function updateSuggestions(searchText: string, names: string[]) {
    let filteredNames: string[] = [];
    if (searchText !== '') {
      filteredNames = names.filter(name => {
        return name.includes(searchText);
      });
      filteredNames = prioritizeStartOfNames(searchText, names);
    }

    setSuggestions(filteredNames);
  }

  return (
    <div className={className}>
      <input
        type="text"
        autoComplete="off"
        aria-label={label}
        list={dataListId}
        onInput={(event) => {
          const cleanedText = cleanQueryText(event.currentTarget.value);
          setIsValid(isValidInput(cleanedText, queryCriterion));
          handleInput(cleanedText);
          updateSuggestions(cleanedText, namesOfAll[queryCriterion]);
        }}
        className={`w-full p-2 outline outline-1 outline-slate-400 shadow-inner rounded-sm hover:outline-2 focus:outline-cyan-500 focus:outline-2 ${validityClassName}`}
      />
      <datalist id={dataListId}>
        {suggestions.map((suggestion, key) => {
          return (
            <option key={key} value={suggestion}></option>
          );
        })}
      </datalist>
    </div>
  );
}
