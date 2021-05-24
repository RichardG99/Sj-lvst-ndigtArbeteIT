import React from 'react';

const svgStyle = {
  overflow: 'visible',
  position: 'absolute',
  zIndex: '9',
};

const arrowStyle = {
  zIndex: '9',
  cursor: 'pointer',
};

function Arrow(props) {
  const tmpProps = props;
  const boxWidth = tmpProps.boxWidth;
  const boxHeight = tmpProps.boxHeight;
  const menuWidth = tmpProps.leftMargin;
  const arrowCompensation = 10;

  const fromBox = tmpProps.fromBoxNode;
  const toBox = tmpProps.toBoxNode;
  const fromRect = fromBox.getBoundingClientRect();
  const toRect = toBox.getBoundingClientRect();

  const boxAMid = {
    x: -menuWidth + fromRect.left + window.scrollX + boxWidth / 2,
    y: fromRect.top + window.scrollY + boxHeight / 2,
  };

  const boxBMid = {
    x: -menuWidth + toRect.left + window.scrollX + boxWidth / 2,
    y: toRect.top + window.scrollY + boxHeight / 2,
  };
  
  const xDiff = boxAMid.x - boxBMid.x;
  const yDiff = boxAMid.y - boxBMid.y;

  //console.log("xdiff: " + xDiff + " ydiff: " + yDiff);

  let fromEdge = boxAMid, toEdge = boxBMid, ori = -1;
  if(fromBox == toBox) { // this path is a loop
    fromEdge.y = toEdge.y = toEdge.y + boxHeight / 2;
    fromEdge.x -= 40;
    toEdge.x += 40;
    ori = "270";
  } else if(Math.abs(xDiff) > 2.5*Math.abs(yDiff)) { // this path is mostly left or right
    if(xDiff < 0) {
      fromEdge.x += boxWidth / 2;
      toEdge.x -= boxWidth / 2 + arrowCompensation;
      //ori = "0";
    } else {
      fromEdge.x -= boxWidth / 2;
      toEdge.x += boxWidth / 2 + arrowCompensation;
      //ori = "180";
    }
  } else if(Math.abs(xDiff) < Math.abs(yDiff)) { // this path is mostly up or down
    // note the asymmetrical if cases: this is because boxes are much wider than they are high
    if(yDiff < 0) {
      fromEdge.y += boxHeight / 2;
      toEdge.y -= boxHeight / 2 + arrowCompensation;
      //ori = "90";
    } else {
      fromEdge.y -= boxHeight / 2;
      toEdge.y += boxHeight / 2 + arrowCompensation;
      //ori = "270";
    }
  } else { // this path is diagonal
    if(xDiff < 0 && yDiff < 0) { // path is down and right
      fromEdge.x += boxWidth / 2;
      fromEdge.y += boxHeight / 2;
      toEdge.x -= boxWidth / 2 + arrowCompensation;
      toEdge.y -= boxHeight / 2 + arrowCompensation;
      //ori = "45";
    } else if(xDiff < 0 && yDiff > 0) { // path is up and right
      fromEdge.x += boxWidth / 2;
      fromEdge.y -= boxHeight / 2;
      toEdge.x -= boxWidth / 2 + arrowCompensation;
      toEdge.y += boxHeight / 2 + arrowCompensation;
      //ori = "315";
    } else if(xDiff > 0 && yDiff < 0) { // path is down and left
      fromEdge.x -= boxWidth / 2;
      fromEdge.y += boxHeight / 2;
      toEdge.x += boxWidth / 2 + arrowCompensation;
      toEdge.y -= boxHeight / 2 + arrowCompensation;
      //ori = "135";
    } else { // path is up and left
      fromEdge.x -= boxWidth / 2;
      fromEdge.y -= boxHeight / 2;
      toEdge.x += boxWidth / 2 + arrowCompensation;
      toEdge.y += boxHeight / 2 + arrowCompensation;
      //ori = "225";
    }
  }

  //console.log("from (" + fromEdge.x + "," + fromEdge.y + ") to (" + toEdge.x + "," + toEdge.y + ")");
  //console.log("Angle: " + (Math.atan2(fromEdge.y - toEdge.y, toEdge.x - fromEdge.x)
  //      * 180 / Math.PI + 180));
  const focusX = fromEdge.x - xDiff / 8 + yDiff / 4;
  const focusY = fromEdge.y + xDiff / 4 - yDiff / 8;

  if(ori < 0) {
    if(tmpProps.isCircular)
      ori = Math.atan2(focusY - toEdge.y, toEdge.x - focusX);
    else
      ori = Math.atan2(fromEdge.y - toEdge.y, toEdge.x - fromEdge.x);

    if(ori < 0)
      ori = Math.abs(ori);
    } else {
      ori = 2*Math.PI-ori;
    }
    ori = ori * 180 / Math.PI;
  }

  const dStrDown = `M ${
    fromEdge.x},${fromEdge.y} `
        +  ((fromBox == toBox)
        ? `A 40,40 0 0 0 ${toEdge.x},${toEdge.y}`
        : ((tmpProps.isCircular === false) ? `C ${
          fromEdge.x},${fromEdge.y} ${
          toEdge.x},${toEdge.y} ${
          toEdge.x},${toEdge.y}` 
          : `Q ${focusX} ${focusY}, ${toEdge.x} ${toEdge.y}`) );

  const arrowColor = tmpProps.color;
  const id = `${tmpProps.pathId}arrowhead`;
  const markerEndUrl = `url(#${id})`;
  return (
    <svg width="1%" height="1%" style={svgStyle}>
      <defs>
        <marker
          id={id}
          viewBox="0 0 10 10"
          refX="4"
          refY="5"
          markerWidth="3"
          markerHeight="3"
          orient={ori}
          stroke={arrowColor}
          fill={arrowColor}
        >
          <path d="M 0 0 L 10 5 L 0 10 L 2 5 z" />
        </marker>
      </defs>
      <g
        fill="none"
        stroke={arrowColor}
        strokeWidth="8"
        markerStart="url(#circle)"
        markerEnd={markerEndUrl}
        transform="translate(0,0)"
      >
        <path style={arrowStyle} d={dStrDown} onClick={tmpProps.onClickMe} />
      </g>
    </svg>
  );
}

export default Arrow;
