import { extent } from 'd3-array';

function padRange(range, paddingCoefficient) {
  const difference = range[1] - range[0];
  if (difference === 0) {
    return [range[0] * (1 - paddingCoefficient), range[1] * (1 + paddingCoefficient)];
  }
  const padding = difference * paddingCoefficient;
  return [range[0] - padding, range[1] + padding];
}

function calculateExtent(coordinates, axis, paddingCoefficient) {
  return padRange(extent(coordinates, d => d[axis]), paddingCoefficient);
}

export default function CalculateExtents(coordinates, paddingCoefficient) {
  return {
    x: calculateExtent(coordinates, 'x', paddingCoefficient),
    y: calculateExtent(coordinates, 'y', paddingCoefficient),
  };
}
