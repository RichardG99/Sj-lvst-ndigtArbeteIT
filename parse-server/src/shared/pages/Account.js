import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Parse from '../common';
//import './App.css';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const AccountSubscription = ({subscription}) => {
  console.log("hoop")
  console.log(subscription)
  console.log("happ")
  let last4;
  if (subscription.default_payment_method) {
    last4 = subscription.default_payment_method.card.last4
  } else {
    last4 = false
  }
  const clientSecret = subscription.latest_invoice.payment_intent.client_secret;
  console.log(clientSecret)
  if (last4) {
    var last4paragraph = <p> Card last4: {last4} </p>
  }
  return (
    <section>
      <hr />
      <h4>
        <a href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}>
          {subscription.id}
        </a>
      </h4>

      <p>
        Status: {subscription.status}
      </p>
      
      {last4paragraph}

      <p>
        Current period end: {(new Date(subscription.current_period_end * 1000).toString())}
      </p>
      {<Link to=
      {{pathname: '/update', state: {subscriptionId: subscription.id, clientSecret: clientSecret }}}>
  Update payment</Link>}
      <Link to={{pathname: '/cancel', state: {subscription: subscription.id }}}>Cancel</Link>
    </section>
  )
}


const Account = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stripeId = Parse.User.current().get("stripeId")
      const {subscriptions} = await fetch('/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: stripeId
        }),
      }).then(r => r.json());
      console.log(subscriptions)
      setSubscriptions(subscriptions.data);
    }
    fetchData();
  }, []);

  if (!subscriptions) {
    return '';
  }

  return (
    <div>
      <h1>Account</h1>

      <h2>Subscriptions</h2>

      <div id="subscriptions">
        {subscriptions.map(s => {
          return <AccountSubscription key={s.id} subscription={s} />
        })}
        
      </div>
    </div>
  );
}

export default withRouter(Account);
