/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, FormControl, Navbar,
  ButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { getIngCock, getIngCockTail, getNameCock,
  getNameCockTail, getFirstLetterCock, getFirstLetterCockTail,
} from '../services/fetchApiSearchBar';
import './searchBar.css';

import ContextComidas from '../provider/ContextComida';
import ContextBebidas from '../provider/ContextBebida';

const SearchBarForm = ({ searchBar }) => {
  const [busca, setBusca] = useState('');
  const [markBusca, setMarkBusca] = useState('');

  const { data: dataCocks, setData: setDataCocks, originData: originDataCocks,
  } = useContext(ContextComidas);

  const { data: dataDrinks, setData: setDataDrinks, originData: originDataDrinks,
  } = useContext(ContextBebidas);

  const HISTORY = useHistory();
  const LOCATION = useLocation();
  const INGREDIENT = 'ingredient';
  const NAME = 'name';
  const FIRST_LETTER = 'first-letter';
  const ALERT_SINTO_MUITO = 'Sinto muito,'
    + ' não encontramos nenhuma receita para esses filtros.';

  useEffect(() => {
    if (dataCocks === null || dataDrinks === null) {
      alert(ALERT_SINTO_MUITO);
      setDataCocks(originDataCocks);
      setDataDrinks(originDataDrinks);
    }
    if (dataCocks && dataCocks.length === 1 && LOCATION.pathname === '/comidas') {
      return HISTORY.push(`/comidas/${dataCocks[0].idMeal}`);
    }
    if (dataDrinks && dataDrinks.length === 1 && LOCATION.pathname === '/bebidas') {
      return HISTORY.push(`/bebidas/${dataDrinks[0].idDrink}`);
    }
  }, [dataCocks, dataDrinks]);

  const handleSearchBarApiComidas = () => {
    if (markBusca === INGREDIENT) {
      getIngCock(busca).then(({ meals }) => setDataCocks(meals));
    }
    if (markBusca === NAME) {
      getNameCock(busca).then(({ meals }) => setDataCocks(meals));
    }
    if (markBusca === FIRST_LETTER) {
      getFirstLetterCock(busca).then(({ meals }) => setDataCocks(meals));
    }
    if (markBusca === FIRST_LETTER && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchBarApiBebidas = () => {
    if (markBusca === INGREDIENT) {
      getIngCockTail(busca).then(({ drinks }) => setDataDrinks(drinks))
        .catch(() => alert(ALERT_SINTO_MUITO));
    }
    if (markBusca === NAME) {
      getNameCockTail(busca).then(({ drinks }) => setDataDrinks(drinks));
    }
    if (markBusca === FIRST_LETTER) {
      getFirstLetterCockTail(busca).then(({ drinks }) => setDataDrinks(drinks));
    }
    if (markBusca === FIRST_LETTER && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleFilterSearchBar = () => {
    if (LOCATION.pathname === '/comidas') return handleSearchBarApiComidas();
    if (LOCATION.pathname === '/bebidas') return handleSearchBarApiBebidas();
  };

  const handleSearchBarValue = () => (
    <div className="textBtn">
      <FormControl
        type="text"
        id="id-busca"
        name="id-busca"
        className="text"
        placeholder="Search"
        onChange={ ({ target }) => setBusca(target.value) }
        data-testid={ searchBar === true ? 'search-input' : null }
      />
      <Button
        className="button"
        variant="outline-danger"
        data-testid="exec-search-btn"
        onClick={ handleFilterSearchBar }
      >
        Search
      </Button>
    </div>
  );

  const handleSearchBarMark = () => {
    const RADIOS = [
      { name: 'Ingredient', value: INGREDIENT, dataTestid: 'ingredient-search-radio' },
      { name: 'Name', value: NAME, dataTestid: 'name-search-radio' },
      { name: 'First Letter',
        value: FIRST_LETTER,
        dataTestid: 'first-letter-search-radio' },
    ];
    return (
      <ButtonGroup toggle className="radios">
        {RADIOS.map((radio, idx) => (
          <ToggleButton
            key={ idx }
            type="radio"
            name="radio"
            value={ radio.value }
            variant="outline-success"
            checked={ markBusca === radio.value }
            data-testid={ `${radio.dataTestid}` }
            onChange={ ({ target }) => setMarkBusca(target.value) }
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    );
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Form className="form">
          { handleSearchBarValue() }
          { handleSearchBarMark() }
        </Form>
      </Navbar>
    </div>
  );
};

export default SearchBarForm;

SearchBarForm.propTypes = {
  searchBar: propTypes.bool,
}.isRequired;
