export default function MinScaleFactor(props) {
  const { minScaleFactor, limits } = props;
  const minFactors = ['x', 'y'].map((key) => {
    const limit = limits[key];
    const limitExtent = limit[1] - limit[0];
    const scale = props[`${key}Scale`];
    const domain = scale.domain();
    const domainSize = domain[1] - domain[0];
    return domainSize / limitExtent;
  });
  return Math.max(minScaleFactor, ...minFactors);
}
