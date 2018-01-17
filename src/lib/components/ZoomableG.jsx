import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3-zoom';
import { select } from 'd3-selection';

import LimitZoomState from '../utilities/zoom/LimitZoomState';
import ZoomLimitsReached from '../utilities/zoom/ZoomLimitsReached';
import GenerateZoomObject from '../utilities/zoom/GenerateZoomObject';
import CalculateZoomTransform from '../utilities/zoom/CalculateZoomTransform';

const epsilon = 0.0001;

function nearlyEquals(a, b) {
  return Math.abs(a - b) < epsilon;
}

function areTransformsEqual(t1, t2) {
  return nearlyEquals(t1.k, t2.k) &&
    nearlyEquals(t1.x, t2.x) &&
    nearlyEquals(t1.y, t2.y);
}

function areZoomStatesEqual(z1, z2) {
  return nearlyEquals(z1.scale, z2.scale) &&
    nearlyEquals(z1.center.x, z2.center.x) &&
    nearlyEquals(z1.center.y, z2.center.y);
}

export default class ZoomableG extends Component {
  constructor(props) {
    super(props);

    this.d3ZoomBehavior = d3.zoom()
      .on('zoom', () => requestAnimationFrame(() => {
        this.fitZoomIntoLimitsAndUpdateState();
      }));

    this.applyProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.applyProps(nextProps);
  }

  componentWillUnmount() {
    this.d3Node = undefined;
  }

  getZoomState(scales) {
    return GenerateZoomObject(
      d3.zoomTransform(this.node).k,
      this.props,
      scales,
    );
  }

  getCurrentZoomTransform() {
    // General case
    if (this.node) {
      return d3.zoomTransform(this.node);
    }
    // First render case, no node ref yet. Use default or provided zoomState
    // to calculate zoomed scales.
    return CalculateZoomTransform(this.props);
  }

  applyZoomState(props) {
    if (!this.d3Node) {
      return;
    }
    const newTransform = CalculateZoomTransform(props);
    const currentTransform = d3.zoomTransform(this.node);

    if (!areTransformsEqual(currentTransform, newTransform)) {
      this.d3ZoomBehavior
        .transform(
          this.d3Node,
          newTransform,
        );
    }
  }

  fitZoomIntoLimitsAndUpdateState() {
    const scales = this.buildScales();
    let zoomState;
    if (ZoomLimitsReached(scales, this.props.limits)) {
      LimitZoomState(scales, this.props.limits);
      zoomState = this.getZoomState(scales);
      this.applyZoomState({
        ...this.props,
        zoomState,
      });
    } else {
      zoomState = this.getZoomState(scales);
    }
    if (!areZoomStatesEqual(zoomState, this.props.zoomState)) {
      this.props.onZoomStateChange(zoomState);
    }
  }

  applyProps(props) {
    const { minScaleFactor, maxScaleFactor } = props;

    this.d3ZoomBehavior
      .scaleExtent([minScaleFactor, maxScaleFactor]);

    this.applyZoomState(props);
  }

  ref = (node) => {
    this.node = node;
    if (node) {
      this.d3Node = select(node);
      this.d3Node.call(this.d3ZoomBehavior);
      this.applyZoomState(this.props);
    }
  };

  buildScales() {
    const { xScale, yScale } = this.props;

    const zoomTransform = this.getCurrentZoomTransform();

    return {
      xScale: zoomTransform.rescaleX(xScale),
      yScale: zoomTransform.rescaleY(yScale),
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
  minScaleFactor: PropTypes.number,
  maxScaleFactor: PropTypes.number,
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

  minScaleFactor: 1,
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
