import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../App.css';
import { divMain, divImg, divContentForm, textLogin, textUpInput, btn } from '../styles/login';
import '../styles/Login.css';
import loginIcon from '../images/loginIcon.png';

function Login(props) {
  const INITIAL_LOGIN = {
    email: '',
    password: '',
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [login, setLogin] = useState(INITIAL_LOGIN);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleClick = () => {
    const user = { email: login.email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    const { history } = props;
    history.push('/comidas');
  };

  const inputsLogin = () => (
    <>
      <h1 className={ textLogin }>Baratie</h1>
      <div className={ divContentForm }>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Enter email"
              name="email"
              value={ login.email }
              onChange={ handleChange }
              data-testid="email-input"
              autoComplete="off"
            />
            <Form.Text className={ textUpInput }>
              Nunca compartilharemos seu e-mail com mais ninguém.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha:</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              name="password"
              value={ login.password }
              onChange={ handleChange }
              placeholder="Senha"
              data-testid="password-input"
            />
          </Form.Group>
          <Button
            variant="success"
            type="button"
            disabled={ isDisabled }
            onClick={ handleClick }
            data-testid="login-submit-btn"
            className={ btn }
          >
            Entrar
          </Button>
        </Form>
      </div>
    </>
  );

  // regex de email retirado de: https://ui.dev/validate-email-address-javascript/
  const inputsVerifier = () => {
    const { email, password } = login;
    // modelo que o regex de email verifica exemplo@exemplo.exemplo
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordRegex = new RegExp(/[\w\D]{7}/g);
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    inputsVerifier();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <div className={ `${divMain} body-test` }>
      <div className={ divImg }>
        <img alt="Icone Aplicação" src={ loginIcon } />
      </div>
      <div>
        {inputsLogin()}
      </div>
    </div>
  );
}

Login.propTypes = {
  history: object,
}.isRequired;

export default Login;
