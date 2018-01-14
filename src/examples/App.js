import React, { Component } from 'react';
import './App.css';

import DemoChart from './BasicChartDemo';
import ZoomDemoChart from './ZoomableChartDemo';

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
