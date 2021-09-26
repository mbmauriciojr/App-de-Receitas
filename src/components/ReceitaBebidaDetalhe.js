import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import RecomendacoesCard from './RecomendacoesCard';
import Header from './Header';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { btn } from '../styles/login';

import '../styles/DetalhesPagina.css';

const copy = require('clipboard-copy');

function ReceitaBebidaDetalhe({ props }) {
  const [clipboardStatus, setClipboardStatus] = useState();
  const [favoriteDrink, setFavoriteDrink] = useState(false);
  const [statusDrink, setStatusDrink] = useState(false);

  const history = useHistory();

  const { acctualyDrink, drinkRecomendation, id } = props;

  const checkStatusRecipe = () => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes') !== null)) {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;

      if (Object.keys(recipes).includes(id) === true) setStatusDrink(true);
    }
  };

  useEffect(() => {
    const verifyFavorite = () => {
      if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
        const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const checkRecipe = recipes.find((recipe) => recipe.id === id);

        if (checkRecipe) setFavoriteDrink(true);
      }
    };

    checkStatusRecipe();
    verifyFavorite();
  }, [id]);

  const shareClick = (e) => {
    e.preventDefault();
    const { location: { pathname } } = history;

    copy(`http://localhost:3000${pathname}`);
    setClipboardStatus('copied');
  };

  const favoriteClick = (e) => {
    e.preventDefault();

    const favoriteRecipe = {
      id,
      type: 'bebida',
      area: '',
      category: acctualyDrink.drinks[0].strCategory,
      alcoholicOrNot: acctualyDrink.drinks[0].strAlcoholic,
      name: acctualyDrink.drinks[0].strDrink,
      image: acctualyDrink.drinks[0].strDrinkThumb,
    };

    if (favoriteDrink !== false
      && JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
      const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      const filterRecipes = oldRecipes.filter((actualRecipe) => actualRecipe.id !== id);

      const newRecipes = [...filterRecipes];

      localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    } if (favoriteDrink !== true) {
      if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
        const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

        const newRecipes = [...oldRecipes, favoriteRecipe];

        localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
      }
    }

    return !favoriteDrink ? setFavoriteDrink(true) : setFavoriteDrink(false);
  };

  const handleClick = (e) => {
    e.preventDefault();

    history.push(`/bebidas/${id}/in-progress`);
  };

  const createRecipe = () => {
    if (acctualyDrink) {
      const {
        strDrink,
        strAlcoholic,
        strCategory,
        strInstructions,
        strDrinkThumb,
      } = acctualyDrink.drinks[0];

      const drinkRendering = acctualyDrink.drinks[0];

      const ingredients = [
        `${drinkRendering.strIngredient1} ${drinkRendering.strMeasure1}`,
        `${drinkRendering.strIngredient2} ${drinkRendering.strMeasure2}`,
        `${drinkRendering.strIngredient3} ${drinkRendering.strMeasure3}`,
        `${drinkRendering.strIngredient4} ${drinkRendering.strMeasure4}`,
        `${drinkRendering.strIngredient5} ${drinkRendering.strMeasure5}`,
        `${drinkRendering.strIngredient6} ${drinkRendering.strMeasure6}`,
        `${drinkRendering.strIngredient7} ${drinkRendering.strMeasure7}`,
        `${drinkRendering.strIngredient8} ${drinkRendering.strMeasure8}`,
        `${drinkRendering.strIngredient9} ${drinkRendering.strMeasure9}`,
        `${drinkRendering.strIngredient10} ${drinkRendering.strMeasure10}`,
        `${drinkRendering.strIngredient11} ${drinkRendering.strMeasure11}`,
        `${drinkRendering.strIngredient12} ${drinkRendering.strMeasure12}`,
        `${drinkRendering.strIngredient13} ${drinkRendering.strMeasure13}`,
      ];

      return (
        <div className="recipe-container">
          <Header title="Detalhes da Bebidas" />
          <img
            alt="Produto"
            className="img-details-main"
            data-testid="recipe-photo"
            src={ strDrinkThumb }
          />
          <div className="infos-buttons-container">
            <div className="infos-container">
              <h2 data-testid="recipe-title">{ strDrink }</h2>
              <p data-testid="recipe-category">{ `${strCategory} - ${strAlcoholic}` }</p>
            </div>

            <div className="buttons-container">
              <button type="button" data-testid="share-btn" onClick={ shareClick }>
                <img alt="Share link" src={ shareIcon } />
              </button>
              <button type="button" onClick={ favoriteClick }>
                <img
                  alt="Favorite button"
                  data-testid="favorite-btn"
                  src={ !favoriteDrink ? whiteHeartIcon : blackHeartIcon }
                />
              </button>
            </div>
          </div>

          {!clipboardStatus ? null : (<h5>Link copiado!</h5>)}

          <ul className="list-container py-3">
            <h3 className="text-center pb-3">Ingredients</h3>
            { ingredients.map((ingredient, index) => {
              if (ingredient !== null
                && ingredient !== ' '
                && ingredient !== '  '
                && ingredient !== 'null null') {
                return (
                  <li
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `- ${ingredient}` }
                  </li>);
              }
              return '';
            })}
          </ul>
          <div className="instruction-container py-3 mt-3">
            <h3 className="text-center pb-3">Instructions</h3>
            <p data-testid="instructions">{ strInstructions }</p>
          </div>

          <h3 className="py-4">Receitas Recomendadas:</h3>

          <div className="recomendation-container">
            { drinkRecomendation.map((drink, index) => {
              const cardLength = 5;
              if (index <= cardLength) {
                return (
                  <RecomendacoesCard
                    key={ index }
                    props={ drink }
                    type="drink"
                    index={ index }
                  />
                );
              }
              return null;
            }) }
          </div>

          <Button
            variant="success"
            type="button"
            onClick={ handleClick }
            data-testid="start-recipe-btn"
            className={ `${btn} button-recipe py-3` }
          >
            { statusDrink === true ? 'Continuar Receita' : 'Iniciar Receita' }
          </Button>
        </div>
      );
    }
    return null;
  };

  return createRecipe();
}

export default ReceitaBebidaDetalhe;
