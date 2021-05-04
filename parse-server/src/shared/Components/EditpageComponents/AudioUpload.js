import React from 'react';
import PropTypes from 'prop-types';
import Parse from '../../common';

const audioBoxStyle = {
  border: '2px solid #f0f0f0',
  borderRadius: '6px',
  backgroundColor: '#fafafa',
  width: '90%',
  margin: '0 auto',
  padding: '10px',
};

const buttonStyle = {
  width: '50%',
  fontSize: '11px',
  margin: '0 auto 1em auto',
  height: '2em',
  display: 'inline',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',

};

const styleAlignCenter = {
  textAlign: 'center',
};

const audioStyle = {
  width: '250px',
  height: '40px',
};

function parseSaveFile(name, file) {
  return new Promise((resolve, reject) => {
    const parseFile = new Parse.File(name, file);
    parseFile.save().then(() => {
      const url = parseFile.url();
      resolve(url);
    }, (error) => {
      reject(error);
    });
  });
}

class AudioUpload extends React.Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.audioPlayer = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this.audioPlayer.current.load();
  }

  handleSubmit(event) {
    const tmpProps = this.props;
    event.preventDefault();
    const file = this.fileInput.current.files[0];
    const { name } = file;
    parseSaveFile(name, file).then((url) => {
      this.fileInput.current.value = null;
      tmpProps.onBoxInfoChange('currentBoxAudio', url);
    }, (error) => {
      console.log(`error fileupload: ${error}`);
    });
  }

  render() {
    const tmpProps = this.props;
    return (
      <div style={audioBoxStyle}>
        <label style={styleAlignCenter} htmlFor="currentBoxAudio">
          Choose audio file to upload
          <input
            type="file"
            accept="audio/*"
            name="currentFileValue"
            ref={this.fileInput}
            onChange={this.handleChange}
          />
        </label>
        <button style={buttonStyle} type="button" onClick={this.handleSubmit}>Save Audio File</button>
        <audio style={audioStyle} controls ref={this.audioPlayer}>
          <source
            src={tmpProps.currentBoxAudio}
            type="audio/*"
          />
          <p>
            Your browser does not support HTML5 audio.
            Here is a
            <a href={tmpProps.currentBoxAudio}>
              link to the audio
            </a>
            {' '}
            instead.
          </p>
        </audio>
      </div>
    );
  }
}
AudioUpload.propTypes = {
  currentBoxAudio: PropTypes.string.isRequired,
  onBoxInfoChange: PropTypes.func.isRequired,
};
export default AudioUpload;
