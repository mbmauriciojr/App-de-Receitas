/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextBebidas from '../provider/ContextBebida';
import { filterCategoriaBebidas } from '../services/apisCategories';
import { cocktailsAPI } from '../services/apisMealsAndCocktails';
import { apiSearchCocktails } from '../services/fetchApiSearch';
import Cards from '../components/Card';
import Loading from '../components/Loading';

function Bebidas() {
  const {
    data,
    originData,
    texto,
    categoria,
    ingredient,
    setData,
  } = useContext(ContextBebidas);

  const miliseconds = 2000;

  const fetchapi = async () => {
    const bebidas = await cocktailsAPI();
    setTimeout(() => setData(bebidas), miliseconds);
  };

  const fetchApiIngredient = async () => {
    const ingredientResp = await apiSearchCocktails(ingredient);
    setData(ingredientResp);
  };

  useEffect(() => {
    setData([]);
    if (ingredient) {
      fetchApiIngredient();
    } else {
      fetchapi();
    }
  }, []);

  const getApis = async () => {
    const apiDrinks = await filterCategoriaBebidas(texto);
    if (apiDrinks !== null && apiDrinks !== undefined) {
      return setData(apiDrinks);
    }
  };

  const fetchapi2 = () => {
    setData(originData);
  };

  useEffect(() => {
    if (texto === 'All') {
      fetchapi2();
    } else if (texto !== '') {
      getApis();
    }
  }, [texto]);

  if (data.length < 1) return <Loading param="drink" />;

  return (
    <div>
      <Header title="Bebidas" />
      <Categorias param={ categoria } />
      <div className="pb-5">
        <div className="d-flex w-75 flex-wrap mx-auto justify-content-center pb-4">
          <Cards param="bebidas" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
