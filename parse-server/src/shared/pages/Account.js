import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Parse from '../common';
import styles from '../styles';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const AccountSubscription = ({subscription}) => {
  console.log(subscription)
  let last4;
  if (subscription.default_payment_method) {
    last4 = subscription.default_payment_method.card.last4
  } else {
    last4 = false
  }
  const clientSecret = subscription.latest_invoice.payment_intent.client_secret;
  if (last4) {
    var last4paragraph = <p> Card: **** **** **** {last4} </p>
  }
  const date = new Date(subscription.current_period_end * 1000)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();   
  const daystring =  day + "/" + month + "/" + year

  return (
    <section>
      <hr />
      <p>
        Status: {subscription.status}
      </p>
        {last4paragraph}
      <p>
        Current period end: {daystring}
      </p>
      <p>
        {<Link to={{pathname: '/update', state: {subscriptionId: subscription.id, clientSecret: clientSecret }}}>
        Update payment</Link>}
      </p>
      <p>
        <Link to={{pathname: '/cancel', state: {subscription: subscription.id }}}>Cancel subscription</Link>
      </p>
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
      setSubscriptions(subscriptions.data);
    }
    fetchData();
  }, []);

  if (!subscriptions) {
    return '';
  }

  return (
    <div  style={styles.wrapper}>
      <h1>Account</h1>

      <h2>Subscription</h2>

      <div id="subscriptions">
        {subscriptions.map(s => {
          return <AccountSubscription key={s.id} subscription={s} />
        })}
        
      </div>
    </div>
  );
}

export default withRouter(Account);
