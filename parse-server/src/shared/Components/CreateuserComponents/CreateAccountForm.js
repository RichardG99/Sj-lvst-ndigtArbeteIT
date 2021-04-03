import React from 'react';
import PropTypes from 'prop-types';
import Parse from '../../common';

const labelStyle = {
  margin: '1em 0',
};

const inputStyle = {
  width: '100%',
  marginBottom: '1em',
  height: '1.5em',
};

const createAccountButtonStyle = {
  width: '10em',
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

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.signUp();
    event.preventDefault(); // Prevent opening a new page when clicked
  }

  signUp() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const user = new Parse.User();
    user.set('username', tmpState.username);
    user.set('password', tmpState.password);
    user.set('email', tmpState.email);
    user.set('firstName', tmpState.firstName);
    user.set('lastName', tmpState.lastName);
    user.set('myLibrary', []);

    user.signUp().then(() => {
      tmpProps.redirectPage();
      console.log(`Success, welcome ${tmpState.username}`);
    }).catch((error) => {
      console.log(`Error ${error.code} ${error.message}`);
    });
  }

  render() {
    const tmpState = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div>
            <label style={labelStyle} htmlFor="firstName">
              First name
              <input
                style={inputStyle}
                type="text"
                value={tmpState.firstName}
                onChange={this.handleChange}
                name="firstName"
                required
              />
            </label>

          </div>
          <div>
            <label style={labelStyle} htmlFor="lastName">
              Last name
              <input
                style={inputStyle}
                type="text"
                value={tmpState.lastName}
                onChange={this.handleChange}
                name="lastName"
                required
              />
            </label>
          </div>
          <div>
            <label style={labelStyle} htmlFor="email">
              Email
              <input
                style={inputStyle}
                type="email"
                value={tmpState.email}
                onChange={this.handleChange}
                name="email"
                required
              />
            </label>
          </div>
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
          </div>
          <button style={createAccountButtonStyle} type="submit">Create Account</button>
        </div>
      </form>
    );
  }
}
CreateAccountForm.propTypes = {
  redirectPage: PropTypes.func.isRequired,
};

export default CreateAccountForm;
