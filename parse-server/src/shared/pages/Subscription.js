import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles';
import { NavLink } from 'react-router-dom';
import Register from '../Components/PaymentComponents/Register';

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    
  };


  render() {
    console.log("Du är ish här")
    const tmpProps = this.props;
    if (!tmpProps.loggedIn) {
      return <Redirect to="/loginpage" />;
    }
    return (
      <div style={styles.wrapper}>
         <NavLink to="/myhomepage" className="link" onClick={tmpProps.onClickNavLink}>Go back to my home page</NavLink>
        <p>HELLOO</p>
        <Register></Register>
      </div>
    );
  }
}
Subscription.propTypes = {
  authenticate: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
export default Subscription