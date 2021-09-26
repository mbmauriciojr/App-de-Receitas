import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiCocktailsIngredients } from '../services/fetchApisIngredients';
import ContextBebidas from '../provider/ContextBebida';
import Loading from '../components/Loading';

function ExplorarBebidasING() {
  const [data, setData] = useState([]);
  const { setIngradient } = useContext(ContextBebidas);

  const miliseconds = 2000;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiCocktailsIngredients();
      setTimeout(() => setData(response), miliseconds);
    };
    fetchApi();
  }, []);

  const handleClick = ({ currentTarget }) => {
    const xablau = currentTarget.lastChild.textContent;
    setIngradient(xablau);
  };

  const ingredients = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to="/bebidas" key={ index }>
          <Card
            key={ item.idIngredient1 }
            style={ { width: '10rem' } }
            data-testid={ `${index}-ingredient-card` }
            className="text-center shadow m-1 rounded"
            onClick={ handleClick }
          >
            <Card.Img
              variant="top"
              data-testid={ `${index}-card-img` }
              alt={ item.strIngredient1 }
              src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
            />
            <Card.Body>
              <Card.Title data-testid={ `${index}-card-name` }>
                { item.strIngredient1 }
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    }
    return null;
  });

  if (data.length < 1) {
    return (
      <div className="d-flex w-100 min-vh-100 align-items-center">
        <Loading param="drink" />
      </div>
    );
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="pb-5">
        <div className="d-flex flex-wrap mx-auto justify-content-center pb-4">
          {ingredients()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidasING;
