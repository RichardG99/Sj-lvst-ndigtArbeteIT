import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Parse from '../../common';
import styles from '../../styles';

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
  height: '4em',
  display: 'block',
  backgroundColor: 'white',
  background: 'none',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
};

const contentStyle = {
  width: '400px',
  margin: '0 auto',
};

const Register = (props) => {
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customer, setCustomer] = useState("");
  
  const handleSubmit = async (e) => {
    const user = Parse.User.current()
    e.preventDefault();
    const {customer} = await fetch('/create-customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        name: name,
        email: user.getEmail(),
        adress: adress, 
        phoneNumber: phoneNumber
      }),
    }).then(r => r.json());
    user.set('stripeId', customer.id)
    user.save().then(() => {
      // Refresh our page to ensure fresh data, and give a feed-forward feeling for the user
      console.log(`Successfully added stripe account`);
      window.location.reload();
    }).catch((error) => {
      // Alert the user in case something went wrong with data saving
      alert("Something went wrong when adding customer id"); 
      console.log(`Error ${error.code} ${error.message}`); 
    })
    setCustomer(customer);
  };
  
  if(customer) {
    return <Redirect to={{pathname: '/prices'}} />
  }

  return (
    <main style={styles.wrapper}>
      <h1>Payment details</h1>

      <p>
        Please enter your subscription information below:
      </p>

      <form onSubmit={handleSubmit} style={contentStyle}>
        <div className="container">
          <div>
            <label style={labelStyle}>
              Name
              <input
                style={inputStyle}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              Adress
              <input
                style={inputStyle}
                type="text"
                name="adress"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                required />
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              Phone Number
              <input
                style={inputStyle}
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} />
            </label>
          </div>

          <button style={signInButtonStyle} type="submit">
            Register details
          </button>
      </div>
      </form>
    </main>
  );
}

export default Register;
