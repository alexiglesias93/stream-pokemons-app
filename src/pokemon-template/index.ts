import { fetchPokemonData } from '$utils/api';

window.Webflow ||= [];
window.Webflow.push(async () => {
  // Get the pokemon ID from the URL
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  if (!id) {
    window.location.replace('/');
    return;
  }

  // Fetch the pokemon data
  const pokemonData = await fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!pokemonData) {
    window.location.replace('/');
    return;
  }

  // Populate the pokemon data
  const imageElement = document.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
  const nameElement = document.querySelector<HTMLHeadingElement>('[data-element="pokemon-name"]');
  const heightElement = document.querySelector<HTMLSpanElement>('[data-element="pokemon-height"]');
  const weightElement = document.querySelector<HTMLSpanElement>('[data-element="pokemon-weight"]');

  if (imageElement) {
    imageElement.src =
      pokemonData.sprites.other?.dream_world.front_default || pokemonData.sprites.front_default;
  }

  if (nameElement) {
    nameElement.textContent = pokemonData.name;
  }

  if (heightElement) {
    heightElement.textContent = pokemonData.height.toString();
  }

  if (weightElement) {
    weightElement.textContent = pokemonData.weight.toString();
  }

  for (const { stat, base_stat } of pokemonData.stats) {
    const element = document.querySelector<HTMLSpanElement>(
      `[data-element="pokemon-${stat.name}"]`
    );
    if (!element) continue;

    element.textContent = base_stat.toString();
  }
});
