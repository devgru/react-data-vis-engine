import React from 'react';
import PropTypes from 'prop-types';

function ClipG({ id, width, height, children }) {
  return (
    <g>
      <defs>
        <clipPath id={`${id}.clip`}>
          <rect width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}.clip)`}>
        {children}
      </g>
    </g>
  );
}

ClipG.propTypes = {
  children: PropTypes.node,

  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

ClipG.defaultProps = {
  children: null,
};

export default ClipG;
