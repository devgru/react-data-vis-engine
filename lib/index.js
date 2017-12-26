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
import GenerateZoomTransform from './utilities/zoom/GenerateZoomTransform';
import LimitZoomState from './utilities/zoom/LimitZoomState';
import ZoomLimitsReached from './utilities/zoom/ZoomLimitsReached';

module.exports = {
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
    GenerateZoomTransform,
    LimitZoomState,
    ZoomLimitsReached
  },
};
