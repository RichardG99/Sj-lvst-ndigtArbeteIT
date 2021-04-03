import React from 'react';
import PropTypes from 'prop-types';
import Parse from '../../common';
import styles from '../../styles';
import Logout from './Logout';
import EditAccountForm from './EditAccountForm';

const myInfoStyle = {
  boxSizing: 'border-box',
  paddingTop: '0.5em',
};

const staticInfoStyle = {
  boxSizing: 'border-box',
  margin: '0',
  padding: '0',
};

function parseGetProfileInfo() {
  return new Promise((resolve, reject) => {
    const user = Parse.User.current();
    const username = user.get('username');
    const email = user.get('email');
    const firstName = user.get('firstName');
    const lastName = user.get('lastName');

    const userInfo = {
      username,
      email,
      firstName,
      lastName,
    };
    resolve(userInfo);
    reject(new Error('Error in parseGetProfileInfo...'));
  });
}

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'förnamn',
      lastName: null,
      email: null,
      username: null,
      showForm: false,
    };
  }


  componentDidMount() {
    const user = Parse.User.current();
    if (user) {
      parseGetProfileInfo().then((userInformation) => {
        const userInfo = userInformation;
        this.setState(() => ({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          username: userInfo.username,
          email: userInfo.email,
        }));
      });
    }
  }

  render() {
    const tmpState = this.state;
    const tmpProps = this.props;
    return (
      <div style={myInfoStyle}>
        <div style={staticInfoStyle}>
          <p>
            Username:
            {tmpState.username}
          </p>
          <p>
            First name:
            {tmpState.firstName}
          </p>
          <p>
            Last name:
            {tmpState.lastName}
          </p>
          <p>
            Email:
            {tmpState.email}
          </p>
          <button type="button" style={styles.buttonStyle} onClick={this.toggleForm}>Edit Profile</button>
          <button type="button" style={styles.buttonStyle}>Change Password</button>
          <Logout
            authenticate={tmpProps.authenticate}
            loggedIn={tmpProps.loggedIn}
            buttonStyle={styles.buttonStyle}
          />
        </div>
        <div>
          {
            tmpState.showForm
              ? (
                <EditAccountForm
                  firstName={tmpState.firstName}
                  lastName={tmpState.lastName}
                  email={tmpState.email}
                  username={tmpState.username}
                  password={tmpState.firstName}
                  handleCancel={tmpState.handleCancel}
                />
              )
              : null
          }
        </div>

      </div>
    );
  }
}
MyInfo.propTypes = {
  authenticate: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default MyInfo;
