import React, { Component } from 'react';
import './App.css';

import { line } from 'd3-shape';

import ZoomableChart from '../../lib/components/ZoomableChart';
import CalculateExtents from '../../lib/utilities/extents/CalculateExtents';

class ZoomDemoChart extends Component {
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

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  render() {
    const { data, zoomState } = this;

    const { x, y } = CalculateExtents(data, 0.1);

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <ZoomDemoChart id="asd" />
      </div>
    );
  }
}

export default App;
