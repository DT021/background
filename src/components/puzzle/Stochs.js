import React from 'react';

import CanvasJS from '../../canvasjs.min';
import CanvasJSReact from '../../canvasjs.react';

import up from '../../assets/up.png';
import down from '../../assets/down.png'

import Indicator from './Indicator.js';

export default function Stochs(props) {
  return <Indicator
    title='Stochs'
    file='stoch'
    selectors={{ K: row => row.K, D: row => row.D }}
    handler={StochChart}
    relevantSlice={14}
  />;
}

function StochChart(props) {
  const { K, D, title, format } = props;
  if (!(K && D)) { return null; }
  const crossed_up = K[0].y - D[0].y > 0;
  const options = {
    animationEnabled: true,
    theme:            "dark2",
    backgroundColor:  "transparent",
    height:           115,
    toolTip:          {
      enabled: false,
    },
    axisX:            {
      lineThickness:     0.5,
      crosshair:         {
        enabled:         true,
        snapToDataPoint: true,
      },
      ...format,
    },
    axisY:            [{
      includeZero:       true,
      valueFormatString: "#.#",
      gridColor:         "transparent",
      maximum:           1,
      minimum:           0,
      interval:          0.2,
      crosshair:         {
        enabled:         true,
        snapToDataPoint: true,
        labelMaxWidth:   40,
        labelFormatter:  e => CanvasJS.formatNumber(e.value, ".##"),
      },
      stripLines:        [{
        startValue: .3,
        endValue:   .45,
        color:      'red',
        opacity:    .11,
      }, {
        startValue: .65,
        endValue:   .8,
        color:      'lime',
        opacity:    .08,
      }],
    }],
    data:             [{
      lineColor:     "white",
      type:          "line",
      xValueType:    "dateTime",
      dataPoints:    D,
      markerType:    "none",
      lineThickness: 1.3,
    }, {
      lineColor:     "orange",
      type:          "line",
      xValueType:    "dateTime",
      dataPoints:    K,
      markerType:    "none",
      lineThickness: 1.8,
    }]
  };
  return <div className="w3-cell my-fourth" style={{'padding': '0 4px'}}>
    {title} {D[0].y === null ? '' : crossed_up ? <Up/> : <Down/> }
    <CanvasJSReact.CanvasJSChart options={options}/>
  </div>;
}

// filters computation app: https://codepen.io/sosuke/pen/Pjoqqp

function Up() {
  return <img src={up} alt='UP' width='16px' style={{'filter': 'invert(89%) sepia(55%) saturate(1962%) hue-rotate(15deg) brightness(105%) contrast(104%)'}}/>;
}
function Down() {
  return <img src={down} alt='DOWN' width='16px' style={{'filter': 'invert(11%) sepia(81%) saturate(6805%) hue-rotate(2deg) brightness(117%) contrast(116%)'}}/>;
}