import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import ClipG from './ClipG';
import MarginG from './MarginG';
import FillParentSvg from './FillParentSvg';
import BasicAxes from './BasicAxes';

import UniqueId from '../utilities/common/UniqueId';

export default class BasicChart extends Component {
  constructor(props) {
    super(props);
    this.id = props.id.length === 0 ? UniqueId() : props.id;
  }

  render() {
    const {
      margin, xDomain, yDomain, xPadding, yPadding, children,
    } = this.props;

    return (
      <FillParentSvg>{({ width, height }) => {
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const chartId = this.id;
        const xScale = scaleLinear()
          .domain(xDomain)
          .range([0, innerWidth]);
        const yScale = scaleLinear()
          .domain(yDomain)
          .range([innerHeight, 0]);

        const renderContext = {
          chartId,
          xScale,
          yScale,
          innerWidth,
          innerHeight,
        };
        return (
          <MarginG left={margin.left} top={margin.top}>
            <BasicAxes
              xScale={xScale}
              yScale={yScale}
              xPadding={xPadding}
              yPadding={yPadding}
              width={innerWidth}
              height={innerHeight}
            />
            <ClipG id={`${chartId}.clip`} width={innerWidth} height={innerHeight}>
              {children(renderContext)}
            </ClipG>
          </MarginG>
        );
      }}</FillParentSvg>
    );
  }
}

BasicChart.defaultProps = {
  children: () => {},

  id: '',
  xDomain: [0, 72],
  yDomain: [0, 31],
  xPadding: 3,
  yPadding: 10,
  margin: {
    left: 30,
    right: 15,
    top: 10,
    bottom: 40,
  },
};

BasicChart.propTypes = {
  children: PropTypes.func,

  id: PropTypes.string,
  xDomain: PropTypes.arrayOf(PropTypes.number),
  yDomain: PropTypes.arrayOf(PropTypes.number),
  xPadding: PropTypes.number,
  yPadding: PropTypes.number,
  margin: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
};
