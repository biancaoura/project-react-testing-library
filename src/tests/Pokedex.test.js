import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing Pokedex component', () => {
  test('if filtering buttons have correct name', () => {
    renderWithRouter(<App />);

    const electricButton = screen.getByRole('button', { name: /Electric/i });
    expect(electricButton).toBeInTheDocument();
    userEvent.click(electricButton);

    const pikachu = screen.getByAltText('Pikachu sprite');
    expect(pikachu).toBeInTheDocument();
  });

  test('if filtering buttons have correct data-testid', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = 7;
    expect(filterButtons).toHaveLength(pokemonTypes);
  });

  test('if "All" button works', () => {
    renderWithRouter(<App />);

    const filterAll = screen.getByRole('button', { name: 'All' });
    expect(filterAll).toBeInTheDocument();

    userEvent.click(filterAll);

    const pikachu = screen.getByAltText('Pikachu sprite');
    expect(pikachu).toBeInTheDocument();
  });
});
