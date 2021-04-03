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
  const menuWidth = 320;
  const arrowCompensation = 10;

  const fromBox = tmpProps.fromBoxNode;
  const toBox = tmpProps.toBoxNode;
  const fromRect = fromBox.getBoundingClientRect();
  const toRect = toBox.getBoundingClientRect();

  const posnABottom = {
    x: -menuWidth + fromRect.right + window.scrollX - boxWidth / 2,
    y: fromRect.bottom + window.scrollY,
  };

  const posnBTop = {
    x: -menuWidth + toRect.right + window.scrollX - boxWidth / 2,
    y: toRect.top + window.scrollY - arrowCompensation,
  };

  const dStrDown = `M ${
    posnABottom.x},${posnABottom.y} `
        + `C ${
          posnABottom.x + 20},${posnABottom.y} ${
          posnBTop.x - 20},${posnBTop.y} ${
          posnBTop.x},${posnBTop.y}`;

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
          orient="90"
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
