import { object } from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Buttons from '../components/Buttons';
import { btnGroup, containerBtn, title, containerTitle } from '../styles/perfil';
import Header from '../components/Header';

function Perfil(props) {
  const getEmail = () => {
    if (JSON.parse(localStorage.getItem('user') !== null)) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
    return 'não logado';
  };

  const handleClick = ({ target }) => {
    const { history } = props;
    if (target.innerText === 'Receitas Favoritas') {
      history.push('/receitas-favoritas');
    } else if (target.innerText === 'Receitas Feitas') {
      history.push('/receitas-feitas');
    } else {
      localStorage.clear();
      history.push('/');
    }
  };

  const btnDone = () => {
    const dataTestid = 'profile-done-btn';
    const funcHandleClick = handleClick;
    const text = 'Receitas Feitas';
    const obj = { text, dataTestid, funcHandleClick };
    return <Buttons params={ obj } />;
  };

  const btnFavorite = () => {
    const dataTestid = 'profile-favorite-btn';
    const funcHandleClick = handleClick;
    const text = 'Receitas Favoritas';
    const obj = { text, dataTestid, funcHandleClick };
    return <Buttons params={ obj } />;
  };

  const btnExit = () => {
    const dataTestid = 'profile-logout-btn';
    const funcHandleClick = handleClick;
    const text = 'Sair';
    const obj = { text, dataTestid, funcHandleClick };
    return <Buttons params={ obj } />;
  };

  return (
    <>
      <Header title="Perfil" />
      <div className={ containerBtn }>
        <div className={ containerTitle }>
          <p className={ title } data-testid="profile-email">{ getEmail() }</p>
        </div>
        <div className={ btnGroup }>
          {btnDone()}
          {btnFavorite()}
          {btnExit()}
        </div>
      </div>
      <Footer />
    </>
  );
}

Perfil.propTypes = {
  history: object,
}.isRequired;

export default Perfil;
