import GenerateZoomCenter from './GenerateZoomCenter';

export default function GenerateZoomObject(scale, rawScales, zoomedScales) {
  return {
    scale,
    center: {
      x: GenerateZoomCenter(rawScales.xScale, zoomedScales.xScale, scale),
      y: GenerateZoomCenter(rawScales.yScale, zoomedScales.yScale, scale),
    },
  };
}
