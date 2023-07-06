import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Requisito 2', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Verifica se a página contém as informações sobre a Pokédex', () => {
    const pokeInfo = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(pokeInfo).toBeInTheDocument();
  });

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const aboutPoke = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutPoke).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const histPoke = screen.getAllByText(/Pokémons/i);
    expect(histPoke).toHaveLength(2);
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    const hasImg = screen.getByRole('img',
      { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(hasImg).toBeInTheDocument();
    expect(hasImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
