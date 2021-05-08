import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles';
import WelcomeBox from '../Components/LoginpageComponents/WelcomeBox';

class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    const tmpProps = this.props;
    this.authenticate = tmpProps.authenticate;
  }
  
  componentDidMount() {
    this.authenticate();
  }

  render() {
    const tmpProps = this.props;
    if (tmpProps.loggedIn) {
      return <Redirect to="/myhomepage" />;
    }
    return (
      <div style={styles.wrapper}>
        <WelcomeBox
          authenticate={this.authenticate}
        />
      </div>
    );
  }
}
Loginpage.propTypes = {
  authenticate: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Loginpage;
