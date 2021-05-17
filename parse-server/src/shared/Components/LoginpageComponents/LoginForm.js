import React from 'react';
import PropTypes from 'prop-types';
import Parse from '../../common';

const labelStyle = {
  margin: '1em 0',
};

const statusStyle = {
  margin: '1em 0',
  color: 'red'
};

const inputStyle = {
  width: '100%',
  marginBottom: '1em',
  height: '1.5em',
};

const signInButtonStyle = {
  width: '6em',
  fontSize: '16px',
  margin: '0 auto 1em auto',
  height: '2em',
  display: 'block',
  backgroundColor: 'white',
  background: 'none',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    const tmpProps = this.props;
    this.state = {
      username: '',
      password: '',
      statusText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authenticate = tmpProps.authenticate;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent opening a new page when clicked
    this.login();
  }

  login() {
    // Can add login options, not needed.
    const tmpState = this.state;
    Parse.User.logIn(tmpState.username, tmpState.password).then((user) => {
      console.log(`Logged in as ${user.get('username')}!`);
      this.authenticate();
    }).catch((error) => {
      console.log(`Error ${error.code} ${error.message}`);
      this.setState( {statusText: `Error ${error.code}: ${error.message}`});
      this.authenticate();
    });
  }

  render() {
    const tmpState = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div>
            <label style={labelStyle} htmlFor="username">
              Username
              <input
                style={inputStyle}
                type="text"
                value={tmpState.username}
                onChange={this.handleChange}
                name="username"
                required
              />
            </label>
          </div>
          <div>
            <label style={labelStyle} htmlFor="password">
              Password
              <input
                style={inputStyle}
                type="password"
                value={tmpState.password}
                onChange={this.handleChange}
                name="password"
                required
              />
            </label>
            <label style={statusStyle} htmlFor="statusText">
              {this.state.statusText}
            </label>
          </div>
          <button style={signInButtonStyle} type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}
LoginForm.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default LoginForm;
