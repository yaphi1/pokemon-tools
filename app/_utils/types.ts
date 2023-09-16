export type Query = {
  moves: string[];
  types: string[];
  ability: string;
  eggGroups: string[];
};

export type QueryCriteria = 'moves' | 'types' | 'ability' | 'eggGroups';

export type PokemonReference = {
  name: string;
  url: string;
};

export type ImmerStateUpdaterFn<TypeOfState> = (state?: TypeOfState | undefined) => TypeOfState;
