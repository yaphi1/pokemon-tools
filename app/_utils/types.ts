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

export type PokemonData = {
  name: string;
  spriteUrl: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};
