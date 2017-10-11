import React from 'react';
import PropTypes from 'prop-types';
import Axis from 'react-d3-components/lib/Axis';

const borderStyle = { fill: 'none', pointerEvents: 'none' };

function BasicAxes({ xScale, yScale, width, height, xPadding, yPadding }) {
  return (
    <g>
      <Axis
        scale={xScale}
        width={width} height={height}
        outerTickSize={0} innerTickSize={-height}
        orientation="bottom"
        tickPadding={yPadding}
      />
      <Axis
        scale={yScale}
        width={width} height={height}
        outerTickSize={0} innerTickSize={-width}
        orientation="left"
        tickPadding={xPadding}
      />
      <rect
        className="graph-borders"
        style={borderStyle}
        width={width} height={height}
      />
    </g>
  );
}

BasicAxes.propTypes = {
  xScale: PropTypes.instanceOf(Function).isRequired,
  yScale: PropTypes.instanceOf(Function).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xPadding: PropTypes.number.isRequired,
  yPadding: PropTypes.number.isRequired,
};

export default BasicAxes;
