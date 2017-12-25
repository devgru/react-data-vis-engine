import React, { Component } from 'react';
import { line } from 'd3-shape';

import { components, utilities } from 'react-chart-engine';
const { ZoomableChart } = components;
const { CalculateExtents } = utilities;

export default class ZoomableChartDemo extends Component {
  constructor(props) {
    super(props);

    // In real app you receive data as props.
    // Here we store them in an array:
    this.data = [
      { id: 0, x: -5, y: 4 },
      { id: 1, x: 5, y: 10 },
      { id: 2, x: 9, y: 22 },
      { id: 3, x: 10, y: 6 },
      { id: 4, x: 15, y: 12 },
    ];

    // Let's restore previously saved zoomState
    this.zoomState = {
      center: {
        x: 0.5,
        y: 0.5,
      },
      scale: 3,
    };
  }

  render() {
    const { data, zoomState } = this;

    // Chart knows its size and passed it to scales.
    // To configure scales we need to know input data domain.
    //
    // Simplest way to calculate them is:
    // import { extent } form 'd3-array';
    // const x = extent(data.map((d) => d.x));
    // const y = extent(data.map((d) => d.y));

    // However, sometimes we need some paddings (like 10-15% of domain size).
    // There is utility for this, CalculateExtents:
    const { x, y } = CalculateExtents(data, 0.1);
    // Please mind that this utility receives array of objects with x and y fields,
    // returning one object with x and y fields.
    // In this example data is structured like this already, but in real app
    // you'll have to transform your data.

    const limits = {
      x: [-Infinity, Infinity],
      y: [-Infinity, Infinity],
    };

    const onZoomStateChange = (newZoomState) => {
      console.log('Zoomed', newZoomState);
      this.zoomState = newZoomState;
    };

    return (
      <ZoomableChart
        xDomain={x}
        yDomain={y}
        minScaleFactor={0.5}
        maxScaleFactor={4}
        limits={limits}
        zoomState={zoomState}
        onZoomStateChange={onZoomStateChange}
      >{
        // ZoomableChart's child is function, receiving renderContext
        // from ZoomableChart and using its contents
        // to render chart elements:
        ({ xScale, yScale }) => {
          const path = line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

          return (
            <g>
              <g key="circles">
                {data.map(d =>
                  <circle r={5} cx={xScale(d.x)} cy={yScale(d.y)} key={d.id} />,
                )}
              </g>
              <path key="line" fill="none" stroke="#555" d={path(data)} />
            </g>
          );
        }
      }</ZoomableChart>
    );
  }
}
