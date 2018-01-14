export default function ZoomLimitsReached({ xScale, yScale }, limits) {
  const [x0, x1] = xScale.domain();
  const [y0, y1] = yScale.domain();
  const { x, y } = limits;
  return x0 < x[0] || x1 > x[1] || y0 < y[0] || y1 > y[1];
}
