import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';
import '../styles/ReceitasFavoritas.css';

const copy = require('clipboard-copy');

function ReceitasFavoritasCard({ props: { recipe, index } }) {
  const [clipboardStatus, setClipboardStatus] = useState();

  const {
    area,
    category,
    id, name,
    image,
    type,
    doneDate = '',
    tags,
    alcoholicOrNot,
  } = recipe;

  const shareClick = (e) => {
    e.preventDefault();

    if (type === 'comida') {
      copy(`http://localhost:3000/comidas/${id}`);
    } else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }
    setClipboardStatus('copied');
  };

  const createButtons = () => {
    console.log('recipe');
    return (
      <div className="button-container">
        <button
          type="button"
          onClick={ shareClick }
        >
          <img
            alt="Share link"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
      </div>
    );
  };

  const foodSpecs = () => (
    <span
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${area} - ${category}` }
    </span>
  );

  const crateTags = () => {
    if (tags !== '') {
      return (
        tags.map((tag) => (
          <p
            className="tags"
            key={ index }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }

          </p>
        ))
      );
    }
  };

  return (
    <div>
      <main className="doneRecipes-container ">
        <div className="doneRecipes-image">
          <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
            <img
              alt="Receita Favoritada"
              src={ image }
              // className="img-card-favorite"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>

        <div className="doneRecipes-infos">
          { foodSpecs() }

          {alcoholicOrNot !== ''
            ? (
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { alcoholicOrNot }
              </span>
            )
            : null}

          <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
          </Link>

          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

          <div className="tags-recipes">
            { tags.length !== null ? crateTags() : null }
          </div>
          { createButtons() }
          {!clipboardStatus ? null : (<h5>Link copiado!</h5>)}
        </div>

      </main>
    </div>
  );
}

ReceitasFavoritasCard.propTypes = {
  props: PropTypes.object,
}.isRequired;

export default ReceitasFavoritasCard;
