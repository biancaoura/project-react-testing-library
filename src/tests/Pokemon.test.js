import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing Pokemon component', () => {
  const pikachuId = 25;

  beforeEach(() => {
    localStorage.setItem('favoritePokemonIds', JSON.stringify([pikachuId]));
  });

  afterEach(() => localStorage.clear());

  test('if renders image correctly', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
    expect(pikachu.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('if renders favorite\'s icon properly', () => {
    renderWithRouter(<App />);

    const favoriteIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });

  test('if renders pokemon\'s type', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
  });

  test('if there\'s a link to see more details about the pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
});
