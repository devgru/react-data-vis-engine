import BasicAxes from './components/BasicAxes';
import BasicChart from './components/BasicChart';
import ClipG from './components/ClipG';
import FillParentSvg from './components/FillParentSvg';
import MarginG from './components/MarginG';
import ZoomableG from './components/ZoomableG';
import ZoomableChart from './components/ZoomableChart';

import DemoChart from './examples/DemoChart';
import ZoomDemoChart from './examples/ZoomDemoChart';

import Diff from './utilities/common/Diff';
import UniqueId from './utilities/common/UniqueId';
import CalculateExtents from './utilities/extents/CalculateExtents';
import GenerateZoomCenter from './utilities/zoom/GenerateZoomCenter';
import GenerateZoomObject from './utilities/zoom/GenerateZoomObject';
import GenerateZoomTranslate from './utilities/zoom/GenerateZoomTranslate';
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
  examples: {
    DemoChart,
    ZoomDemoChart,
  },
  utilities: {
    Diff,
    UniqueId,
    CalculateExtents,
    GenerateZoomCenter,
    GenerateZoomObject,
    GenerateZoomTranslate,
    LimitZoomState,
    ZoomLimitsReached
  },
};
