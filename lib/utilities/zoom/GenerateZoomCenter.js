import diff from '../common/Diff';

export default function GenerateZoomCenter(rawScale, zoomedScale, k) {
  const rawDomain = rawScale.domain();
  const zoomedDomain = zoomedScale.domain();
  const rawDomainDiff = diff(rawDomain);
  const domainDiff = zoomedDomain[0] - rawDomain[0];
  if (rawDomainDiff === 0) return 0.5;
  return (domainDiff / rawDomainDiff) + (0.5 / k);
}
