import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Ingredientes from './EmProgressPage/Ingredientes';
import Loading from './Loading';
import FavoriteFood from './FavoriteFood';
import '../App.css';
import './EmProgressPage/InProgressPage.css';

function EmProgresso({ props }) {
  const [data, setData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const magicNumber = 0;
  const history = useHistory();

  const setLocalDoneRecipes = () => {
    if (JSON.parse(localStorage.getItem('doneRecipes') === null)) {
      const arrayRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayRecipes));
    }
  };

  useEffect(() => {
    const fetchData = () => {
      setData(props[magicNumber]);
    };

    setLocalDoneRecipes();
    fetchData();
  }, [props]);

  if (!data) {
    return history.location.pathname.includes('comidas')
      ? (
        <div className="d-flex w-100 min-vh-100 align-items-center">
          <Loading param="food" />
        </div>
      )
      : (
        <div className="d-flex w-100 min-vh-100 align-items-center">
          <Loading param="drink" />
        </div>
      );
  }

  const ingredientsList = Object.entries(data)
    .filter((item) => item[0].includes('Ingredient'))
    .filter((element) => element[1] !== '' && element[1] !== null);

  const obj = { ingredientsList, data, setIsDisabled, isDisabled };

  const updateLocalStorage = () => {
    const initalLocalStorage = {
      cocktails: [],
      meals: [],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(initalLocalStorage));
  };

  const finishRecipe = () => {
    console.log(data);
    if (history.location.pathname.includes('bebidas')) {
      const favoriteRecipe = {
        id: data.idDrink,
        type: 'bebida',
        area: '',
        category: data.strCategory,
        alcoholicOrNot: data.strAlcoholic,
        name: data.strDrink,
        image: data.strDrinkThumb,
        doneDate: new Date().toString().split('G')[0].toString(),
        tags: data.strTags === null ? '' : data.strTags.split(','),
      };

      const localRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

      const recipesFinished = localRecipes.concat(favoriteRecipe);

      localStorage.setItem('doneRecipes', JSON.stringify(recipesFinished));
      updateLocalStorage();
      return history.push('/receitas-feitas');
    }
    const favoriteRecipe = {
      id: data.idMeal,
      type: 'comida',
      area: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
      doneDate: new Date().toString().split('G')[0].toString(),
      tags: data.strTags === null ? '' : data.strTags.split(','),
    };

    const localRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const recipesFinished = localRecipes.concat(favoriteRecipe);

    console.log('Estou aqui testando', new Date());

    localStorage.setItem('doneRecipes', JSON.stringify(recipesFinished));
    updateLocalStorage();
    return history.push('/receitas-feitas');
  };

  return (
    <div className="pb-4 background-smoked-with">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center">
          <img
            data-testid="recipe-photo"
            src={ data.strMealThumb || data.strDrinkThumb }
            alt="meals-img"
            width="100%"
          />
        </div>
        <div className="d-flex px-3 justify-content-between text-center">
          <div className="py-2">
            <h2 data-testid="recipe-title">{ data.strMeal || data.strDrink }</h2>
          </div>
          <FavoriteFood params={ obj } />
        </div>

        <div className="py-2 text-center">
          <h4 data-testid="recipe-category">{ data.strCategory }</h4>
        </div>
        <div className="bg-primary py-3 text-center">
          <h4 className="py-2">Ingredientes</h4>
          <Ingredientes params={ obj } />
        </div>

        <div className="py-3 my-5 bg-primary text-center">
          <h4 className="py-2">Instruções</h4>
          <p
            data-testid="instructions"
            className="text-justify instructions-background"
          >
            { data.strInstructions }
          </p>
        </div>
        <div className="align-self-center w-50">
          <button
            type="button"
            className="w-100 py-3 finish-button"
            data-testid="finish-recipe-btn"
            onClick={ finishRecipe }
            disabled={ isDisabled }
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}

EmProgresso.propTypes = {
  props: object,
}.isRequired;

export default EmProgresso;
