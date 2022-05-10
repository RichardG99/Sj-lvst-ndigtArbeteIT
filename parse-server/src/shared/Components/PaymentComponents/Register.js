import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Parse from '../../common';

const Register = (props) => {
  const [email, setEmail] = useState('jenny.rosen@example.com');
  const [customer, setCustomer] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {customer} = await fetch('/create-customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        email: email,
      }),
    }).then(r => r.json());
    const user = Parse.User.current()
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
    <main>
      <h1>Sample Photo Service</h1>

      <img src="https://picsum.photos/280/320?random=4" alt="picsum generated" width="140" height="160" />

      <p>
        Unlimited photo hosting, and more. Cancel anytime. Donde esta la biblioteca?
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </label>

        <button type="submit">
          Register
        </button>
      </form>
    </main>
  );
}

export default Register;
