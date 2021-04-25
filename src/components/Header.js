import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header>
      <h1 style={headingStyle}>{title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: 'Default title',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const headingStyle = {
  color: 'navy',
};

export default Header;
