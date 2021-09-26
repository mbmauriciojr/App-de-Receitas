import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const history = useHistory();

  function moveToExploreDrinkByIng() {
    history.push('/explorar/bebidas/ingredientes');
  }

  async function moveToSurpriseRecipe() {
    const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await fetchApi.json();
    const id = data.drinks.map((drink) => drink.idDrink);
    history.push(`/bebidas/${id}`);
  }

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="explorar-buttons">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ moveToExploreDrinkByIng }
        >
          Por Ingredientes

        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ moveToSurpriseRecipe }
        >
          Me Surpreenda!

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
