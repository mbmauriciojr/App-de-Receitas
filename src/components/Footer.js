import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-links">
      <Link to="/bebidas">
        <img
          alt="Drinks"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          className="footer-icons-color"
        />
      </Link>
      <Link to="/explorar">
        <img
          alt="Explorar"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
          className="footer-icons-color"
        />
      </Link>
      <Link to="/comidas">
        <img
          alt="Comidas"
          src={ mealIcon }
          data-testid="food-bottom-btn"
          className="footer-icons-color"
        />
      </Link>
    </footer>
  );
}

export default Footer;
