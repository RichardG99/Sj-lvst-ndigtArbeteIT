import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles';
import LoginBox from './LoginBox';
import CreateAccount from './CreateAccount';

const contentStyle = {
  width: '400px',
  margin: '0 auto',
};

class WelcomeBox extends React.Component {
  constructor(props) {
    super(props);
    const tmpProps = this.props;
    this.authenticate = tmpProps.authenticate;
  }

  render() {
    return (
      <div>
        <h3 style={styles.h3}>Sign In</h3>
        <div style={contentStyle}>
          <LoginBox
            authenticate={this.authenticate}
          />
          <CreateAccount />
        </div>
      </div>
    );
  }
}
WelcomeBox.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default WelcomeBox;
