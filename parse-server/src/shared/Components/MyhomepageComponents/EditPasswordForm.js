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
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
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

    if (tmpState.newPassword == '') {
      alert("Your password cannot consist of 0 characters!");
    } if (tmpState.newPassword !== tmpState.confirmPassword) {
      alert("Confirmation password must match new password");
    } else {
      //Gets our user
      const user = Parse.User.current();

      //Tries to verify the user's password, and changes it if succesful
      Parse.User.verifyPassword(user.getUsername(), tmpState.oldPassword).then(()=> {
        user.set('password', tmpState.password);
        user.save().then(() => {
          // Refresh our page to ensure fresh data, and give a feed-forward feeling for the user
          console.log(`Successfully changed user password`);
          window.location.reload();
        }).catch((error) => {
          // Alert the user in case something went wrong with data saving
          alert("Something went wrong when changing your password! Try again later (your password has not been changed)"); 
          console.log(`Error ${error.code} ${error.message}`);
        });
      }, (error) => {
        //Incorrect old user password, or some other error. Log it, and inform the user that most likely they've not written the correct password
        alert("Could not verify user to server; either your old password is incorrect, or a server-side issue has occurred."); 
        console.log(`Error ${error.code} ${error.message}`);
      })
    }
  }

  render() {
    const tmpState = this.state;
    const tmpProps = this.props;
    return (
      <form>
        <div style={formStyle}>
          <div style={inputDivStyle}>
            <label htmlFor="oldPassword">
              Old Password:
              <input
                type="password"
                value={tmpState.oldPassword}
                onChange={this.handleChange}
                placeholder="Enter existing password"
                name="oldPassword"
                required
              />
            </label>
          </div>
          <div style={inputDivStyle}>
            <label htmlFor="newPassword">
              New Password:
              <input
                type="password"
                value={tmpState.newPassword}
                onChange={this.handleChange}
                placeholder="Enter new password"
                name="newPassword"
                required
              />
            </label>
          </div>
          <div style={inputDivStyle}>
            <label htmlFor="confirmPassword">
              Confirm New Password:
              <input
                type="password"
                value={tmpState.confirmPassword}
                onChange={this.handleChange}
                placeholder="Enter new password again"
                name="confirmPassword"
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
  handleCancel: PropTypes.func.isRequired,
};

export default EditPasswordForm;
