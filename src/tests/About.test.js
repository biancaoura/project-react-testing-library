import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('testing About component', () => {
  test('if page has infos about Pokédex', () => {
    render(<About />);

    const pokedexInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  test('if page has correct title', () => {
    render(<About />);

    const aboutHeading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('if page has 2 paragraphs', () => {
    render(<About />);

    const firstParagraph = screen.getByText(/digital encyclopedia/i);
    const secondParagraph = screen.getByText(/filter Pokémons by type/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('if renders correct image', () => {
    render(<About />);

    const pokedexImg = screen.getByRole('img', { name: 'Pokédex' });
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
