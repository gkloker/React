import React from "react";
import PropTypes from 'prop-types';

const Header = ({tittle}) => {
  return (
    <nav className="nav-wrapper light-blue darken-3">
      <a href="#!" className="brand-logo center">{tittle}</a>
    </nav>
  );
}

Header.proptType = {
  title: PropTypes.string.isRequired
}

export default Header;