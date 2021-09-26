/* eslint-disable react-hooks/exhaustive-deps */
import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import EmProgresso from '../components/EmProgesso';

function BebidasAtiva({ match: { params: { id } } }) {
  const [cocktail, setCocktail] = useState([]);

  const fetchApi = async () => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const { drinks } = await (await fetch(endPoint)).json();
    setCocktail(drinks);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <EmProgresso props={ cocktail } />
    </div>
  );
}

BebidasAtiva.propTypes = {
  match: object,
}.isRequired;

export default BebidasAtiva;
