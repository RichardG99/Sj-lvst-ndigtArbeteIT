import React from 'react';
import PropTypes from 'prop-types';
import Parse from '../../common';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    const tmpProps = this.props;
    this.logOut = this.logOut.bind(this);
    this.authenticate = tmpProps.authenticate;
  }

  logOut() {
    Parse.User.logOut().then(() => {
      this.authenticate();
    });
  }

  render() {
    const tmpProps = this.props;
    return (
      <button type="button" style={tmpProps.buttonStyle} onClick={this.logOut}>Log Out</button>
    );
  }
}
Logout.propTypes = {
  authenticate: PropTypes.func.isRequired,

};
export default Logout;
