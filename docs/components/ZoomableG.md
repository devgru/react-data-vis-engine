# ZoomableG

Renders `g` element, responsible for zoom and pan control of chart contents.

## Children

This component accepts single child, which should be a function with signature `generateZoomedContents({xScale, yScale, mouseHandlerRef})`. This function should return React-element with rendered chart contents.

You should use `mouseHandlerRef` callback in `generateZoomedContents` call as a `ref` of some element. This element and its children will respond to mouse events.

This function is required.

## Example

```jsx

function render({ xScale, yScale }) {
  return (
    <ZoomableG xScale={xScale} yScale={yScale}>
      {({ xScale, yScale, mouseHandlerRef }) => {
        const width = xScale.range()[1];
        const height = yScale.range()[0];
        const backStyle = {
          fill: 'none',
          pointerEvents: 'all',
        };

        return (
          <g ref={mouseHandlerRef}>
            <!-- This rectangle makes g big enough to handle events within whole chart -->
            <rect width={width} height={height} style={backStyle} />
            <!-- Here we can draw chart contents -->
          </g>
        );
      }}
    </ZoomableG>
  );
}

```


## Props

`xScale` and `yScale` props are required, all other props have default values.

`zoomState` and `onZoomStateChange` props are used to control zoom and pan. Use them if you want to control chart zoom state from outer world (like `Esc` key to reset zoom, `+`/`-` buttons to increase/decrease scale etc.) or set default zoom state.

If you just want zoomable chart without external controls, you can ignore `zoomState` and `onZoomStateChange` props.

- [scale](https://github.com/d3/d3-scale#continuous-scales) `xScale` for X axis;
- [scale](https://github.com/d3/d3-scale#continuous-scales) `yScale` for Y axis;
- number `minScaleFactor` limiting minimal scale factor, default value is 1;
- number `maxScaleFactor` limiting maximal scale factor, default value is 16;
- object `limits` with `x` and `y` fields, each containing array of two numbers, representing data range, default value is `{ x: [-∞, ∞], y: [-∞, ∞] }`;
- object `zoomState` with `scale` (number) and `center` (object with numeric fields `x` and `y`), default value is `{ scale: 1, center: { x: 0.5, y: 0.5 }}`; coordinate are represented as fraction; if you pass this prop, make sure to update its value after `onZoomStateChange` is triggered;
- callback `onZoomStateChange`, a function with signature `onZoomStateChange(newZoomState)`, called by component on zoom state change, default value is NOOP.

You can use scales from `d3` v3 or v4.
