import React from 'react';
import PropTypes from 'prop-types';
import InfoBox from '../CommonComponents/InfoBox';
import Bin from '../../images/bin.png';
import Save from '../../images/save.png';

const pathInfoStyle = {
  margin: '3em 0px 1em 0px',
  padding: '10px',
  fontSize: '11px',
  backgroundColor: 'white',
  border: '2px solid #f0f0f0',
  borderRadius: '6px',
  overflow: 'auto'
};

const buttonStyle = {
  width: '40%',
  fontSize: '11px',
  margin: '0 1em 1em 1em',
  height: '2em',
  display: 'inline',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',

};

const keyWordInputStyle = {
  marginBottom: '5px',
};

const imgStyle = {
  width: '12px',
  position: 'relative',
  right: '5px',
}



class PathInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const tmpProps = this.props;
    e.preventDefault();
    tmpProps.savePath();
  }

  handleChange(event) {
    const tmpProps = this.props;
    const { name } = event.target;
    const { value } = event.target;
    tmpProps.onPathInfoChange(name, value);
  }

  render() {
    const tmpProps = this.props;
    return (
      <div style={pathInfoStyle}>
        <h4 style={{ textAlign: 'center' }}>Edit Path</h4>
        <form onSubmit={this.handleSubmit}>
          <div style={keyWordInputStyle}>
            <label htmlFor="currentPathKeyword">
              Keyword
              <input
                type="text"
                value={tmpProps.currentPathKeyword}
                placeholder="Enter keyword..."
                onChange={this.handleChange}
                name="currentPathKeyword"
              />
            </label>

            <InfoBox text="Keyword is the word the listener must speak to take this path" />
          </div>
          <br />
          <div style={keyWordInputStyle}>
            <label htmlFor="currentPathCondition">
              Conditions
              <input
                type="text"
                value={tmpProps.currentPathCondition}
                placeholder="Enter conditions..."
                onChange={this.handleChange}
                name="currentPathCondition"
              />
            </label>

            <InfoBox text="The conditions listed here must be fulfilled for the user to go down this path. See the HELP menu for details on how to use Conditions." />
          </div>
          <button type="submit" style={buttonStyle}><img draggable="false" style={imgStyle} src={Save}/>Save Path</button>
          <button type="button" style={buttonStyle} onClick={tmpProps.deletePath}><img draggable="false" style={imgStyle} src={Bin}/> Delete Path</button>
        </form>
      </div>
    );
  }
}
PathInfo.propTypes = {
  savePath: PropTypes.func.isRequired,
  onPathInfoChange: PropTypes.func.isRequired,
  deletePath: PropTypes.func.isRequired,
  currentPathKeyword: PropTypes.string.isRequired,
  currentPathCondition: PropTypes.string.isRequired,

};

export default PathInfo;
