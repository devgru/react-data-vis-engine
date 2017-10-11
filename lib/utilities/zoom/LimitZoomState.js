export default function LimitZoomState(scales, limits) {
  ['x', 'y'].forEach((key) => {
    const scale = scales[`${key}Scale`];
    const domain = scale.domain();
    const [d0, d1] = domain;
    const [l0, l1] = limits[key];
    if (d0 < l0) {
      scale.domain([l0, l0 + (d1 - d0)]);
    } else if (d1 > l1) {
      scale.domain([l1 + (d0 - d1), l1]);
    }
  });
}
