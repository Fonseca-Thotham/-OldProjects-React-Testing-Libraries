import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

let globalHistory;
const destLink = '/pokemons/25';

describe('Requisito 6', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    globalHistory = history;
  });

  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const cardName = screen.getByTestId('pokemon-name');
    const cardType = screen.getByTestId('pokemon-type');
    const cardWeigth = screen.getByTestId('pokemon-weight');
    const cardImg = screen.getByAltText('Pikachu sprite');
    expect(cardName).toHaveTextContent('Pikachu');
    expect(cardType).toHaveTextContent('Electric');
    expect(cardWeigth).toHaveTextContent('Average weight: 6.0 kg');
    expect(cardImg).toHaveAttribute('src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });

  it('Teste se o card indicado na Pokédex possui link para exibir detalhes', () => {
    const cardLink = screen.getByRole('link', { name: /More details/i });
    expect(cardLink).toHaveAttribute('href', destLink);
    expect(cardLink).toBeInTheDocument();
  });

  it('Teste se ao clicar é feito o redirecionamento para a página de detalhes', () => {
    const click = screen.getByRole('link', { name: /More details/i });
    userEvent.click(click);
    const isThere = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(isThere).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para `/pokemon/<id>`', () => {
    globalHistory.push(destLink);
    expect(globalHistory.location.pathname).toBe(destLink);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const favoriteEl = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(favoriteEl);
    const favPoke = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favPoke).toBeInTheDocument();
    expect(favPoke).toHaveAttribute('src', '/star-icon.svg');
  });
});
