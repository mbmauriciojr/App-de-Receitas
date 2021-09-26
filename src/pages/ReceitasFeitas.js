import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReceitasFeitasCard from '../components/ReceitasFeitasCard';
import { containerBtns, btns } from '../styles/ReceitasFeitas';

function ReceitasFeitas() {
  const [acctualyRecipes, setAcctualyRecipes] = useState();
  const [doneRecipes, setDoneRecipes] = useState();

  useEffect(() => {
    const verifyDoneRecipes = () => {
      if (JSON.parse(localStorage.getItem('doneRecipes') !== null)) {
        const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

        if (recipes) {
          setDoneRecipes(recipes);
          setAcctualyRecipes(recipes);
        }
      }
    };
    verifyDoneRecipes();
  }, []);

  const createRecipeList = () => (
    doneRecipes
      .map((recipe, index) => {
        const props = {
          recipe,
          index,
        };

        return <ReceitasFeitasCard key={ index } props={ props } />;
      })
  );

  return (
    <div>
      <Header title="Receitas Feitas" />

      <div className={ containerBtns }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className={ btns }
          onClick={ (e) => {
            e.preventDefault();
            setDoneRecipes(acctualyRecipes);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className={ btns }
          onClick={ (e) => {
            e.preventDefault();
            setDoneRecipes(acctualyRecipes
              .filter((recipe) => recipe.type === 'comida'));
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className={ btns }
          onClick={ (e) => {
            e.preventDefault();
            setDoneRecipes(acctualyRecipes
              .filter((recipe) => recipe.type === 'bebida'));
          } }
        >
          Drinks
        </button>
      </div>

      { doneRecipes ? createRecipeList() : (
        <span className="d-flex justify-content-center mt-5">
          Nenhuma receita finalizada
        </span>
      ) }
    </div>
  );
}

export default ReceitasFeitas;
