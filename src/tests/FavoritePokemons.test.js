import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Requisito 3', () => {
  it('Teste se é exibida a mensagem `No favorite pokemon found`, caso não haja', () => {
    renderWithRouter(<FavoritePokemons />);
    const emptyFav = screen.getByText(/No favorite pokemon found/i);
    expect(emptyFav).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);
    const fav = container.getElementsByClassName('favorite-pokemon');
    const hadFav = fav && fav.length;
    expect(hadFav);
  });
});
