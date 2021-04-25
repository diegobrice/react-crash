import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, showAdd }) => {

  const ButtonStyles = {
    backgroundColor: showAdd ? 'red' : 'tomato',
  };

  return (
    <button onClick={onClick} style={ButtonStyles}>
      {showAdd ? 'Cerrar' : 'Añadir'}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
