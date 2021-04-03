import React from 'react';
import PropTypes from 'prop-types';

const infoStyle = {
  display: 'inline-block',
  position: 'relative',
};

const infoButton = {
  border: '1px solid black',
  display: 'inline-block',
  padding: '0 0.4em',
  borderRadius: '1em',
  marginLeft: '5px',
};

const infoBox = {
  position: 'absolute',
  top: '0.5em',
  left: '1em',
  border: '1px solid black',
  backgroundColor: 'white',
  padding: '0.5em',
  width: '100px',
};

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseOver(e) {
    e.preventDefault();
    this.setState({ showInfo: true });
  }

  handleMouseLeave(e) {
    e.preventDefault();
    this.setState({ showInfo: false });
  }

  render() {
    const tmpProps = this.props;
    const tmpState = this.state;
    return (
      <div style={infoStyle}>
        <p
          style={infoButton}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          i
        </p>
        {tmpState.showInfo
          ? (
            <p style={infoBox}>
              {tmpProps.text}
            </p>
          ) : null}
      </div>
    );
  }
}
InfoBox.propTypes = {
  text: PropTypes.string.isRequired,
};
export default InfoBox;
