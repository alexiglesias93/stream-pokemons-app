import { greetUser } from '$utils/greet';
import { cloneNode } from '@finsweet/ts-utils';

const pokemonsData = [
  {
    id: 1,
    name: 'Ditto',
    sprites: {
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg',
        },
      },
    },
  },
  {
    id: 1,
    name: 'Pikachu',
    sprites: {
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg',
        },
      },
    },
  },
  {
    id: 1,
    name: 'Bulbasaur',
    sprites: {
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg',
        },
      },
    },
  },
];

window.Webflow ||= [];
window.Webflow.push(() => {
  const itemTemplate = document.querySelector<HTMLAnchorElement>('[data-element="pokemon-item"]');
  if (!itemTemplate) return;

  const itemsList = itemTemplate.parentElement!;

  itemTemplate.remove();

  const pokemonItems = pokemonsData.map(({ id, name, sprites }) => {
    const item = cloneNode(itemTemplate);

    const imageElement = item.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
    const idElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-id"]');
    const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name"]');

    if (imageElement) {
      imageElement.src = sprites.other.dream_world.front_default;
    }

    if (idElement) {
      idElement.textContent = id.toString();
    }

    if (nameElement) {
      nameElement.textContent = name.toString();
    }

    item.removeAttribute('data-cloak');

    return item;
  });

  itemsList.append(...pokemonItems);
});
