import { zoomIdentity } from 'd3-zoom';

import Diff from '../common/Diff';

const isRangeDescending = ([a, b]) => a > b;

export default function CalculateZoomTransform({ xScale, yScale, zoomState }) {
  const { scale, center } = zoomState;
  const xRange = xScale.range();
  const yRange = yScale.range();
  const { x, y } = center;

  // If scale is 4, we show 1/4 of the screen,
  // so we offset the screen 1/8
  const half = 1 / scale / 2;

  // Sometimes scale's range is reversed, we have to deal with it
  const adjustedX = isRangeDescending(xRange) ? (1 - x) : x;
  const adjustedY = isRangeDescending(yRange) ? (1 - y) : y;

  // Adjusted values are subtracted, because we move window.
  // Diffs are actually percents of width and height.
  const scaledX = (half - adjustedX) * Diff(xRange);
  const scaledY = (half - adjustedY) * Diff(yRange);

  return zoomIdentity
    .scale(scale)
    .translate(scaledX, scaledY);
}
