import React from 'react';
import { queryByAltText, screen } from '@testing-library/dom'
import App from './App';
import renderWhithRouter from './components/RenderWithRouter';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

describe('1 - Testes tela de login', () => {
  test('Verifica se existe tela de login',
    () => {
      const { history } = renderWhithRouter(<App />);
      const { location } = history;
      const { pathname } = location;
      const heading = screen.getByRole('heading', {
        level: 1,
      });
      expect(pathname).toBe('/');
      expect(heading).toBeInTheDocument();
    });

  test('Verifica campos de Email, Senha e Botao',
    () => {
      renderWhithRouter(<App />);
      const inputEmail = screen.getByTestId('email-input');
      const inputPassWord = screen.getByTestId('password-input');
      const btn = screen.getByRole('button', { name: 'Entrar' });

      expect(inputEmail).toBeInTheDocument();
      expect(inputPassWord).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
    });

  test('Verifica condicoes para acionar botao',
    () => {
      renderWhithRouter(<App />);
      const inputEmail = screen.getByTestId('email-input');
      const inputPassWord = screen.getByTestId('password-input');
      const btn = screen.getByRole('button', { name: 'Entrar' });

      expect(btn).toBeDisabled();

      userEvent.type(inputEmail, 'exemplo');
      userEvent.type(inputPassWord, 'exemplo');
      userEvent.click(btn);
      expect(btn).toBeDisabled();

      userEvent.type(inputEmail, 'exemplo@exemplo');
      userEvent.type(inputPassWord, 'exemplo');
      expect(btn).toBeDisabled();

      userEvent.type(inputEmail, 'exemplo@exemplo');
      userEvent.type(inputPassWord, 'exempl');
      expect(btn).toBeDisabled();

      userEvent.type(inputEmail, 'exemplo@exemplo.exemplo');
      userEvent.type(inputPassWord, 'exemplo');
      expect(btn).not.toBeDisabled();
    });

  test('Verirfica se ao clique do botão é redirecionado para a tela principa COMIDAS',
    () => {
      const { history } = renderWhithRouter(<App />);

      const inputEmail = screen.getByTestId('email-input');
      const inputPassWord = screen.getByTestId('password-input');
      const btn = screen.getByRole('button', { name: 'Entrar' });

      userEvent.type(inputEmail, 'exemplo@exemplo.exemplo');
      userEvent.type(inputPassWord, 'exemplo');
      userEvent.click(btn);
      const { location } = history;
      const { pathname } = location;

      expect(pathname).toBe('/comidas');
    });
});

describe('2 - Testes do componente Header', () => {
  test('Verifica se o componente Header renderiza na página de comidas com todos os ícones', async () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/comidas');

    const loading = screen.getByAltText('loading-gif');
    expect(loading).toBeInTheDocument();

    const linkPerfil = screen.getByAltText('profile');
    const headerTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(linkPerfil).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  })

  test('Verifica se o componente Header renderiza na página de bebidas com todos os ícones', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/bebidas');

    const linkPerfil = screen.getByTestId('profile-top-btn');
    const headerTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(linkPerfil).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  })

  test('Verifica se o componente Header renderiza na página de explorar comidas por local de origem com todos os ícones', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/explorar/comidas/area');

    const linkPerfil = screen.getByTestId('profile-top-btn');
    const headerTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(linkPerfil).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  })

  test('verifica se o ícone de perfil redireciona para a página de perfil', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/comidas');

    const linkPerfil = screen.getByTestId('profile-top-btn');

    userEvent.click(linkPerfil);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/perfil');
  })

  test('Verifica se a barra de pesquisa renderiza quando o ícone de pesquisa é clicado', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/comidas');

    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('exec-search-btn');
    expect(searchInput).toBeInTheDocument();
  })

  test('Verifica se o componente Header não renderiza na tela de login', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/')

    const linkPerfil = screen.queryByAltText('profile');
    const searchButton = screen.queryByAltText('search');

    expect(linkPerfil).not.toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  })

  test('Verifica se o Header renderiza com os ícones corretos na página de perfil', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/comidas');

    const linkPerfil = screen.getByTestId('profile-top-btn');

    userEvent.click(linkPerfil);
    const linkPerfilInPerfilPage = screen.getByTestId('profile-top-btn');
    const headerTitlePerfilPage = screen.getByTestId('page-title');
    const searchButtonPerfilPage = screen.queryByAltText('search');
    expect(linkPerfilInPerfilPage).toBeInTheDocument();
    expect(headerTitlePerfilPage).toBeInTheDocument();
    expect(searchButtonPerfilPage).not.toBeInTheDocument();
  })

  test('Verifica se o Header renderiza com os ícones corretos na página de explorar', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/comidas');

    const linkPerfil = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');
    const headerTitle = screen.getByTestId('page-title');

    expect(linkPerfil).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    history.push('/explorar');

    const linkPerfilExplorar = screen.getByTestId('profile-top-btn');
    const headerTitleExplorar = screen.getByTestId('page-title');
    const searchButtonExplorar = screen.queryByAltText('search');

    expect(linkPerfilExplorar).toBeInTheDocument();
    expect(headerTitleExplorar).toBeInTheDocument();
    expect(searchButtonExplorar).not.toBeInTheDocument();
  })

  test('Verifica se o Header renderiza com os ícones corretos nas páginas de explorar comidas e explorar bebidas', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/explorar/comidas');

    const linkPerfilExplorarComidas = screen.getByTestId('profile-top-btn');
    const headerTitleExplorarComidas = screen.getByTestId('page-title');
    const searchButtonExplorarComidas = screen.queryByAltText('search');

    expect(linkPerfilExplorarComidas).toBeInTheDocument();
    expect(headerTitleExplorarComidas).toBeInTheDocument();
    expect(searchButtonExplorarComidas).not.toBeInTheDocument();

    history.push('/explorar/bebidas');

    const linkPerfilExplorarBebidas = screen.getByTestId('profile-top-btn');
    const headerTitleExplorarBebidas = screen.getByTestId('page-title');
    const searchButtonExplorarBebidas = screen.queryByAltText('search');

    expect(linkPerfilExplorarBebidas).toBeInTheDocument();
    expect(headerTitleExplorarBebidas).toBeInTheDocument();
    expect(searchButtonExplorarBebidas).not.toBeInTheDocument();
  })

  test('Verifica se o Header renderiza com os ícones corretos nas páginas de explorar comida e bebidas por ingredientes', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');

    const linkPerfilExplorarComidasPorIng = screen.getByTestId('profile-top-btn');
    const headerTitleExplorarComidasPorIng = screen.getByTestId('page-title');
    const searchButtonExplorarComidasPorIng = screen.queryByAltText('search');

    expect(linkPerfilExplorarComidasPorIng).toBeInTheDocument();
    expect(headerTitleExplorarComidasPorIng).toBeInTheDocument();
    expect(searchButtonExplorarComidasPorIng).not.toBeInTheDocument();

    history.push('/explorar/bebidas/ingredientes');

    const linkPerfilExplorarBebidasPorIng = screen.getByTestId('profile-top-btn');
    const headerTitleExplorarBebidasPorIng = screen.getByTestId('page-title');
    const searchButtonExplorarBebidasPorIng = screen.queryByAltText('search');

    expect(linkPerfilExplorarBebidasPorIng).toBeInTheDocument();
    expect(headerTitleExplorarBebidasPorIng).toBeInTheDocument();
    expect(searchButtonExplorarBebidasPorIng).not.toBeInTheDocument();
  })

  test('Verifica se o Header renderiza com os ícones corretos nas páginas de receitas favoritas e receitas feitas', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/receitas-favoritas');

    const linkPerfilReceitasFavoritas = screen.getByTestId('profile-top-btn');
    const headerTitleReceitasFavoritas = screen.getByTestId('page-title');
    const searchButtonReceitasFavoritas = screen.queryByAltText('search');

    expect(linkPerfilReceitasFavoritas).toBeInTheDocument();
    expect(headerTitleReceitasFavoritas).toBeInTheDocument();
    expect(searchButtonReceitasFavoritas).not.toBeInTheDocument();

    history.push('/receitas-feitas');

    const linkPerfilReceitasFeitas = screen.getByTestId('profile-top-btn');
    const headerTitleReceitasFeitas = screen.getByTestId('page-title');
    const searchButtonReceitasFeitas = screen.queryByAltText('search');

    expect(linkPerfilReceitasFeitas).toBeInTheDocument();
    expect(headerTitleReceitasFeitas).toBeInTheDocument();
    expect(searchButtonReceitasFeitas).not.toBeInTheDocument();

  })
})

describe('4 - Testes do Menu inferior(Footer)', () => {
  test('Verifica se existe o componente Footer em uma página',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/comidas');
      const { location } = history;
      const { pathname } = location;

      const linkFoods = screen.getByTestId('food-bottom-btn');
      const linkDrinks = screen.getByTestId('drinks-bottom-btn');
      const linkExplore = screen.getByTestId('explore-bottom-btn');

      expect(linkFoods).toBeInTheDocument();
      expect(linkDrinks).toBeInTheDocument();
      expect(linkExplore).toBeInTheDocument();
      expect(pathname).toBe('/comidas');

    });

  test('Verifica se ao clicar nos icones você é redirecionado',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/perfil');
      const pathnamePerfil = history.location.pathname;

      expect(pathnamePerfil).toBe('/perfil');

      //Comidas
      const linkFoods = screen.getByTestId('food-bottom-btn');
      expect(linkFoods).toBeInTheDocument();

      userEvent.click(linkFoods);
      const pathFoods = history.location.pathname;
      expect(pathFoods).toBe('/comidas');

      //Drinks
      const linkDrinks = screen.getByTestId('drinks-bottom-btn');
      expect(linkDrinks).toBeInTheDocument();

      userEvent.click(linkDrinks);
      const pathBebidas = history.location.pathname;
      expect(pathBebidas).toBe('/bebidas');

      // Explorar
      const linkExplore = screen.getByTestId('explore-bottom-btn');
      expect(linkExplore).toBeInTheDocument();

      userEvent.click(linkExplore);
      const pathExplore = history.location.pathname;
      expect(pathExplore).toBe('/explorar');


    });

  test('Verifica se existe o componente Footer na página de Bebida',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/bebidas');
      const { location } = history;
      const { pathname } = location;

      const linkFooter = screen.getByTestId('footer')

      expect(linkFooter).toBeInTheDocument();
      expect(linkFooter.children.length).toBe(3);
      expect(pathname).toBe('/bebidas');

    });

  test('Verifica se existe o componente Footer na página de Comidas',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/comidas');
      const { location } = history;
      const { pathname } = location;

      const linkFooter = screen.getByTestId('footer')

      expect(linkFooter).toBeInTheDocument();
      expect(linkFooter.children.length).toBe(3);
      expect(pathname).toBe('/comidas');

    });

  test('Verifica se existe o componente Footer na página de Explorar',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/explorar');
      const { location } = history;
      const { pathname } = location;

      const linkFooter = screen.getByTestId('footer')

      expect(linkFooter).toBeInTheDocument();
      expect(linkFooter.children.length).toBe(3);
      expect(pathname).toBe('/explorar');

    });

  test('Verifica se existe o componente Footer na página de ExplorarComidas',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/explorar/comidas');
      const { location } = history;
      const { pathname } = location;

      const linkFooter = screen.getByTestId('footer')

      expect(linkFooter).toBeInTheDocument();
      expect(linkFooter.children.length).toBe(3);
      expect(pathname).toBe('/explorar/comidas');

    });

  test('Verifica se existe o componente Footer na página de ExplorarBebidas',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/explorar/bebidas');
      const { location } = history;
      const { pathname } = location;

      const linkFooter = screen.getByTestId('footer')

      expect(linkFooter).toBeInTheDocument();
      expect(linkFooter.children.length).toBe(3);
      expect(pathname).toBe('/explorar/bebidas');

    });

  test('Verifica se existe o componente Footer na página de ExplorarBebidasING',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/explorar/bebidas/ingredientes');
      const { location } = history;
      const { pathname } = location;

      const linkFooter = screen.getByTestId('footer')

      expect(linkFooter).toBeInTheDocument();
      expect(linkFooter.children.length).toBe(3);
      expect(pathname).toBe('/explorar/bebidas/ingredientes');

    });

  test('Verifica se existe o componente Footer na página de ExplorarComidasING',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/explorar/comidas/ingredientes');
      const { location } = history;
      const { pathname } = location;

      const linkFooter = screen.getByTestId('footer')

      expect(linkFooter).toBeInTheDocument();
      expect(linkFooter.children.length).toBe(3);
      expect(pathname).toBe('/explorar/comidas/ingredientes');

    });

  test('Verifica se não existe o componente Footer na página de Login',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('/');
      const { location } = history;
      const { pathname } = location;

      const footer = screen.queryByText('footer')
      expect(footer).not.toBeInTheDocument()
      expect(pathname).toBe('/');
    });

  test('Verifica se não existe o componente Footer na página de Login',
    () => {
      const { history } = renderWhithRouter(<App />);

      history.push('receitas-feitas');
      const { location } = history;
      const { pathname } = location;

      const footer = screen.queryByText('footer')
      expect(footer).not.toBeInTheDocument()
      expect(pathname).toBe('/receitas-feitas');
    });
});
