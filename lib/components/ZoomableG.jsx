import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3-zoom';
import { select } from 'd3-selection';

import LimitZoomState from '../utilities/zoom/LimitZoomState';
import ZoomLimitsReached from '../utilities/zoom/ZoomLimitsReached';
import GenerateZoomObject from '../utilities/zoom/GenerateZoomObject';
import GenerateZoomTranslate from '../utilities/zoom/GenerateZoomTranslate';

function areTransformsEqual(t1, t2) {
  return t1.k === t2.k &&
    t1.x === t2.x &&
    t1.y === t2.y;
}

function areZoomStatesEqual(z1, z2) {
  return z1.scale === z2.scale &&
    z1.center.x === z2.center.x &&
    z1.center.y === z2.center.y;
}

export default class ZoomableG extends Component {
  constructor(props) {
    super(props);

    const zoom = d3.zoom()
      .on('zoom', () => requestAnimationFrame(() => {
        this.fitZoomIntoLimitsAndUpdateState();
        this.forceUpdate();
      }));

    this.state = { zoom };

    this.ref = (node) => {
      this.node = node;
      if (node) {
        this.d3node = select(node);
        this.d3node.call(this.state.zoom);
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { maxScaleFactor, zoomState } = nextProps;

    this.applyZoomState(zoomState);

    this.state.zoom
      .scaleExtent([1, maxScaleFactor]);
  }

  componentWillUnmount() {
    this.d3node = undefined;
  }

  getZoomState(scales) {
    return GenerateZoomObject(
      d3.zoomTransform(this.node).k,
      this.props,
      scales,
    );
  }

  fitZoomIntoLimitsAndUpdateState() {
    const scales = this.buildScales();
    let zoomState;
    if (ZoomLimitsReached(scales, this.props.limits)) {
      LimitZoomState(scales, this.props.limits);
      zoomState = this.getZoomState(scales);
      this.applyZoomState(zoomState);
    } else {
      zoomState = this.getZoomState(scales);
    }
    if (!areZoomStatesEqual(zoomState, this.props.zoomState)) {
      this.props.onZoomStateChange(zoomState);
    }
  }

  applyZoomState(zoomState) {
    if (this.d3node) {
      const [x, y] = GenerateZoomTranslate(this.props, zoomState);
      const newTransform = d3.zoomIdentity
        .translate(x, y)
        .scale(zoomState.scale);

      const transform = d3.zoomTransform(this.node);
      if (!areTransformsEqual(transform, newTransform)) {
        this.state.zoom
          .transform(
            this.d3node,
            newTransform,
          );
      }
    } else {
      console.warn(
        'ZoomableG: ' +
        'component provides "mouseHandlerRef" callback in renderContext, ' +
        'use it as described in docs/components/ZoomableG.md',
      );
    }
  }

  buildScales() {
    if (!this.node) return this.props;
    const t = d3.zoomTransform(this.node);
    const { xScale, yScale } = this.props;
    return {
      xScale: t.rescaleX(xScale),
      yScale: t.rescaleY(yScale),
    };
  }

  render() {
    const renderContext = {
      mouseHandlerRef: this.ref,
      ...this.buildScales(),
    };
    return <g>{this.props.children(renderContext)}</g>;
  }
}

ZoomableG.propTypes = {
  children: PropTypes.func,

  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  maxScaleFactor: PropTypes.number,
  /* eslint-enable react/no-unused-prop-types */
  limits: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number),
  }),
  zoomState: PropTypes.shape({
    center: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    scale: PropTypes.number,
  }),
  onZoomStateChange: PropTypes.func,
};

ZoomableG.defaultProps = {
  children: null,

  maxScaleFactor: 16,
  limits: {
    x: [-Infinity, Infinity],
    y: [-Infinity, Infinity],
  },
  zoomState: {
    scale: 1,
    center: {
      x: 0.5,
      y: 0.5,
    },
  },
  onZoomStateChange: () => {},
};
