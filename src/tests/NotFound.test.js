import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('testing NotFound component', () => {
  test('if there\'s a header with the correct text', () => {
    render(<NotFound />);

    const notFoundHeader = screen
      .getByRole('heading', { level: 2 });
    expect(notFoundHeader).toHaveTextContent('Page requested not found');
    expect(notFoundHeader).toBeInTheDocument();
  });

  test('if renders correct image (pikachu crying)', () => {
    render(<NotFound />);

    const pikachuImg = screen
      .getByRole('img',
        { name: 'Pikachu crying because the page requested was not found' });
    expect(pikachuImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
