import { moveNames } from "../_data/moves";
import { typeNames } from "../_data/types";
import { abilityNames } from "../_data/abilities";
import { eggGroupNames } from "../_data/eggGroups";
import { QueryCriteria } from "./types";

export function isValidMove(move: string) {
  return moveNames.includes(move);
}

export function isValidType(type: string) {
  return typeNames.includes(type);
}

export function isValidAbility(ability: string) {
  return abilityNames.includes(ability);
}

export function isValidEggGroup(eggGroup: string) {
  return eggGroupNames.includes(eggGroup);
}

export function isValidInput(input: string, queryCriterion: QueryCriteria) {
  const validator = {
    moves: isValidMove,
    types: isValidType,
    ability: isValidAbility,
    eggGroups: isValidEggGroup,
  };

  return validator[queryCriterion](input) || input === '';
}
