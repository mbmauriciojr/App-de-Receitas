import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import ContextComidas from './ContextComida';
import { categoriaComida } from '../services/apisCategories';
import { mealsAPI } from '../services/apisMealsAndCocktails';

function ProviderComidas({ children }) {
  const [originData, setOrigindata] = useState([]);
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [texto, setTexto] = useState('');
  const [ingredient, setIngradient] = useState('');

  const fetchapi = async () => {
    const comidas = await mealsAPI();
    const categoriasComidas = await categoriaComida();

    setOrigindata(comidas);
    setCategoria(categoriasComidas);
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const context = {
    data,
    texto,
    categoria,
    originData,
    ingredient,
    setData,
    setTexto,
    setOrigindata,
    setCategoria,
    setIngradient,
  };

  return (
    <ContextComidas.Provider value={ context }>
      { children }
    </ContextComidas.Provider>
  );
}

ProviderComidas.propTypes = {
  children: object,
}.isRequired;

export default ProviderComidas;
