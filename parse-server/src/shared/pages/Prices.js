import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Parse from '../common';

const Prices = (props) => {
  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const {prices} = await fetch('/config').then(r => r.json());
      setPrices(prices);
    };
    fetchPrices();
    // TODO: Eventuellt lägga in en cleanup funktion för att inte fetcha fel
  }, [])

  const createSubscription = async (priceId) => {
    const stripeId = Parse.User.current().get("stripeId")
    console.log(stripeId)
    const {subscriptionId, clientSecret} = await fetch('/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: priceId,
        customerId: stripeId
      }),
    }).then(r => r.json());

    setSubscriptionData({ subscriptionId, clientSecret });
  } 


  if(subscriptionData) {
    console.log(subscriptionData)
    
    return <Redirect to={{
      pathname: '/subscribe',
      state: subscriptionData
    }} />
    
  }

  return (
    <div>
      <h1>Select a plan</h1>

      <div className="price-list">
        {prices.map((price) => {
          return (
            <div key={price.id}>
              <h3>{price.product.name}</h3>

              <p>
                ${price.unit_amount / 100} / month
              </p>

              <button onClick={() => createSubscription(price.id)}>
                Select
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default withRouter(Prices);