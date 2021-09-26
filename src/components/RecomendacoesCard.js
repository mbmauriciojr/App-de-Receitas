import React from 'react';
import PropTypes from 'prop-types';

function RecomendacoesCard({ props, type, index }) {
  const renderRecipeByType = () => {
    if (type === 'meal') {
      return (
        <div data-testid={ `${index}-recomendation-card` } className="card-recomendation">
          <img
            className="recomendation-card-img"
            alt="Recomendações"
            src={ props.strDrinkThumb }
          />

          <h4 data-testid={ `${index}-recomendation-title` }>{ props.strDrink }</h4>
        </div>
      );
    } if (type === 'drink') {
      return (
        <div data-testid={ `${index}-recomendation-card` } className="card-recomendation">
          <img
            className="recomendation-card-img"
            alt="Recomendações"
            src={ props.strMealThumb }
          />

          <h4 data-testid={ `${index}-recomendation-title` }>{ props.strMeal }</h4>
        </div>
      );
    }
  };

  return (
    <div>
      { renderRecipeByType() }
    </div>
  );
}

RecomendacoesCard.propTypes = {
  props: PropTypes.object,
  type: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default RecomendacoesCard;
