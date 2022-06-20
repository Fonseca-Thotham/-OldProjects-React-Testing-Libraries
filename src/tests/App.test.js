import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1', () => {
  it('Verifica se possui um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getByRole('navigation');
    expect(links).toBeInTheDocument();

    const linksLen = 3;
    expect(links.children.length).toBe(linksLen);

    const titleHome = screen.getByRole('link', { name: /Home/i });
    expect(titleHome).toBeInTheDocument();

    const titleAbout = screen.getByRole('link', { name: /About/i });
    expect(titleAbout).toBeInTheDocument();

    const titleFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(titleFav).toBeInTheDocument();
  });

  it('Verifica se redireciona para URL `/` ao clicar em Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
  });

  it('Verifica se redireciona para URL `/about` ao clicar em About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
  });

  it('Verifica se redireciona a URL `/favorites` ao clicar em Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFav).toBeInTheDocument();
    userEvent.click(linkFav);
  });

  it('Verifica se redireciona para Not Found ao clicar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/la');
    const notEl = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(notEl).toBeInTheDocument();
  });
});
