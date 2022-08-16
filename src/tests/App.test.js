import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('test links on top of page', () => {
  test('if there\'s a nav bar', () => {
    renderWithRouter(<App />);

    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });

  test('if links work in the correct order', () => {
    renderWithRouter(<App />);

    const navBar = screen.getByRole('navigation');
    const navLinks = within(navBar).getAllByRole('link');
    const totalNavLinks = 3;

    expect(navLinks).toHaveLength(totalNavLinks);

    const firstNavLink = navLinks[0];
    const secondNavLink = navLinks[1];
    const thirdNavLink = navLinks[2];

    expect(firstNavLink.innerHTML).toBe('Home');
    expect(secondNavLink.innerHTML).toBe('About');
    expect(thirdNavLink.innerHTML).toBe('Favorite Pokémons');
  });

  test('if clicking on "Home" goes to "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('if clicking on "About" goes to /about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');

    const aboutHeader = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutHeader).toBeInTheDocument();
  });

  test('if clicking on "Favorite Pokémons" goes to /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const FavoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(FavoritesLink).toBeInTheDocument();

    userEvent.click(FavoritesLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');

    const aboutHeader = screen
      .getByRole('heading', { name: 'Favorite pokémons', level: 2 });
    expect(aboutHeader).toBeInTheDocument();
  });

  test('if navigating to unknown path displays an error page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('yadayada');

    const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toHaveTextContent('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
