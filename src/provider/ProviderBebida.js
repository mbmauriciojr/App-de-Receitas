import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import ContextBebidas from './ContextBebida';
import { categoriaBebida } from '../services/apisCategories';
import { cocktailsAPI } from '../services/apisMealsAndCocktails';

function ProviderBebidas({ children }) {
  const [originData, setOrigindata] = useState([]);
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [texto, setTexto] = useState('');
  const [ingredient, setIngradient] = useState('');

  const fetchapi = async () => {
    const bebidas = await cocktailsAPI();
    const categoriasBebidas = await categoriaBebida();

    setOrigindata(bebidas);
    setCategoria(categoriasBebidas);
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
    <ContextBebidas.Provider value={ context }>
      { children }
    </ContextBebidas.Provider>
  );
}

ProviderBebidas.propTypes = {
  children: object,
}.isRequired;

export default ProviderBebidas;
