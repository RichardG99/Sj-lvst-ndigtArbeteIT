import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import BoxInfo from './BoxInfo';
import PathInfo from './PathInfo';
import StoryInfo from './StoryInfo';
import Plus from '../../images/plus.png';
import Bin from '../../images/bin.png';
import Save from '../../images/save.png';
import Paperplane from '../../images/paperplane_114200.png';

const menuStyle = {
  position: 'fixed',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '11px',
  padding: '10px',
  left: '0px',
  width: '300px',
  maxHeight: '100vh',
  backgroundColor: 'hsla(33, 40%, 95%, 1)', // '#fafafa',
  zIndex: '10000',
  border: '2px solid hsla(33, 40%, 90%, 1)',
  boxShadow: '5px 5px 14px rgba(0,0,0, 0.2)',
  borderTopRightRadius: '6px',
  borderBottomRightRadius: '6px',
  overflow: 'auto'
};

const buttonStyle = {
  width: '30%',
  fontSize: '11px',
  margin: '0 0.4em 1em 0.4em',
  height: '3.7em',
  display: 'inline',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
};

const buttonAddBoxStyle = {
  width: '65%',
  fontSize: '13px',
  margin: '0 3.5em',
  height: '2em',
  display: 'inline',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
};

const imgAddStyle = {
  width: '14px',
  position: 'relative',
  right: '15px',
}

const imgStyle = {
  display: 'block',
  width: '12px',
  position: 'relative',
  top: '1px',
  left: '30px',
  marginBottom: '7px',
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveStory = this.handleSaveStory.bind(this);
    this.handlePublishStory = this.handlePublishStory.bind(this);
    this.handleDeleteStory = this.handleDeleteStory.bind(this);
    this.handleAddBox = this.handleAddBox.bind(this);
  }

  handleAddBox() {
    const tmpProps = this.props;
    tmpProps.addNewBox();
  }

  handleSaveStory() {
    const tmpProps = this.props;
    tmpProps.saveStoryInfo();
    // TODO: Add any other saving functionality?
  }

  handlePublishStory() {
    // TODO: Add functionaloty to publish story
    const tmpProps = this.props;
    tmpProps.publishStory();
  }

  handleDeleteStory() {
    // TODO: Add functionality to delete story
    const tmpProps = this.props;
    tmpProps.deleteStory();
  }

  render() {
    const tmpProps = this.props;
    let infoBox = null;
    if(tmpProps.showBoxInfo) {
      infoBox = <BoxInfo
                  currentBoxId={tmpProps.currentBoxId}
                  currentBoxTitle={tmpProps.currentBoxTitle}
                  currentBoxText={tmpProps.currentBoxText}
                  currentBoxAudio={tmpProps.currentBoxAudio}
                  currentBoxCommand={tmpProps.currentBoxCommand}
                  x={tmpProps.x}
                  y={tmpProps.y}
                  onBoxInfoChange={tmpProps.onBoxInfoChange}
                  saveBox={tmpProps.saveBox}
                  deleteBox={tmpProps.deleteBox}
                  handleAddPath={tmpProps.handleAddPath}
                  choosingBoxForPath={tmpProps.choosingBoxForPath}
                  handleMakeStartingBox={tmpProps.handleMakeStartingBox}
                />;
    }
    else if (tmpProps.showPathInfo){
      infoBox = <PathInfo
                  currentPathId={tmpProps.currentPathId}
                  currentPathFrom={tmpProps.currentPathFrom}
                  currentPathTo={tmpProps.currentPathTo}
                  currentPathKeyword={tmpProps.currentPathKeyword}
                  onPathInfoChange={tmpProps.onPathInfoChange}
                  savePath={tmpProps.savePath}
                  deletePath={tmpProps.deletePath}
                />
    }

    return (
      <div style={menuStyle}>
        <NavLink to="/myhomepage" className="link" onClick={tmpProps.onClickNavLink}>Go back to my home page</NavLink>
        <StoryInfo
          currentStoryTitle={tmpProps.currentStoryTitle}
          currentStoryDesc={tmpProps.currentStoryDesc}
          onStoryInfoChange={tmpProps.onStoryInfoChange}

        />
        <button type="button" style={buttonStyle} onClick={this.handleSaveStory}><img draggable="false" style={imgStyle} src={Save}/>Save Story</button>
        <button type="button" style={buttonStyle} onClick={this.handlePublishStory}><img draggable="false" style={imgStyle} src={Paperplane}/>Publish Story</button>
        <button type="button" style={buttonStyle} onClick={this.handleDeleteStory}><img draggable="false" style={imgStyle} src={Bin}/> Delete Story</button>
        <button type="button" style={buttonAddBoxStyle} onClick={this.handleAddBox}><img draggable="false" style={imgAddStyle} src={Plus}/>Add New Box</button>
        {infoBox}
      </div>
    );
  }
}
Menu.propTypes = {

  addNewBox: PropTypes.func.isRequired,
  saveStoryInfo: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  publishStory: PropTypes.func.isRequired,
  
  currentStoryTitle: PropTypes.string.isRequired,
  //  currentStoryDesc: PropTypes.string.isRequired, FIXME: set default value
  onStoryInfoChange: PropTypes.func.isRequired,
  currentBoxId: PropTypes.string.isRequired,
  currentBoxTitle: PropTypes.string.isRequired,
  currentBoxText: PropTypes.string.isRequired,
  currentBoxAudio: PropTypes.string.isRequired,
  currentBoxCommand: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onBoxInfoChange: PropTypes.func.isRequired,
  saveBox: PropTypes.func.isRequired,
  deleteBox: PropTypes.func.isRequired,
  handleAddPath: PropTypes.func.isRequired,
  choosingBoxForPath: PropTypes.bool.isRequired,
  handleMakeStartingBox: PropTypes.func.isRequired,

  currentPathId: PropTypes.string.isRequired,
  currentPathFrom: PropTypes.string.isRequired,
  currentPathTo: PropTypes.string.isRequired,
  currentPathCondition: PropTypes.string.isRequired,
  onPathInfoChange: PropTypes.func.isRequired,
  savePath: PropTypes.func.isRequired,
  deletePath: PropTypes.func.isRequired,

};
export default Menu;
