import React, { Component } from 'react';
import './App.css';

import DemoChart from './examples/BasicChartDemo';
import ZoomDemoChart from './examples/ZoomableChartDemo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-chart">
          <DemoChart />
        </div>
        <div className="App-chart">
          <ZoomDemoChart />
        </div>
      </div>
    );
  }
}

export default App;
