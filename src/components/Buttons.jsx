import React from 'react';
import { object } from 'prop-types';

// este component button precisa receber obrigatoriamente 3 parametros (tex, dataTestid, funcHandleClick)
function Buttons({ params }) {
  const { text, dataTestid, funcHandleClick } = params;

  return (
    <button
      type="button"
      className="btn btn-success m-3 border border-success shadow p-3"
      data-testid={ dataTestid }
      onClick={ funcHandleClick }
      value={ text }
    >
      {text}
    </button>
  );
}

Buttons.propTypes = {
  params: object,
}.isRequired;

export default Buttons;
