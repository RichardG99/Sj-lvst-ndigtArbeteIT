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

class EditPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    const properties = this.props; // TODO this might create issues...?
    this.state = {
      password: properties.password,
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
    user.set('password', tmpState.password);

    user.save().then(() => {
      // Refresh our page to ensure fresh data, and give a feed-forward feeling for the user
      console.log(`Successfully changed user password`);
      window.location.reload();
    }).catch((error) => {
      // Alert the user in case something went wrong with data saving
      alert("Something went wrong when changing your password! Try again later (your password has not been changed)"); 
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
            <label htmlFor="password">
              Password:
              <input
                type="text"
                value={tmpState.password}
                onChange={this.handleChange}
                placeholder="Enter new password"
                name="password"
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
EditPasswordForm.propTypes = {
  password: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditPasswordForm;
