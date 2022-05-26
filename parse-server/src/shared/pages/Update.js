import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
//import './App.css';
import { Redirect } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from '../styles';



const Update = ({location}) => {
  const [cancelled, setCancelled] = useState(false);
  const [clientSecret] = useState(location.state.clientSecret);
  const [subscriptionId] = useState(location.state.subscriptionId);
  const [name, setName] = useState('');
  const [messages, _setMessages] = useState('');
  const [paymentIntent, setPaymentIntent] = useState();

  // helper for displaying status messages.
  const setMessage = (message) => {
    //_setMessages(`${messages}\n\n${message}`);
    _setMessages(message)
  }

  // Initialize an instance of stripe.
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return '';
  }

  const updateData = async () => {
    const {subscription} = await fetch('/update', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subscription_id: subscriptionId,
            payment_intent: paymentIntent
        }),
    }).then(r => r.json());
    console.log(subscription)
}  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use card Element to tokenize payment details
    let { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
        }
      }
    });

    if(error) {
      // show error and collect new card details.

      setMessage(error.message);
      return;
    }
    setPaymentIntent(paymentIntent);
  }

  const handleCancel = async (e) => {
    e.preventDefault();
    setCancelled(true);
  };

  if(paymentIntent && paymentIntent.status === 'succeeded') {
    console.log("Collected payment info")
    updateData()
    return <Redirect to={{pathname: '/account'}} />
  }
  
  if(cancelled) {
    return <Redirect to={{pathname: '/account'}} />
  }

  return (
    <div style={styles.wrapper}>
      <h1>
        Update payment
      </h1>

      <p>
        Try the successful test card: <span>4242424242424242</span>.
      </p>

      <p>
        Try the test card that requires SCA: <span>4000002500003155</span>.
      </p>

      <p>
        Use any <i>future</i> expiry date, CVC,5 digit postal code
      </p>

      

      <h2>
        Card details:
      </h2>

      <form onSubmit={handleSubmit}>
        <label>
          Card holder
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <CardElement />

        <button>
          Update
        </button>

        <div>{messages}</div>
      </form>  
      <button onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default withRouter(Update);
