import React from 'react';
import PropTypes from 'prop-types';
import AudioUpload from './AudioUpload';
import PlayPathPicker from './PlayPathPicker';

import Book from '../../images/openBook2op.png';
import Bin from '../../images/bin.png';
import Plus from '../../images/plus.png';
import Save from '../../images/save.png';

const boxInfoStyle = {
  // boxSizing: 'border-box',
  margin: '3em 0px 1em 0px',
  padding: '10px',
  backgroundColor: 'white', // '#f0f0f0',
  border: '2px solid #f0f0f0',
  borderRadius: '6px',
  fontSize: '11px',
  overflow: 'auto'
};
const buttonStyle = {
  width: '95%',
  fontSize: '11px',
  margin: '0.5em',
  height: '2em',
  display: 'inline',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',

};

const titleTextStyle = {
  padding: '0px 0px 10px 0',
};

const imgStyle = {
  width: '12px',
  position: 'relative',
  right: '5px',
}

const imgStoryStyle = {
  width: '15px',
  position: 'relative',
  right: '5px',
}

const buttonDeleteStyle = {
  width: '40%',
  fontSize: '11px',
  margin: '0.5em',
  height: '2em',
  display: 'inline',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
}

const buttonStartStyle = {
  width: '50%',
  fontSize: '11px',
  margin: '0.5em',
  height: '2em',
  display: 'inline',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
}

const svgStyle = {
  width: '1em',
  height: '1em',
  position: 'relative',
  top: '2px',
  right: '5px',
}

class PlayInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAudioDone: false,
      currentBoxId: props.playingBoxId,
    }
    this.audioPlayer = React.createRef();
    this.onAudioDone = this.onAudioDone.bind(this);
  }

  componentDidUpdate() {
    const tmpState = this.state;
    const tmpProps = this.props;
    if(tmpState.currentBoxId != tmpProps.playingBoxId) {
      //console.log(tmpState.currentBoxId, tmpProps.playingBoxId);
      this.setState({ currentBoxId: tmpProps.playingBoxId });
      if(tmpProps.playingBoxAudio != "") {
        this.setState({ isAudioDone: false, });
      }
      this.audioPlayer.current.load();
    }
  }

  onAudioDone(e) {
    e.stopPropagation();
    this.setState({isAudioDone: true,});
  }

  render() {
    let popup = '';
    const tmpProps = this.props;
    const tmpState = this.state;
    const arrowIcon = ( <svg style={svgStyle}>
                          <defs>
                            <marker
                              id="arrowEnd"
                              markerWidth="3"
                              markerHeight="3"
                              stroke="black"
                              fill="none"
                            >
                              <path d="M 0 0 L 10 5 L 0 10 L 2 5 z" />
                            </marker>
                          </defs>
                          <g 
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            markerEnd="url(#$arrowEnd)"
                          >
                          <path d="M 0 0 L 5 0"/>
                          </g>
                        </svg>);
    
    // <label htmlFor="playingBoxText">Text</label>
    return (
      <div style={boxInfoStyle}>
        <h4 style={{ textAlign: 'center' }}>Playtest story</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="container"> {/* TODO: Make this scroll to properly allow all content to be displayed */}
            <div style={titleTextStyle}>
              <label htmlFor="playingBoxTitle">
                Current box: {tmpProps.playingBoxTitle}
              </label>

            </div>
            <audio controls onEnded={this.onAudioDone} ref={this.audioPlayer}>
              <source src={tmpProps.playingBoxAudio} />
            </audio>
            <PlayPathPicker
              playingBoxId={tmpProps.playingBoxId}
              onPlayPathPicked={tmpProps.onPlayPathPicked}
              isAudioDone={tmpState.isAudioDone}
            />
            <br />
          </div>
        </form>
        <div>{popup}</div>
      </div>
    );
  }
}
// <svg style={svgStyle}><g strokeWidth="2"><path d="M 0 0 L 10 5 L 0 10 L 2 5 z" /></g></svg>

// Save icon:
// Icons made by <a href="https://www.flaticon.com/free-icon/floppy-disk_482459" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
//For the book icon:
//Created my free logo at LogoMakr.com
//For the bin icon:
//Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Plus icon
// <div>Icons made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


PlayInfo.propTypes = {
  playingBoxId: PropTypes.string.isRequired,
  playingBoxAudio: PropTypes.string.isRequired,
  playingBoxText: PropTypes.string.isRequired,
  playingBoxTitle: PropTypes.string.isRequired,
  playingBoxCommand: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  onPlayPathPicked: PropTypes.func.isRequired,

};

export default PlayInfo;
