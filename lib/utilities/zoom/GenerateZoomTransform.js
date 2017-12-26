import diff from '../common/Diff';
import { zoomIdentity } from 'd3-zoom';

const isRangeDescending = ([a, b]) => a > b;

export default function GenerateZoomTransform({ xScale, yScale }, { scale, center }) {
  const xRange = xScale.range();
  const yRange = yScale.range();
  const width = diff(xRange);
  const height = diff(yRange);
  const { x, y } = center;
  const scaleFraction = 1 / scale;
  const half = scaleFraction / 2;

  const adjustedX = isRangeDescending(xRange) ? (1 - x) : x;
  const adjustedY = isRangeDescending(yRange) ? (1 - y) : y;

  const newX = -scale * width * (adjustedX - half);
  const newY = -scale * height * (adjustedY - half);

  return zoomIdentity
    .translate(newX, newY)
    .scale(scale);
}
