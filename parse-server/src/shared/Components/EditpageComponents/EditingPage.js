import React from 'react';
import PropTypes from 'prop-types';
import DraggableBox from './DraggableBox';
import Path from './Path';

const editingPageStyle = {
  position: 'relative',
  left: '320px',
  height: '4000px',
  width: '4000px',
  backgroundColor: 'rgb(252,242,230, 0)',
};

const boxStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  fontSize: '14px',
  width: '200px',
  height: '80px',
  backgroundColor: 'white',
  border: '2px solid #f5f5f5',
  zIndex: '100',
  position: 'absolute',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
};

const currentBoxStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  fontSize: '14px',
  width: '200px',
  height: '80px',
  backgroundColor: 'hsla(0, 0%, 90%, 1)',
  border: '2px solid hsla(0, 0%, 76%, 1)',
  zIndex: '100',
  position: 'absolute',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
};


const arrowColor = '#363535';
const currentArrowColor = 'hsla(0, 0%, 76%, 1)';

class EditingPage extends React.Component {

  render() {
    const tmpProps = this.props;
    const { currentStartingBoxId } = tmpProps;
    const { currentBoxId } = tmpProps;
    const { currentPathId } = tmpProps;

    return (
      <div style={editingPageStyle} onClick={tmpProps.onClickPage}>
        {
          tmpProps.boxes.map((box) => (
            <DraggableBox
              key={box.boxId}
              boxId={box.boxId}
              title={box.title}
              text={box.text}
              url={box.url}
              x={box.x}
              y={box.y}
              onClickBox={tmpProps.onClickBox}
              getBoxRef={tmpProps.getBoxRef}
              isStartingBox={(box.boxId === currentStartingBoxId)}
              style={((box.boxId === currentBoxId) && tmpProps.showBoxInfo) 
                      ? currentBoxStyle : boxStyle}
            />
          ))
        }
        {
          tmpProps.paths.map((path) => (
            <Path
              key={path.pathId}
              fromBoxNode={path.fromBoxNode}
              toBoxNode={path.toBoxNode}
              pathId={path.pathId}
              pathFrom={path.pathFrom}
              pathTo={path.pathTo}
              keyword={path.keyword}
              onClickPath={tmpProps.onClickPath}
              editPageRef={this.editPageRef}
              color={((path.pathId === currentPathId) && tmpProps.showPathInfo)
                      ? currentArrowColor : arrowColor}
            />
          ))
        }
      </div>
    );
  }
}

EditingPage.propTypes = {
  currentStartingBoxId: PropTypes.string.isRequired,
  currentBoxId: PropTypes.string.isRequired,
  currentPathId: PropTypes.string.isRequired,
  // boxes: PropTypes.array.isRequired, FIXME array FORBIDDEN
  onClickBox: PropTypes.func.isRequired,
  getBoxRef: PropTypes.func.isRequired,
  // paths: PropTypes.array.isRequired, FIXME array FORBIDDEN
  onClickPath: PropTypes.func.isRequired,

};


export default EditingPage;
