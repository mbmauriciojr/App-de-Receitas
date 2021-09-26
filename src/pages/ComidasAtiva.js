/* eslint-disable react-hooks/exhaustive-deps */
import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import EmProgresso from '../components/EmProgesso';

function ComidasAtiva({ match: { params: { id } } }) {
  const [food, setFood] = useState([]);

  const fetchApi = async () => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const { meals } = await (await fetch(endPoint)).json();
    setFood(meals);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <EmProgresso props={ food } />
    </div>
  );
}

ComidasAtiva.propTypes = {
  match: object,
}.isRequired;

export default ComidasAtiva;
