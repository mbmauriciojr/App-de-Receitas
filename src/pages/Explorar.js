import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/explorar.css';

function Explorar() {
  const history = useHistory();

  function moveToExploreFoodPage() {
    history.push('/explorar/comidas');
  }
  function moveToExploreDrinkPage() {
    history.push('/explorar/bebidas');
  }
  function moveToExploreAreaPage() {
    history.push('/explorar/comidas/area');
  }
  return (
    <div>
      <Header title="Explorar" />
      <div className="explorar-buttons">
        <button
          type="button"
          data-testid="explore-food"
          onClick={ moveToExploreFoodPage }
        >
          Explorar Comidas

        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ moveToExploreDrinkPage }
        >
          Explorar Bebidas

        </button>
        <button
          type="button"
          data-testid="explore-area"
          onClick={ moveToExploreAreaPage }
        >
          Explorar Areas

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
