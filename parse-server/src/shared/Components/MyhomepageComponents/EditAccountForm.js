import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles';

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
    const properties = this.props; // TODO this might create issues...?
    this.state = {
      firstName: properties.firstName,
      lastName: properties.lastName,
      email: properties.email,
      username: properties.username,
      password: properties.password,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = properties.handleCancel;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    // TODO: remove this alert when connecting frontend to server

    const tmpState = this.state;
    alert(`name: ${tmpState.firstName} ${tmpState.lastName
    }, email: ${tmpState.email}, username: ${tmpState.username
    } and password: ${tmpState.password}`);
    event.preventDefault(); // Prevent opening a new page when clicked
    // TODO: create post request here to update user info
    // TODO: If submit succeeded, make the MyInfo component show the new info
  }

  render() {
    const tmpState = this.state;
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
          <button type="button" style={styles.buttonStyle} onClick={this.handleCancel}>Cancel</button>
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
  password: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditAccountForm;
