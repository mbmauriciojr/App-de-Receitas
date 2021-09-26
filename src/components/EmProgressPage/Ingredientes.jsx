/* eslint-disable react-hooks/exhaustive-deps */
import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './InProgressPage.css';

function Ingredientes({ params: { ingredientsList, data, setIsDisabled } }) {
  const [ingArray, setIngArray] = useState([]);
  const [LSG, setLSG] = useState([]);

  const LOCATION = useLocation();
  let checkboxElement = false;

  const updateLocalStorage = () => {
    const initalLocalStorage = {
      cocktails: [],
      meals: [],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(initalLocalStorage));
  };

  const getLocalStorage = () => {
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    const { cocktails, meals } = progressRecipes;

    if ((cocktails.length || meals.length) !== 0) {
      const elementsTag = document.querySelector('.py-2').nextSibling.childNodes;
      let valuesMeals;
      let valuesCocktails;

      elementsTag.forEach((elementTag, index) => {
        switch (LOCATION.pathname) {
        case `/comidas/${data.idMeal}/in-progress`:
          valuesMeals = Object.values(meals);
          valuesMeals[0].forEach((valueMeal) => {
            if (index === valueMeal) {
              elementsTag[index].firstChild.className = 'isCheckedCss';
            }
          });
          break;
        case `/bebidas/${data.idDrink}/in-progress`:
          valuesCocktails = Object.values(cocktails);
          valuesCocktails[0].forEach((valueCocktail) => {
            if (index === valueCocktail) {
              elementsTag[index].firstChild.className = 'isCheckedCss';
            }
          });
          break;
        default:
          break;
        }
      });
    }
  };

  const setLocalStorage = (target) => {
    const foodsOrCocktails = Object.keys(data)
      .find((item) => item === 'idDrink' || item === 'idMeal');

    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (progressRecipes !== null) {
      if (foodsOrCocktails === 'idMeal') {
        const newObj = { meals: {
          [data.idMeal]: [...ingArray, Number(target.id)],
        } };

        const oldObject = newObj;

        return localStorage
          .setItem(
            'inProgressRecipes', JSON
              .stringify({ ...progressRecipes, ...oldObject }),
          );
      }
      const newObj = { cocktails: {
        [data.idDrink]: [...ingArray, Number(target.id)],
      } };

      const oldObject = newObj;

      return localStorage
        .setItem(
          'inProgressRecipes', JSON
            .stringify({ ...progressRecipes, ...oldObject }),
        );
    }
  };

  const btnCheck = () => {
    const elementsTag = document.querySelector('.ingredientes').childNodes;
    let btnDisabled = 0;
    elementsTag.forEach((item) => {
      const test = item.firstChild.className;
      if (test.includes('isCheckedCss')) {
        btnDisabled += 1;
      }
      if (btnDisabled === elementsTag.length) {
        setIsDisabled(false);
      }
    });
  };

  // refatorar tudo nesse component

  const isCheckedBool = ({ target }) => {
    const { checked } = target;
    if (checked) {
      setIngArray([...ingArray, Number(target.id)]);
      target.parentNode.className = 'isCheckedCss';
      const isClass = target.parentNode.className;
      setLocalStorage(target);
      return isClass;
    }
    target.parentNode.className = '';
    const notClass = target.parentNode.className;
    return notClass;
  };

  useEffect(() => {
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (progressRecipes === null) return updateLocalStorage();
    setLSG(progressRecipes);
    console.log(LSG);

    getLocalStorage();
  }, []);

  useEffect(() => {
    btnCheck();
  });

  const checkedElement = (index) => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes')).meals[data.idMeal]) {
      checkboxElement = JSON.parse(localStorage.getItem('inProgressRecipes'))
        .meals[data.idMeal].includes(index);
      return checkboxElement;
    }
    if (JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[data.idDrink]) {
      checkboxElement = JSON.parse(localStorage.getItem('inProgressRecipes'))
        .cocktails[data.idDrink].includes(index);
      return checkboxElement;
    }
  };

  return (
    <div className="ingredientes">
      {ingredientsList.map((ingredient, index) => {
        checkedElement(index);
        return (
          <div
            key={ index }
            className="d-flex align-items-baseline ingrediente-list"
            data-testid={ `${index}-ingredient-step` }
          >
            <label
              htmlFor={ index }
            >
              <input
                className="mr-2"
                type="checkbox"
                name={ ingredient[1] }
                id={ index }
                onClick={ isCheckedBool }
                checked={ checkboxElement }
              />
              {`Ingrediente ${index}: ${ingredient[1]}`}
            </label>
          </div>
        );
      })}
    </div>
  );
}

Ingredientes.propTypes = {
  params: object,
}.isRequired;

export default Ingredientes;
