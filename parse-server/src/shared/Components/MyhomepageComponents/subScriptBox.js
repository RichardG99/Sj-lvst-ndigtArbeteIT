import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Parse from '../../common';

const newStoryButtonStyle = {
  fontSize: '16px',
  margin: '1em auto',
  height: '2em',
  display: 'block',
  backgroundColor: 'white',
  background: 'none',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
};


class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.butClick = this.butClick.bind(this);
    this.state = {
      idExist :false,
      isSubscribed: false,
      redirect: false,
    };
  }

  async fetchFunction(stripeId) {
    try {
        const {subscriptions} = await fetch('/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: stripeId
        }),
      }).then(r => r.json())
      return subscriptions.data
    }
    catch(err) {
      throw err;
      console.log(err);
    }
  };

  async butClick() {
    const user = Parse.User.current()
    const stripeId = user.get("stripeId");  
    if (stripeId) {            
      const subscriptions = await this.fetchFunction(stripeId)
      console.log(subscriptions)
      if (subscriptions) {                            //Checking if user already is subscribed 
        this.setState(() => ({ isSubscribed : true}))
      } else {                                        //Checking if user is assigned as a stripe customer 
          this.setState(() => ({ idExist : true }))
        } 
    } else if (user)                               //Checking if user is logged if not a stripe customer
        this.setState(() => ({ redirect: true }));
      else {
      alert('You must log in first');
    }
  }

  render() {
    const tmpState = this.state;
    if (tmpState.redirect) {
      console.log(this.state.redirect);
      return <Redirect to="/subscription" />;
    }
    if (tmpState.idExist) {
      console.log(this.state.idExist);
      return <Redirect to="/prices" />;
    }
    if (tmpState.isSubscribed) {
      console.log(this.state.isSubscribed)
      return <Redirect to={{pathname: '/account'}} />;
    }
    return (
      <button
        type="button"
        style={newStoryButtonStyle}
        onClick={this.butClick}
      >
        Subscriptions
      </button>
    );
  }
}
/*
Subscribe.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
*/
export default Subscribe;
