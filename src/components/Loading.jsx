import { object } from 'prop-types';
import React from 'react';
import '../styles/header';

function Loading({ param }) {
  const food = 'https://media.giphy.com/media/tPTVkWRtOmyZ2adIXv/giphy.gif';
  const drink = 'https://media.giphy.com/media/ii1w1D92hp4FUfAAZg/giphy.gif';

  return (
    <div className="loading">
      <img
        className={ param === 'food'
          ? 'd-flex w-50 mx-auto pl-4'
          : 'd-flex w-50 mx-auto' }
        src={ param === 'food' ? food : drink }
        alt="loading-gif"
      />
    </div>
  );
}

Loading.propTypes = {
  param: object,
}.isRequired;

export default Loading;
