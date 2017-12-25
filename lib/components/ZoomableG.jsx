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

    this.d3Zoom = d3.zoom()
      .on('zoom', () => requestAnimationFrame(() => {
        this.fitZoomIntoLimitsAndUpdateState();
        this.forceUpdate();
      }));

    this.applyProps(props);
  }

  ref = (node) => {
    this.node = node;
    if (node) {
      this.d3Node = select(node);
      this.d3Node.call(this.d3Zoom);
      this.applyZoomState(this.props.zoomState)
    }
  };

  componentWillReceiveProps(nextProps) {
    this.applyProps(nextProps);
  }

  applyProps(props) {
    const { minScaleFactor, maxScaleFactor, zoomState } = props;

    this.d3Zoom
      .scaleExtent([minScaleFactor, maxScaleFactor]);

    this.applyZoomState(zoomState);
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
    if (this.d3Node) {
      const [x, y] = GenerateZoomTranslate(this.props, zoomState);
      const newTransform = d3.zoomIdentity
        .translate(x, y)
        .scale(zoomState.scale);

      const transform = d3.zoomTransform(this.node);
      if (!areTransformsEqual(transform, newTransform)) {
        this.d3Zoom
          .transform(
            this.d3Node,
            newTransform,
          );
      }
    }
  }

  buildScales() {
    const { xScale, yScale } = this.props;

    let t;
    if (this.node) {
      t = d3.zoomTransform(this.node);
    } else {
      // First render case, no node ref yet. Use default or provided zoomState
      // to calculate zoomed scales.
      const { zoomState } = this.props;
      const [x, y] = GenerateZoomTranslate(this.props, zoomState);
      t = d3.zoomIdentity
        .translate(x, y)
        .scale(zoomState.scale);
    }

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
