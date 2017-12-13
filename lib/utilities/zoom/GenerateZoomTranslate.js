import diff from '../common/Diff';

const sign = ([a, b]) => a > b ? 1 : a < b ? -1 : 0;

const isScaleInverted = (scale) => sign(scale.domain()) !== sign(scale.range());

export default function GenerateZoomTranslate({ xScale, yScale }, { scale, center }) {
  const width = diff(xScale.range());
  const height = diff(yScale.range());
  const { x, y } = center;
  const scaleFraction = 1 / scale;
  const half = scaleFraction / 2;

  const adjustedX = isScaleInverted(xScale) ? (1 - x) : x;
  const adjustedY = isScaleInverted(yScale) ? (1 - y) : y;

  return [-scale * width * (adjustedX - half), -scale * height * (adjustedY - half)];
}
