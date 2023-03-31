import { cloneNode } from '@finsweet/ts-utils';

import { fetchPokemonsData } from '$utils/api';

import type { PokemonData } from '../utils/types';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const pokemonsData = await fetchPokemonsData(5, 0);
  console.log(pokemonsData);

  const itemTemplate = document.querySelector<HTMLAnchorElement>('[data-element="pokemon-item"]');
  if (!itemTemplate) return;

  const itemsList = itemTemplate.parentElement!;

  itemTemplate.remove();

  const pokemonItems = pokemonsData.map((pokemonData) =>
    createPokemonItem(pokemonData, itemTemplate)
  );

  itemsList.append(...pokemonItems);
});

/**
 * It creates a new item for the pokemons list.
 * @param pokemonData
 * @param itemTemplate
 */
const createPokemonItem = ({ id, name, sprites }: PokemonData, itemTemplate: HTMLAnchorElement) => {
  const item = cloneNode(itemTemplate);

  const imageElement = item.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
  const idElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-id"]');
  const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name"]');

  if (imageElement) {
    imageElement.src = sprites.other?.dream_world.front_default || sprites.front_default;
  }

  if (idElement) {
    idElement.textContent = id.toString();
  }

  if (nameElement) {
    nameElement.textContent = name.toString();
  }

  const url = new URL(item.href);
  url.searchParams.append('id', id.toString());

  item.href = url.toString();

  item.removeAttribute('data-cloak');

  return item;
};
