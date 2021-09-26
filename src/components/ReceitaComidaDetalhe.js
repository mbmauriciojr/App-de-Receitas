import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import RecomendacoesCard from './RecomendacoesCard';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { btn } from '../styles/login';

import '../styles/DetalhesPagina.css';
import Header from './Header';

const copy = require('clipboard-copy');

function ReceitaComidaDetalhe({ props }) {
  const [favoriteFood, setFavoriteFood] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState();
  const [statusFood, setStatusFood] = useState(false);

  const history = useHistory();

  const { acctualyFood, foodRecomendation, id } = props;

  const checkStatusRecipe = () => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes') !== null)) {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;

      if (Object.keys(recipes).includes(id) === true) setStatusFood(true);
    }
  };

  useEffect(() => {
    const verifyFavorite = () => {
      if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
        const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const checkRecipe = recipes.find((recipe) => recipe.id === id);

        if (checkRecipe) setFavoriteFood(true);
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
      type: 'comida',
      area: acctualyFood.meals[0].strArea,
      category: acctualyFood.meals[0].strCategory,
      alcoholicOrNot: '',
      name: acctualyFood.meals[0].strMeal,
      image: acctualyFood.meals[0].strMealThumb,
    };

    if (favoriteFood !== false
      && JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
      const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      const filterRecipes = oldRecipes.filter((actualRecipe) => actualRecipe.id !== id);

      const newRecipes = [...filterRecipes];

      localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    } if (favoriteFood !== true) {
      if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
        const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

        const newRecipes = [...oldRecipes, favoriteRecipe];

        localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
      }
    }

    return !favoriteFood ? setFavoriteFood(true) : setFavoriteFood(false);
  };

  const handleClick = (e) => {
    e.preventDefault();

    history.push(`/comidas/${id}/in-progress`);
  };

  const createRecipe = () => {
    if (acctualyFood) {
      const {
        strMeal,
        strCategory,
        strInstructions,
        strYoutube,
        strMealThumb,
      } = acctualyFood.meals[0];

      const foodRendering = acctualyFood.meals[0];

      const ingredients = [
        `${foodRendering.strIngredient1} ${foodRendering.strMeasure1}`,
        `${foodRendering.strIngredient2} ${foodRendering.strMeasure2}`,
        `${foodRendering.strIngredient3} ${foodRendering.strMeasure3}`,
        `${foodRendering.strIngredient4} ${foodRendering.strMeasure4}`,
        `${foodRendering.strIngredient5} ${foodRendering.strMeasure5}`,
        `${foodRendering.strIngredient6} ${foodRendering.strMeasure6}`,
        `${foodRendering.strIngredient7} ${foodRendering.strMeasure7}`,
        `${foodRendering.strIngredient8} ${foodRendering.strMeasure8}`,
        `${foodRendering.strIngredient9} ${foodRendering.strMeasure9}`,
        `${foodRendering.strIngredient10} ${foodRendering.strMeasure10}`,
        `${foodRendering.strIngredient11} ${foodRendering.strMeasure11}`,
        `${foodRendering.strIngredient12} ${foodRendering.strMeasure12}`,
        `${foodRendering.strIngredient13} ${foodRendering.strMeasure13}`,
      ];

      const linkLength = 32;
      const youtubeLink = strYoutube.substr(linkLength);

      return (
        <div className="recipe-container">
          <Header title="Detalhes da Camida" />
          <img
            alt="Produto"
            className="img-details-main"
            data-testid="recipe-photo"
            src={ strMealThumb }
          />
          <div className="infos-buttons-container">
            <div className="infos-container">
              <h2 data-testid="recipe-title">{ strMeal }</h2>
              <p data-testid="recipe-category">{ strCategory }</p>
            </div>

            <div className="buttons-container">
              <button type="button" data-testid="share-btn" onClick={ shareClick }>
                <img alt="Share link" src={ shareIcon } />
              </button>
              <button type="button" onClick={ favoriteClick }>
                <img
                  alt="Favorite button"
                  data-testid="favorite-btn"
                  src={ !favoriteFood ? whiteHeartIcon : blackHeartIcon }
                />
              </button>
            </div>
          </div>

          {!clipboardStatus ? null : (<h5 className="margin-link">Link copiado!</h5>)}

          <ul className="list-container py-3">
            <h3 className="text-center pb-3">Ingredients</h3>
            { ingredients.map((ingredient, index) => {
              if (ingredient !== null && ingredient !== ' ' && ingredient !== '  ') {
                return (
                  <li
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `- ${ingredient}` }
                  </li>);
              }
              return null;
            })}
          </ul>

          <div className="instruction-container py-3 mt-3">
            <h3 className="text-center pb-3">Instructions</h3>
            <p data-testid="instructions">{ strInstructions }</p>
          </div>

          <div className="video-container pt-3">
            <iframe data-testid="video" width="320" height="240" src={ `https://www.youtube.com/embed/${youtubeLink}` } title="YouTube video player" frameBorder="0" />
          </div>

          <h3 className="py-4">Receitas Recomendadas:</h3>

          <div className="recomendation-container">
            { foodRecomendation.map((food, index) => {
              const cardLength = 5;
              if (index <= cardLength) {
                return (
                  <RecomendacoesCard
                    key={ index }
                    props={ food }
                    type="meal"
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
            { statusFood === true ? 'Continuar Receita' : 'Iniciar Receita' }
            {/* foodRecipeStatus === 'start' ? 'Start recipe' : 'Continuar Receita'  */}
          </Button>
        </div>
      );
    }
    return null;
  };

  return createRecipe();
}

export default ReceitaComidaDetalhe;
