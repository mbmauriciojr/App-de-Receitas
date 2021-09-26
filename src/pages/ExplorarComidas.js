import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/explorar.css';

function ExplorarComidas() {
  const history = useHistory();

  function moveToExploreFoodByIng() {
    history.push('/explorar/comidas/ingredientes');
  }

  function moveToExploreFoodByArea() {
    history.push('/explorar/comidas/area');
  }

  async function moveToSurpriseRecipe() {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await fetchApi.json();
    const id = data.meals.map((meal) => meal.idMeal);
    history.push(`/comidas/${id}`);
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="explorar-buttons">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ moveToExploreFoodByIng }
        >
          Por Ingredientes

        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ moveToExploreFoodByArea }
        >
          Por Local de Origem

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

export default ExplorarComidas;
