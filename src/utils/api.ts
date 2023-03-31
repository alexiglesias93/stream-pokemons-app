import { isNotEmpty } from '@finsweet/ts-utils';

import type { PokemonData, PokemonsResponse } from './types';

/**
 * Fetches a list of pokemons and their data.
 * @param limit Defines the limit of pokemons to be fetched.
 * @param offset Defines the offset number for the pokemons that are fetched.
 * @returns An array of {@link PokemonData}.
 */
export const fetchPokemonsData = async (limit: number, offset: number): Promise<PokemonData[]> => {
  try {
    const url = new URL('https://pokeapi.co/api/v2/pokemon');

    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());

    const response = await fetch(url);

    const data: PokemonsResponse = await response.json();

    const pokemonsData = (
      await Promise.all(data.results.map(async ({ url }) => fetchPokemonData(url)))
    ).filter(isNotEmpty);

    return pokemonsData;
  } catch (err) {
    return [];
  }
};

/**
 * Fetches the data for a specific pokemon.
 * @param url The URL of the pokemon's API entry point.
 * @returns A {@link PokemonData} object.
 */
export const fetchPokemonData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data: PokemonData = await response.json();

    return data;
  } catch (err) {
    return null;
  }
};
