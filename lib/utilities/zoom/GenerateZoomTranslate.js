import diff from '../common/Diff';

export default function GenerateZoomTranslate({ xScale, yScale }, { scale, center }) {
  const width = diff(xScale.range());
  const height = diff(yScale.range());
  const { x, y } = center;
  const scaleFraction = 1 / scale;
  const half = scaleFraction / 2;
  return [-scale * width * (x - half), -scale * height * ((1 - y) - half)];
}
