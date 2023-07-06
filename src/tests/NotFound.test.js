import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Requisito 4', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Verifica se contém um heading h2 com o texto Page requested not found 😭', () => {
    const page = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(page).toBeInTheDocument();
  });
  it('Verifica se a página mostra a imagem', () => {
    const havImg = screen.getByRole('img', { name: /Pikachu crying because the page/i });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(havImg).toHaveAttribute('src', src);
    expect(havImg).toBeInTheDocument();
  });
});
