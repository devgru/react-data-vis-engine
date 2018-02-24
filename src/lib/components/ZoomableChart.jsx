import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import ClipG from './ClipG';
import MarginG from './MarginG';
import FillParentSvg from './FillParentSvg';
import BasicAxes from './BasicAxes';
import ZoomableG from './ZoomableG';

import UniqueId from '../utilities/common/UniqueId';

const backStyle = {
  fill: 'none',
  pointerEvents: 'all',
};

export default class ZoomableChart extends Component {
  constructor(props) {
    super(props);
    this.id = props.id.length === 0 ? UniqueId() : props.id;
  }

  render() {
    const {
      margin,
      xDomain, yDomain,
      xPadding, yPadding,
      limits,
      zoomState,
      minScaleFactor,
      maxScaleFactor,
      onZoomStateChange,
      children,
    } = this.props;

    const zoomableGProps = {
      limits,
      zoomState,
      minScaleFactor,
      maxScaleFactor,
      onZoomStateChange,
    };

    return (
      <FillParentSvg>{({ width, height }) => {
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const chartId = this.id;

        const rawXScale = scaleLinear()
          .domain(xDomain)
          .range([0, innerWidth]);
        const rawYScale = scaleLinear()
          .domain(yDomain)
          .range([innerHeight, 0]);

        return (
          <MarginG left={margin.left} top={margin.top}>
            <ZoomableG
              xScale={rawXScale}
              yScale={rawYScale}
              {...zoomableGProps}
            >
              {({ xScale, yScale, mouseHandlerRef }) => {
                const visContext = {
                  chartId,
                  width,
                  height,
                  xScale,
                  yScale,
                  innerWidth,
                  innerHeight,
                };

                const renderedChildren = children(visContext);
                let chart;
                let back;
                let front;
                if (renderedChildren && renderedChildren.chart) {
                  ({ back, chart, front } = renderedChildren);
                } else {
                  chart = renderedChildren;
                }

                return (
                  <g>
                    {back}
                    <BasicAxes
                      xScale={xScale}
                      yScale={yScale}
                      xPadding={xPadding}
                      yPadding={yPadding}
                      width={innerWidth}
                      height={innerHeight}
                    />
                    <ClipG id={`${chartId}.clip`} width={innerWidth} height={innerHeight}>
                      <g ref={mouseHandlerRef}>
                        <rect width={innerWidth} height={innerHeight} style={backStyle} />
                        {chart}
                      </g>
                    </ClipG>
                    {front}
                  </g>
                );
              }}
            </ZoomableG>
          </MarginG>
        );
      }}</FillParentSvg>
    );
  }
}

ZoomableChart.defaultProps = {
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

  limits: undefined,
  zoomState: undefined,
  minScaleFactor: undefined,
  maxScaleFactor: undefined,
  onZoomStateChange: undefined,
};

ZoomableChart.propTypes = {
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

  limits: PropTypes.shape({
    top: PropTypes.bool,
    right: PropTypes.bool,
    bottom: PropTypes.bool,
    left: PropTypes.bool,
  }),
  zoomState: PropTypes.shape({
    center: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    scale: PropTypes.number,
  }),
  minScaleFactor: PropTypes.number,
  maxScaleFactor: PropTypes.number,
  onZoomStateChange: PropTypes.func,
};
