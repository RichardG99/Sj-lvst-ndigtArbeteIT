import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Parse from '../common';
import styles from '../styles';

const PaymentHeader = {
  fontFamily: "Arial",
  textAlign: 'center',
};

const priceContainer = {
  backgroundColor: 'white',
  borderRadius: '10px',
  textAlign: 'center',
  marginRight: '300px',
  marginLeft: '300px',
  padding: '1px',
};

const styleButton = {
  fontSize: '16px',
  marginRight: '1em',
  height: '2em',
  display: 'inline-block',
  backgroundColor: 'white',
  background: 'none',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
  textAlign: 'center',  
  marginBottom: '7px'
  }

const h3 = {
  fontFamily: 'Arial',
}

const p = {
  fontFamily: 'Arial',
}

const payContainer = {
  border: '2px solid grey',
  borderRadius: '10px',
  fontFamily: 'Arial',
  marginLeft: '200px',
  marginRight: '200px',
  marginBottom: '25px',
  backgroundColor: '#F8F6F6',
}

const marginTester = {
  margin: '50px'
}



const Prices = (props) => {
  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const {prices} = await fetch('/config').then(r => r.json());
      setPrices(prices);
    };
    fetchPrices();
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
    <main style={styles.wrapper}>
    <div style={marginTester}>
      

      

      <div className="price-list"
           style={priceContainer}>
             <h1 style={PaymentHeader}>Payment plan</h1>
        {prices.map((price) => {
          return (
            <div key={price.id}
            style={payContainer}>
              
              <h3>{price.product.name}</h3>

              <p style={p}>
                ${price.unit_amount / 100} / month
              </p>

              <button onClick={() => createSubscription(price.id)}
                       style={styleButton}>
                Select  
              </button>
            </div>
          )
        })}
      </div>
    </div>
    </main>
  );
}

export default withRouter(Prices);
