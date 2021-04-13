import React from 'react';
import PropTypes from 'prop-types';
import AudioUpload from './AudioUpload';
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

class BoxInfo extends React.Component {
  constructor(props) {
    super(props);
    const tmpProps = this.props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddPath = tmpProps.handleAddPath.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const tmpProps = this.props;
    tmpProps.saveBox();
  }

  handleChange(event) {
    const { name } = event.target;
    const { value } = event.target;
    const tmpProps = this.props;
    tmpProps.onBoxInfoChange(name, value);
  }

  render() {
    let popup = '';
    const tmpProps = this.props;
    if (tmpProps.choosingBoxForPath) {
      popup = <p>Click box to connect path</p>;
    }
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
    
    // <label htmlFor="currentBoxText">Text</label>
    return (
      <div style={boxInfoStyle}>
        <h4 style={{ textAlign: 'center' }}>Edit Box</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div style={titleTextStyle}>
              <label htmlFor="currentBoxTitle">
                Title
                <input
                  type="text"
                  value={tmpProps.currentBoxTitle}
                  placeholder="Enter Title here..."
                  onChange={this.handleChange}
                  name="currentBoxTitle"
                />
              </label>

              <br />
              <textarea
                type="text"
                rows="4"
                cols="40"
                value={tmpProps.currentBoxText}
                placeholder="Start writing this chapter here..."
                onChange={this.handleChange}
                name="currentBoxText"
              />
            </div>
            <AudioUpload
              currentBoxAudio={tmpProps.currentBoxAudio}
              onBoxInfoChange={tmpProps.onBoxInfoChange}
            />
            <button type="button" style={buttonStyle} onClick={this.handleAddPath}><img draggable="false" style={imgStyle} src={Plus}/> Add Path from Box</button>
            <button type="button" style={buttonStyle} onClick={tmpProps.handleMakeStartingBox}><img draggable="false" style={imgStoryStyle} src={Book}/> Start Story Here </button>
            <br />
            <button type="submit" style={buttonStyle}><img draggable="false" style={imgStyle} src={Save}/> Save Box</button>
            <button type="button" style={buttonDeleteStyle} onClick={tmpProps.deleteBox}><img draggable="false" style={imgStyle} src={Bin}/> Delete Box </button>
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


BoxInfo.propTypes = {
  deleteBox: PropTypes.func.isRequired,
  handleMakeStartingBox: PropTypes.func.isRequired,
  onBoxInfoChange: PropTypes.func.isRequired,
  currentBoxAudio: PropTypes.string.isRequired,
  currentBoxText: PropTypes.string.isRequired,
  currentBoxTitle: PropTypes.string.isRequired,
  choosingBoxForPath: PropTypes.bool.isRequired,
  saveBox: PropTypes.func.isRequired,
  handleAddPath: PropTypes.func.isRequired,


};

export default BoxInfo;
