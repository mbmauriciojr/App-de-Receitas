/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { object } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const xablau = ({ dados, favoriteFoods }) => {
  const {
    data,
    history,
    favoriteMeal,
    favoriteCocktail,
  } = dados;

  const { location: { pathname } } = history;

  if ((favoriteCocktail !== false || favoriteMeal !== false)
  && JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
    const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const filterRecipesMeal = oldRecipes
      .filter((actualRecipe) => actualRecipe.id !== data.idMeal);
    const filterRecipesDrink = oldRecipes
      .filter((actualRecipe) => actualRecipe.id !== data.idDrink);

    const newRecipes = () => {
      if (pathname.includes('comidas')) return [...filterRecipesMeal];
      return [...filterRecipesDrink];
    };

    return localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes()));
  } if ((favoriteCocktail !== true || favoriteMeal !== true)) {
    if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
      const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      const newRecipes = [...oldRecipes, favoriteFoods];

      return localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    }
    return localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteFoods]));
  }
};

const favoriteClick = (dados, e) => {
  const {
    data,
    history,
    favoriteMeal,
    setFavoriteMeal,
    favoriteCocktail,
    setFavoriteCocktail,
  } = dados;

  const { location: { pathname } } = history;
  e.preventDefault();

  const favoriteFoods = {
    id: data.idMeal || data.idDrink,
    type: data.idMeal ? 'comida' : 'bebida',
    area: data.strArea || '',
    category: data.strCategory,
    alcoholicOrNot: data.strAlcoholic || '',
    name: data.strMeal || data.strDrink,
    image: data.strMealThumb || data.strDrinkThumb,
  };

  const obj = {
    favoriteFoods,
    dados,
  };

  xablau(obj);

  const meal = () => (!favoriteMeal
    ? setFavoriteMeal(true)
    : setFavoriteMeal(false));

  const cocktail = () => (!favoriteCocktail
    ? setFavoriteCocktail(true)
    : setFavoriteCocktail(false));

  return pathname.includes('comidas') ? meal() : cocktail();
};

function FavoriteFood({ params: { data } }) {
  const [favoriteMeal, setFavoriteMeal] = useState(false);
  const [favoriteCocktail, setFavoriteCocktail] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState('');

  const history = useHistory();

  const recipesFunc = (param, setStatefunc) => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const checkRecipe = recipes.find((recipe) => recipe.id === param);
    if (checkRecipe)setStatefunc(true);
  };

  useEffect(() => {
    const verifyFavorite = () => {
      const { location: { pathname } } = history;

      if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
        switch (pathname.includes('comidas')) {
        case true:
          recipesFunc(data.idMeal, setFavoriteMeal);
          break;
        case false:
          recipesFunc(data.idDrink, setFavoriteCocktail);
          break;
        default:
          break;
        }
      }
    };

    verifyFavorite();
  }, []);

  const shareClick = (e) => {
    e.preventDefault();
    const { location: { pathname } } = history;

    if (pathname.includes('comidas')) {
      copy(`http://localhost:3000/comidas/${data.idMeal}`);
      setClipboardStatus('copied');
      return null;
    }
    copy(`http://localhost:3000/bebidas/${data.idDrink}`);
    setClipboardStatus('copied');
  };

  const dados = {
    data,
    history,
    favoriteMeal,
    setFavoriteMeal,
    favoriteCocktail,
    setFavoriteCocktail,
  };

  return (
    <div className="buttons-container">
      <button type="button" data-testid="share-btn" onClick={ shareClick }>
        <img alt="Share link" src={ shareIcon } />
      </button>
      <button type="button" onClick={ (e) => favoriteClick(dados, e) }>
        <img
          alt="Favorite button"
          data-testid="favorite-btn"
          src={ !favoriteCocktail && !favoriteMeal ? whiteHeartIcon : blackHeartIcon }
        />
      </button>
      {!clipboardStatus ? null : (<h5>Link copiado!</h5>)}
    </div>
  );
}

FavoriteFood.propTypes = {
  params: object,
}.isRequired;

export default FavoriteFood;
