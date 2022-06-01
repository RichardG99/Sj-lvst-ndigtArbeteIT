import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles';
import Parse from '../../common';

const formStyle = {
  boxSizing: 'border-box',
  margin: '0',
  padding: '0',
};

const inputDivStyle = {
  margin: '1em 0',
};

class EditAccountForm extends React.Component {
  constructor(props) {
    super(props);
    const properties = this.props; 
    this.state = {
      firstName: properties.firstName,
      lastName: properties.lastName,
      email: properties.email,
      username: properties.username,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = properties.handleCancel;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Handles submitting the new account data
  handleSubmit(event) {
    const tmpState = this.state;

    event.preventDefault(); // Prevent opening a new page when clicked

    //Gets our user and sets their various attributes
    const user = Parse.User.current();
    user.set('username', tmpState.username);
    user.set('email', tmpState.email);
    user.set('firstName', tmpState.firstName);
    user.set('lastName', tmpState.lastName);

    user.save().then(() => {
      // Refresh our page to ensure fresh data, and give a feed-forward feeling for the user
      console.log(`Successfully changed user data`);
      window.location.reload();
    }).catch((error) => {
      // Alert the user in case something went wrong with data saving
      alert("Something went wrong when changing your profile data! Try again later (no changes were saved)"); 
      console.log(`Error ${error.code} ${error.message}`);
    })
  }

  render() {
    const tmpState = this.state;
    const tmpProps = this.props;
    return (
      <form>
        <div style={formStyle}>
          <div style={inputDivStyle}>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                value={tmpState.username}
                onChange={this.handleChange}
                placeholder="Enter Username"
                name="username"
                required
              />
            </label>
          </div>
          <div style={inputDivStyle}>
            <label htmlFor="firstName">
              First name:
              <input
                type="text"
                value={tmpState.firstName}
                onChange={this.handleChange}
                placeholder="Enter your first name"
                name="firstName"
                required
              />
            </label>
          </div>
          <div style={inputDivStyle}>
            <label htmlFor="lastName">
              Last name:
              <input
                type="text"
                value={tmpState.lastName}
                onChange={this.handleChange}
                placeholder="Enter your last name"
                name="lastName"
                required
              />
            </label>
          </div>
          <div style={inputDivStyle}>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                value={tmpState.email}
                onChange={this.handleChange}
                placeholder="Enter your email address"
                name="email"
                required
              />
            </label>
          </div>
          <button type="submit" style={styles.buttonStyle} onClick={this.handleSubmit}>Save</button>
          <button type="button" style={styles.buttonStyle} onClick={tmpProps.handleCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}
EditAccountForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditAccountForm;
