import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    const tmpProps = this.props;
    this.authenticate = tmpProps.authenticate;
  }

  render() {
    return (
      <div>
        <LoginForm
          authenticate={this.authenticate}
        />
      </div>
    );
  }
}
LoginBox.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default LoginBox;
