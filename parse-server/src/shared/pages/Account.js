import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Parse from '../common';
//import './App.css';


const AccountSubscription = ({subscription}) => {
  console.log(subscription)
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

      <p>
        Card last4: {/*subscription.default_payment_method.card.last4*/}
      </p>

      <p>
        Current period end: {(new Date(subscription.current_period_end * 1000).toString())}
      </p>

      {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
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

      <a href="/prices">Add a subscription</a>
      <a href="/">Restart demo</a>

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
