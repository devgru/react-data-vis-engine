export default function GenerateZoomCenter(rawScale, zoomedScale, scale) {
  const rawDomain = rawScale.domain();
  const zoomedDomain = zoomedScale.domain();
  const rawDomainDiff = rawDomain[1] - rawDomain[0];
  const domainDiff = zoomedDomain[0] - rawDomain[0];
  if (rawDomainDiff === 0) {
    return 0.5;
  } else {
    return (domainDiff / rawDomainDiff) + (0.5 / scale);
  }
}
