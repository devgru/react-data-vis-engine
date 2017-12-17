# ZoomableChart

Renders zoomable chart in `svg` element with axes, borders, pseudo-grid and paddings.

[Component usage example](../../lib/examples/ZoomDemoChart.jsx).

## Children

This component accepts single child, which should be a function with signature `generateChart({id, xScale, yScale, width, height})`. This function should return React-element with rendered chart contents or an object with `chart`, `back` and `front` fields, each of them containing React-element if defined.

This approach allows you rendering contents behind axes (`back`), atop of axes (`chart`) and atop of chart (`front`). Please note that only `chart` element is clipped.

This function is required.

## Props

Props `limits`, `zoomState`, `minScaleFactor`, `maxScaleFactor`, `onZoomStateChange` are passed to `ZoomableG` as is, their default value being `undefined`, allowing `ZoomableG` to use its defaults. See [ZoomableG](./ZoomableG.md).

- string `id` is used to create identifiers for several elements within chart, default value is random string;
- array of two numbers `xDomain`, data domain for X axis;
- array of two numbers `yDomain`, data domain for Y axis;
- number `xPadding`, representing horizontal padding between ticks labels and axis line of Y axis;
- number `yPadding`, representing vertical padding between ticks labels and axis line of X axis;
- object `margin`, containing fields `left`, `top`, `right` and `bottom`, representing chart margins.
