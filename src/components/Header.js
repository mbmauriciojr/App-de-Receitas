import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBarForm from './SearchBarForm';
import '../styles/Header.css';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);
  const location = useLocation();

  if (location.pathname !== '/comidas'
  && location.pathname !== '/bebidas'
  && location.pathname !== '/explorar/comidas/area') {
    return (
      <div className="header-container">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
            className="svg-color-icon"
          />
        </Link>
        <h1 className="explore-header" data-testid="page-title">{title}</h1>
      </div>
    );
  }

  const searchBarTrue = () => {
    if (searchBar === true || searchBar === false) {
      return <SearchBarForm searchBar={ searchBar } />;
    }
  };

  const handleHeader = () => (
    <>
      <div className="header-container">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
            className="svg-color-icon"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <button
          type="button"
          onClick={ () => setSearchBar(!searchBar) } // troca o valor do state para true ou false.
          aria-controls="collapse"
          aria-expanded={ searchBar }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
            className="svg-color-icon"
          />
        </button>
      </div>
      <Collapse in={ searchBar }>
        <div id="collapse">
          { searchBarTrue() }
        </div>
      </Collapse>
    </>
  );

  return (
    <div>
      { handleHeader() }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
