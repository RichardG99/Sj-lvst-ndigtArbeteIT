import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../shared/App';
import testHTMLRAW from '../TestForParse/test';
import settings from '../Settings'
//import {STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET} from "../settings"
const { ParseServer } = require('parse-server');
//import {Elements} from '@stripe/react-stripe-js';
//import {loadStripe} from '@stripe/stripe-js';
const bodyParser = require('body-parser');



const PORT = settings.serverPort;
const app = express();

/* ----------------PARSE CODE START ------------------------- */

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
//const { S3Adapter } = require('parse-server'); // We do not use an S3 adapter

if (databaseUri) {
  console.log('DATABASE_URI overridden via environment variable for this server session');
}
if (process.env.APP_ID) {
  console.log('APP_ID overridden via environment variable for this server session');
}
if (process.env.SERVER_URL) {
  console.log('SERVER_URL overridden via environment variable for this server session');
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const api = new ParseServer({
  logLevel: 'warn',
  databaseURI: databaseUri || settings.databaseURI, // We can override our database URI by setting an environment variable
  appId: process.env.APP_ID || settings.appID, //Same with our app ID...
  masterKey: process.env.MASTER_KEY || 'myMasterKey', 
  serverURL: process.env.SERVER_URL || 'http://localhost:'+PORT+'/parse', //...and server URL
  javascriptKey: 'AugmentedAudio',
  // -- As we do not use an S3 file bucket, these lines are commented out
  /*filesAdapter: new S3Adapter(
    '', // TODO: Add S3_ACCESS_KEY
    '', // TODO: Add S3_SECRET_KEY
    '', // TODO: Add the name of your S3 bucket
    { directAccess: true },
  ),*/
});

/* ----------------PARSE CODE END ------------------------- */

const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

require('../cloud/main.js');

app.use(cors());

app.use(express.static('public'));

//STRIPE IMPLEMENTATION START

// Use JSON parser for parsing payloads as JSON on all non-webhook routes.
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Initializing the stripe client
if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.STRIPE_PUBLISHABLE_KEY ||
  !process.env.STATIC_DIR // TODO: VAD INNEBÄR STATIC DIR?
) {console.log("Stripe keys not setup correctly, one or more variable/s is missing")}
const stripe = require('stripe')(settings.STRIPE_SECRET_KEY);

//Requests to connect with Stripe and creating a customer to the account linked to used keys
//Response is customer that can buy from store
app.post('/create-customer', async (req, res) => {
  // Create a new customer object
  try {
    const customer = await stripe.customers.create({
    email: req.body.email});
    res.send({ customer: customer })}
  catch (error) {
      console.error ('stripe', error);
   }
});   

// Test get request
app.get('/test', (req, res) => {
  res.status(200).send(testHTMLRAW());
 });

 // Request from front end to recieve the active subscriptions on the Stripe account
 // Respone is used to render subscriptions in front end 
 app.get('/config', async (req, res) => {
  const prices = await stripe.prices.list({
    active : true, //['price_1Kvj3FAqt7xgnAosdjIMuwaw', 'price_1Kvj2dAqt7xgnAosjvRl3RLf'],
    expand: ['data.product']
  })
  res.send({
    publishableKey: settings.STRIPE_PUBLISHABLE_KEY,
    prices: prices.data,
  });
});

app.post('/create-subscription', async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  // TODO Retrieve the StripeID from the user in question
  const customerId = req.body.customerId;
  console.log(customerId)

  // Create the subscription
  const priceId = req.body.priceId;
  console.log(priceId)

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.post('/update', async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const subscription_id = req.body.subscription_id
  const payment_intent = req.body.clientSecret
  console.log(clientSecret)
  console.log(subscription_id)
  const subscription = await stripe.subscriptions.update(
    subscription_id,
    {
      default_payment_method: payment_intent.payment_method,
    },
  );
  res.json({subscription});
});

app.post('/subscriptions', async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.body.customerId;
  console.log(customerId)
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method', 'data.latest_invoice.payment_intent'],
  });
  res.json({subscriptions});
});

app.post('/cancel-subscription', async (req, res) => {
  // Cancel the subscription
  try {
    const deletedSubscription = await stripe.subscriptions.del(
      req.body.subscriptionId
    );

    res.send({ subscription: deletedSubscription });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.header('Stripe-Signature'),
        settings.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }

    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.payment_succeeded':
        if(dataObject['billing_reason'] == 'subscription_create') {
          // The subscription automatically activates after successful payment
          // Set the payment method used to pay the first invoice
          // as the default payment method for that subscription
          const subscription_id = dataObject['subscription']
          const payment_intent_id = dataObject['payment_intent']

          // Retrieve the payment intent used to pay the subscription
          const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

          const subscription = await stripe.subscriptions.update(
            subscription_id,
            {
              default_payment_method: payment_intent.payment_method,
            },
          );

          console.log("Default payment method set for subscription:" + payment_intent.payment_method);
        };

        break;
      case 'invoice.payment_failed':
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        // This can be used in a future implementation where e-mails to customers are present
        break;
      case 'invoice.finalized':
        // If you want to manually send out invoices to your customers
        // or store them locally to reference to avoid hitting Stripe rate limits.
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        break;
      case 'customer.subscription.trial_will_end':
        // Send notification to your user that the trial will end
        break;
      case 'customer.subscription.trial_will_end':
          // Send notification to your user that the trial will end
        break;
      default:
      // Unexpected event type
    }
    res.sendStatus(200);
  }
);

app.get('*', (req, res) => {
  const jsx = renderToString(
    <StaticRouter location={req.url} >
        <App />
    </StaticRouter>,
  );
  res.send(`
      <!DOCTYPE html>
      <html style="margin:0; height:100%; width:100%;">
        <head>
          <title>Augmented Audio</title>
          <script src="/bundle.js" defer></script>
          <link rel="stylesheet" type="text/css" href="../shared/style.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css" />
        </head>

        <body style="margin:0; height:100%; width:100%; display:inline-block;">
          <div style="margin:0; height:100%; width:100%;" id="app">${jsx}</div>
        </body>
      </html>
    `);
});

const httpServer = require('http').createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is listning on port:${PORT}`);
  console.log(`Server is :${httpServer}`);
});
ParseServer.createLiveQueryServer(httpServer);
