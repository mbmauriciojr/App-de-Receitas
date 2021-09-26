import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import ContextBebidas from '../provider/ContextBebida';
import ContextComidas from '../provider/ContextComida';
import Loading from './Loading';

import '../styles/Cards.css';

function Cards({ param }) {
  const { data: dataDrink } = useContext(ContextBebidas);
  const { data: datafood } = useContext(ContextComidas);

  const LOCATION = useHistory();

  const comidas = () => datafood && datafood.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to={ `/${param}/${item.idMeal}` } key={ index }>
          <Card
            key={ item.idMeal }
            data-testid={ `${index}-recipe-card` }
            className="shadow m-1 rounded"
          >
            <Card.Img
              variant="top"
              src={ item.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ item.strMeal }
            />
            <Card.Body>
              <Card.Title className="card-link" data-testid={ `${index}-card-name` }>
                { item.strMeal }
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    }
    return '';
  });

  const bebidas = () => dataDrink && dataDrink.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to={ `/${param}/${item.idDrink}` } key={ index }>
          <Card
            key={ item.idDrink }
            data-testid={ `${index}-recipe-card` }
            className="shadow m-1 rounded"
          >
            <Card.Img
              variant="top"
              src={ item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ item.srtDrink }
            />
            <Card.Body>
              <Card.Title className="card-link" data-testid={ `${index}-card-name` }>
                { item.strDrink }
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    }
    return '';
  });

  if (dataDrink === undefined || datafood === undefined) {
    return LOCATION.location.pathname === '/comidas'
      ? <Loading param="food" />
      : <Loading param="drink" />;
  }

  return (
    param === 'bebidas' ? bebidas() : comidas()
  );
}

export default Cards;
