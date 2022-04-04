import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles';
import CreateAccountBox from '../Components/CreateuserComponents/CreateAccountBox';

class Createuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.redirectPage = this.redirectPage.bind(this);
  };

  redirectPage() {
    this.setState({ redirect: true });
  }

  render() {
    const tmpState = this.state;
    const tmpProps = this.props;
    if (tmpState.redirect || tmpProps.loggedIn) {
      return <Redirect to="/myhomepage" />;
    }

    return (
      <div style={styles.wrapper}>
        <CreateAccountBox redirectPage={this.redirectPage} />
      </div>
    );
  }
}
Createuser.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Createuser;
