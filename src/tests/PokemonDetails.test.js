import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pikachuPath = '/pokemons/25';

describe('testing PokemonDetails component', () => {
  test('if renders the correct title', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPath);

    const pokemonTitle = screen
      .getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    expect(pokemonTitle).toBeInTheDocument();
  });

  test('if renders a Summary title', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPath);

    const summaryTitle = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryTitle).toBeInTheDocument();
  });

  test('if renders a summary of pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPath);

    const summary = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(summary).toBeInTheDocument();
  });

  test('if renders map with locations of pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPath);

    const gameLocationsHeader = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    expect(gameLocationsHeader).toBeInTheDocument();

    const gameLocationsMap = screen.getAllByRole('img', { name: /Pikachu location/i });

    expect(gameLocationsMap).toHaveLength(2);
    expect(gameLocationsMap[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(gameLocationsMap[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('if there\'s a checkbox to favorite the pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPath);

    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
