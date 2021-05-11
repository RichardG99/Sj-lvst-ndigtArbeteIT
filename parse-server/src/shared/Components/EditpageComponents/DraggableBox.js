import React from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import Box from './Box';

const styleBox = {
  display: 'inline-block',
  position: 'absolute',
};

class DraggableBox extends React.Component {
  constructor(props) {
    super(props);
    const tmpProps = this.props;
    this.state = {
      deltaPosition: {
        x: tmpProps.x,
        y: tmpProps.y,
      },
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.onClickInnerBox = this.onClickInnerBox.bind(this);
  }

  onClickInnerBox(boxId, boxTitle, boxText, boxUrl, node, boxCommand) {
    const tmpState = this.state;
    const tmpProps = this.props;
    const { x } = tmpState.deltaPosition;
    const { y } = tmpState.deltaPosition;
    tmpProps.onClickBox(boxId, boxTitle, boxText, boxUrl, node, x, y, boxCommand);
  }

  handleDrag(e, ui) {
    const tmpState = this.state;
    const { x, y } = tmpState.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  }

  render() {
    const tmpProps = this.props;
    /*
      <div>
        x: {this.state.deltaPosition.x.toFixed(0)},
        y: {this.state.deltaPosition.y.toFixed(0)}
      </div>
    */
    return (
      <Draggable
        handle=".handle"
        bounds="parent"
        defaultPosition={{ x: tmpProps.x, y: tmpProps.y }}
        onDrag={this.handleDrag}
      >
        <div style={styleBox}>
          <div className="handle">
            <Box
              onClickInnerBox={this.onClickInnerBox}
              getBoxRef={tmpProps.getBoxRef}
              boxId={tmpProps.boxId}
              title={tmpProps.title}
              text={tmpProps.text}
              url={tmpProps.url}
              boxCommand={tmpProps.boxCommand}
              isStartingBox={tmpProps.isStartingBox}
              style={tmpProps.style}
            />
          </div>
        </div>
      </Draggable>
    );
  }
}
DraggableBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClickBox: PropTypes.func.isRequired,
  getBoxRef: PropTypes.func.isRequired,
  boxId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  boxCommand: PropTypes.string.isRequired,
  isStartingBox: PropTypes.bool.isRequired,
  // style: PropTypes??? FIXME
};

export default DraggableBox;
