import ClipG from '../lib/components/ClipG';
import ZoomableG from '../lib/components/ZoomableG';

import React from 'react';
import renderer from 'react-test-renderer';
import {scaleLinear} from 'd3-scale';

describe('ZoomableG', () => {
  it('should work with props', () => {
    const rawXScale = scaleLinear()
      .domain([0, 1])
      .range([0, 1]);
    const rawYScale = scaleLinear()
      .domain([0, 1])
      .range([0, 1]);
    const zoomState = {
      scale: 3,
      center: {
        x: 0.1,
        y: 0.1,
      }
    };

    const component = renderer.create(
      <ZoomableG xScale={rawXScale} yScale={rawYScale} zoomState={zoomState}>{
        ({ xScale, yScale }) => (
          <g>
            <text>{xScale.domain()}</text>
            <text>{yScale.domain()}</text>
          </g>
        )
      }</ZoomableG>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});