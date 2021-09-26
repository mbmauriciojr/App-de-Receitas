import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { apiMealsIngredients } from '../services/fetchApisIngredients';
import ContextComidas from '../provider/ContextComida';
import Loading from '../components/Loading';

function ExplorarComidasING() {
  const [data, setData] = useState([]);
  const { setIngradient } = useContext(ContextComidas);

  const miliseconds = 2000;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiMealsIngredients();
      setTimeout(() => setData(response), miliseconds);
    };
    fetchApi();
  }, []);

  const handleClick = ({ currentTarget }) => {
    const xablau = currentTarget.lastChild.textContent.replace(' ', '_');
    setIngradient(xablau);
  };

  const ingredients = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to="/comidas" key={ index }>
          <Card
            key={ item.idIngredient }
            style={ { width: '10rem' } }
            data-testid={ `${index}-ingredient-card` }
            className="shadow m-1 rounded"
            onClick={ handleClick }
          >
            <Card.Img
              variant="top"
              data-testid={ `${index}-card-img` }
              alt={ item.strIngredient }
              src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
            />
            <Card.Body>
              <Card.Title className="card-link" data-testid={ `${index}-card-name` }>
                { item.strIngredient }
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
        <Loading param="food" />
      </div>
    );
  }
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="pb-5">
        <div className="d-flex flex-wrap mx-auto justify-content-center pb-4 pt-2">
          {ingredients()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidasING;
