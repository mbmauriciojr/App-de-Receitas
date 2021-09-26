/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

import ContextComidas from '../provider/ContextComida';
import { getAreas, getFoodsByArea } from '../services/apisArea';
import { mealsAPI } from '../services/apisMealsAndCocktails';

import '../styles/explorarOrigem.css';
import Loading from '../components/Loading';

function ExplorarComidasArea() {
  const [areas, setAreas] = useState('');
  const [acctualyFood, setAcctualyFood] = useState([]);
  const [filterArea, setFilterArea] = useState('All');

  const { data, setData } = useContext(ContextComidas);

  const fetchapi = async () => {
    const comidas = await mealsAPI();
    setData(comidas);
  };

  useEffect(() => {
    setData([]);
    async function fetchAreas() {
      const areasFetched = await getAreas();

      setAreas(areasFetched);
    }

    fetchapi();
    fetchAreas();
  }, []);

  useEffect(() => {
    if (filterArea !== 'All') {
      const fetchByArea = async (area) => {
        const filterFoods = await getFoodsByArea(area);

        setAcctualyFood(filterFoods.meals);
      };

      fetchByArea(filterArea);
    } else {
      setAcctualyFood(data);
    }
  }, [filterArea, data]);

  const handleChange = (event) => {
    const { target: { value } } = event;

    setFilterArea(value);
  };

  const areasCard = () => {
    if (filterArea !== undefined) {
      return acctualyFood.map((item, index) => {
        const magicNumber = 12;
        if (index < magicNumber) {
          return (
            <Link to={ `/comidas/${item.idMeal}` } key={ index }>
              <Card
                key={ item.strArea }
                style={ { width: '8rem' } }
                data-testid={ `${index}-recipe-card` }
                className="shadow rounded m-1"
              >
                <Card.Img
                  variant="top"
                  data-testid={ `${index}-card-img` }
                  alt={ item.strMeal }
                  src={ item.strMealThumb }
                />
                <Card.Body>
                  <Card.Title data-testid={ `${index}-card-name` }>
                    { item.strMeal }
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          );
        }
        return null;
      });
    }
  };

  if (data.length < 1) return <Loading param="food" />;

  return (
    <div>
      <Header title="Explorar Origem" />
      <main className="explorar-origem-container">
        <select
          data-testid="explore-by-area-dropdown"
          className="d-flex mx-auto w-75 border-0 rounded p-2 my-2 bg-danger text-light"
          onChange={ handleChange }
        >
          <option
            key="All"
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          { areas !== '' && areas !== undefined && areas.meals !== undefined
            ? areas.meals
              .map(
                (area, index) => (
                  <option
                    key={ index }
                    value={ area.strArea }
                    data-testid={ `${area.strArea}-option` }
                  >
                    { area.strArea }
                  </option>
                ),
              )
            : null }
        </select>
        <div
          style={ { paddingBottom: '60px' } }
          className="filter-cards-area d-flex flex-wrap justify-content-center"
        >
          { acctualyFood !== [] && areas !== undefined && areas.meals !== undefined
            ? areasCard() : null }
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ExplorarComidasArea;
