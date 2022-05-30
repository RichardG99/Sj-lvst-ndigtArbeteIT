import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
//import './App.css';
import { Redirect } from 'react-router-dom';
import styles from '../styles';

const Cancel = ({location}) => {
  const [cancelled, setCancelled] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();

    await fetch('/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId: location.state.subscription
      }),
    })

    setCancelled(true);
  };

  const handleDenied = async (e) => {
    e.preventDefault();
    setDenied(true);
  };

  if(cancelled || denied) {
    return <Redirect to={`/account`} />
  }

  return (
    <div style={styles.wrapper}>
      <h1>Are you sure you want to cancel your subscription?</h1>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={handleDenied}>No</button>
    </div>
  )
}


export default withRouter(Cancel);
