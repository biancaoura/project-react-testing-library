import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('testing FavoritePokemons component', () => {
  test('if renders correct message if there\'s any favorite pokémon', () => {
    render(<FavoritePokemons />);

    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
