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
  const boxWidth = 200; // TODO: get this from props?
  const boxHeight = 80;
  const menuWidth = 320;
  const arrowCompensation = 10;

  const fromBox = tmpProps.fromBoxNode;
  const toBox = tmpProps.toBoxNode;
  const fromRect = fromBox.getBoundingClientRect();
  const toRect = toBox.getBoundingClientRect();

  const boxAMid = {
    x: Math.trunc(-menuWidth + fromRect.left + window.scrollX + boxWidth / 2),
    y: Math.trunc(fromRect.top + window.scrollY + boxHeight / 2),
  };

  const boxBMid = {
    x: Math.trunc(-menuWidth + toRect.left + window.scrollX + boxWidth / 2),
    y: Math.trunc(toRect.top + window.scrollY + boxHeight / 2),
  };
  
  const xDiff = Math.trunc(boxAMid.x - boxBMid.x);
  const yDiff = Math.trunc(boxAMid.y - boxBMid.y);

  console.log("xdiff: " + xDiff + " ydiff: " + yDiff);

  let fromEdge = boxAMid, toEdge = boxBMid, ori;
  if(fromBox == toBox) {
    fromEdge.y = toEdge.y = toEdge.y + boxHeight / 2;
    fromEdge.x -= 40;
    toEdge.x += 40;
    ori = "270";
  } else if(Math.abs(xDiff) > Math.abs(yDiff)) {
    if(xDiff < 0) {
      fromEdge.x += boxWidth / 2;
      toEdge.x -= boxWidth / 2;
      ori = "0";
    } else {
      fromEdge.x -= boxWidth / 2;
      toEdge.x += boxWidth / 2;
      ori = "180";
    }
  } else {
    if(yDiff < 0) {
      fromEdge.y += boxHeight / 2;
      toEdge.y -= boxHeight / 2;
      ori = "90";
    } else {
      fromEdge.y -= boxHeight / 2;
      toEdge.y += boxHeight / 2;
      ori = "270";
    }
  }

  console.log("from (" + fromEdge.x + "," + fromEdge.y + ") to (" + toEdge.x + "," + toEdge.y + ")");

  const dStrDown = `M ${
    fromEdge.x},${fromEdge.y} `
        + /* (fromBox == toBox)
        ? `A 40 40 0 0 0 ${toEdge.x},${toEdge.y}`
        : */`C ${
          fromEdge.x},${fromEdge.y} ${
          toEdge.x},${toEdge.y} ${
          toEdge.x},${toEdge.y}`;

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
