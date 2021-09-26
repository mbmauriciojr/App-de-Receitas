import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReceitaBebidaDetalhe from '../components/ReceitaBebidaDetalhe';

import { getDrinkByID } from '../services/fetchApiDetailsRecipe';
import { getFoodRecomendation } from '../services/fetchApiRecomendations';
import Loading from '../components/Loading';

function DetalhesBebida({ match: { params: { id } } }) {
  const [acctualyDrink, setAcctualyDrink] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [drinkRecomendation, setDrinkRecomendation] = useState();

  useEffect(() => {
    async function fetchDrink() {
      setIsLoading(true);
      const drink = await getDrinkByID(id);
      const recomendations = await getFoodRecomendation();

      setDrinkRecomendation(recomendations.meals);
      setAcctualyDrink(drink);
      setIsLoading(false);
    }

    fetchDrink();
  }, [id]);

  const propsToSend = {
    acctualyDrink,
    drinkRecomendation,
    id,
  };

  return !isLoading
    ? <ReceitaBebidaDetalhe props={ propsToSend } />
    : (
      <div className="d-flex w-100 min-vh-100 align-items-center">
        <Loading param="drink" />
      </div>
    );
}

DetalhesBebida.propTypes = {
  props: object,
}.isRequired;

export default DetalhesBebida;
