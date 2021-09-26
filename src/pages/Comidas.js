/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextComidas from '../provider/ContextComida';
import { filterCategoriaComidas } from '../services/apisCategories';
import { mealsAPI } from '../services/apisMealsAndCocktails';
import { apiSearchMeals } from '../services/fetchApiSearch';
import Cards from '../components/Card';
import Loading from '../components/Loading';

function Comidas() {
  const {
    data,
    originData,
    texto,
    categoria,
    ingredient,
    setData,
  } = useContext(ContextComidas);

  const miliseconds = 2000;

  const fetchapi = async () => {
    const comidas = await mealsAPI();
    setTimeout(() => setData(comidas), miliseconds);
  };

  const fetchApiIngredient = async () => {
    const ingredientResp = await apiSearchMeals(ingredient);
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
    const apiFoods = await filterCategoriaComidas(texto);
    if (apiFoods !== null && apiFoods !== undefined) {
      return setData(apiFoods);
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

  if (data.length < 1) return <Loading param="food" />;

  return (
    <div>
      <Header title="Comidas" />
      <Categorias param={ categoria } />
      <div className="pb-5">
        <div className="d-flex w-75 flex-wrap mx-auto justify-content-center pb-4">
          <Cards param="comidas" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;
