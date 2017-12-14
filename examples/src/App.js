import React, { Component } from 'react';
import './App.css';

import { line } from 'd3-shape';

import ZoomableChart from '../../lib/components/ZoomableChart';
import CalculateExtents from '../../lib/utilities/extents/CalculateExtents';

console.log(ZoomableChart);

class ZoomDemoChart extends Component {
  constructor(props) {
    super(props);

    // В приложении данные могут приходить как props или храниться в state компонента.
    // Здесь просто храним во внутреннем поле:
    this.data = [
      { id: 0, x: -5, y: 4 },
      { id: 1, x: 5, y: 10 },
      { id: 2, x: 9, y: 22 },
      { id: 3, x: 10, y: 6 },
      { id: 4, x: 15, y: 12 },
    ];

    // Восстанавливаем сохранённый zoomState
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

    // График знает свои размеры и передаёт их в шкалу.
    // Но помимо размеров в пикселях графику необходимо знать разброс входных значений.
    //
    // Самый простой способ расчитать разброс — такой код:
    // import { extent } form 'd3-array';
    // const x = extent(data.map((d) => d.x));
    // const y = extent(data.map((d) => d.y));

    // Однако, для того чтобы значения не «прилипали» к краям рабочей области графика,
    // мы добавляем к ним отступы в 10-15% от разброса.
    // В проекте для этого есть утилита, CalculateExtents:
    const { x, y } = CalculateExtents(data, 0.1);
    // Особенность использования — утилита принимает на вход массив объектов с полями x, y.
    // В данном примере данные и так имеют такую структуру, однако в реальности
    // может потребоваться дополнительное преобразование.

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
        xDomain={x} yDomain={y}
        maxScaleFactor={4} limits={limits}
        zoomState={zoomState} onZoomStateChange={onZoomStateChange}
      >{
        // В качестве потомка в элемент ZoomableChart передаётся функция.
        // Функция получает renderContext от ZoomableChart и используя его содержимое
        // может отрисовывать произвольные элементы:
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


const Z = ZoomDemoChart;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Z id="asd" />
      </div>
    );
  }
}

export default App;
