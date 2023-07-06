import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const pokeFavID = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
describe('Requisito 5', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokeFavID }
    />);
  });
  it('Teste se a página contém um h2 com o texto `Encountered pokémons`', () => {
    const hash2 = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(hash2).toBeInTheDocument();
  });
  it('Teste se exibe o próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    const nextPoke = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPoke).toBeInTheDocument();
    const btnReset = screen.getByText('All');
    expect(btnReset).toBeInTheDocument();
    userEvent.click(btnReset);
    const pokeName = screen.getByTestId('pokemon-name');
    pokemons.forEach((el) => {
      expect(pokeName).toHaveTextContent(el.name);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(nextPoke);
    });
    expect(pokeName).toHaveTextContent(pokemons[0].name);
    expect(pokeName).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    const pokeList = screen.getAllByTestId('pokemon-name');
    expect(pokeList[0]).toBeInTheDocument();
    expect(pokeList).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const filtBtn = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    btnFilter.forEach((el, i) => {
      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent(filtBtn[i]);
    });
  });
});
