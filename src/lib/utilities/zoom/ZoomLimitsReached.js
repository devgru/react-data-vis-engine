export default function ZoomLimitsReached({ xScale, yScale }, limits) {
  const [x0, x1] = xScale.domain();
  const [y0, y1] = yScale.domain();
  const message = 'ZoomLimitsReached: reverse both "domain" and "range" of this scale.' +
    'Limits will not be applied for scales with reversed domain.';

  if (x1 < x0) {
    console.error(message, 'X', xScale);
    return false;
  }
  if (y1 < y0) {
    console.error(message, 'Y', yScale);
    return false;
  }

  const { x, y } = limits;
  return x0 < x[0] || x1 > x[1] || y0 < y[0] || y1 > y[1];
}
