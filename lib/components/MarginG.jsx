import React from 'react';
import PropTypes from 'prop-types';

function MarginG({ left, top, children }) {
  return (
    <g transform={`translate(${left},${top})`}>
      {children}
    </g>
  );
}

MarginG.propTypes = {
  children: PropTypes.node,

  left: PropTypes.number,
  top: PropTypes.number,
};

MarginG.defaultProps = {
  children: null,

  left: 0,
  top: 0,
};

export default MarginG;
