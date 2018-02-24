import BasicAxes from './components/BasicAxes';
import BasicChart from './components/BasicChart';
import ClipG from './components/ClipG';
import FillParentSvg from './components/FillParentSvg';
import MarginG from './components/MarginG';
import ZoomableG from './components/ZoomableG';
import ZoomableChart from './components/ZoomableChart';

import Diff from './utilities/common/Diff';
import UniqueId from './utilities/common/UniqueId';
import CalculateExtents from './utilities/extents/CalculateExtents';
import GenerateZoomCenter from './utilities/zoom/GenerateZoomCenter';
import GenerateZoomObject from './utilities/zoom/GenerateZoomObject';
import CalculateZoomTransform from './utilities/zoom/CalculateZoomTransform';
import LimitZoomState from './utilities/zoom/LimitZoomState';
import ZoomLimitsReached from './utilities/zoom/ZoomLimitsReached';
import MinScaleFactor from './utilities/zoom/MinScaleFactor';

export {
  BasicAxes,
  BasicChart,
  ClipG,
  FillParentSvg,
  MarginG,
  ZoomableG,
  ZoomableChart,

  Diff,
  UniqueId,
  CalculateExtents,
  GenerateZoomCenter,
  GenerateZoomObject,
  CalculateZoomTransform,
  LimitZoomState,
  ZoomLimitsReached,
  MinScaleFactor,
};

export default {
  components: {
    BasicAxes,
    BasicChart,
    ClipG,
    FillParentSvg,
    MarginG,
    ZoomableG,
    ZoomableChart,
  },
  utilities: {
    Diff,
    UniqueId,
    CalculateExtents,
    GenerateZoomCenter,
    GenerateZoomObject,
    CalculateZoomTransform,
    LimitZoomState,
    ZoomLimitsReached,
  },
};
