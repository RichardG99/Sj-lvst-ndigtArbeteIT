import React from 'react';
import PropTypes from 'prop-types';
import Book from '../../images/openBook2op.png';

const svgStyle = {
  height: '20px',
  position: 'relative',
  bottom: '10px',
};

const imgStyle= {
  width: '30px',
  position: 'relative',
  //margin: '0',
  //bottom: '10px',
}

const divStyle = {
  //border: '2px solid blue',
}

const h4Style = {
  //border: '2px solid red',
  margin: '8px',
}
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.onClickMe = this.onClickMe.bind(this);
    this.boxRef = React.createRef();
  }

  componentDidMount() {
    const tmpProps = this.props;
    tmpProps.getBoxRef(tmpProps.boxId, this.boxRef.current);
  }

  onClickMe(e) {
    e.stopPropagation();
    const tmpProps = this.props;
    const { boxId } = tmpProps;
    const boxTitle = tmpProps.title;
    const boxText = tmpProps.text;
    const boxUrl = tmpProps.url;
    const node = this.boxRef.current;
    tmpProps.onClickInnerBox(boxId, boxTitle, boxText, boxUrl, node);
  }

  //<polygon points="0,0 20,0 10,20"/>
  render() {
    const tmpProps = this.props;
    return (
      <button type="button" onClick={this.onClickMe} ref={this.boxRef} style={tmpProps.style}>
        <div style={divStyle}>
          <h4 style={h4Style}>{tmpProps.title}</h4>
          {
              tmpProps.isStartingBox
                ? 
                <img draggable="false" style={imgStyle} src={Book}/>
                /*<svg width="30" style={svgStyle}>
                    <g
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    >
                      <path d="M 8 0 L 8 5 L 0 5 L 14 15 L 28 5 L 20 5 L 20 0 z"/>
                    </g>
                  </svg>*/
                : null
            }
        </div>
      </button>
    );
  }
}
Box.propTypes = {
  // style: PropTypes.object.isRequired, // FIXME Object is forbidden
  title: PropTypes.string.isRequired,
  onClickInnerBox: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  boxId: PropTypes.string.isRequired,
  getBoxRef: PropTypes.func.isRequired,
  isStartingBox: PropTypes.bool.isRequired,
};
export default Box;
