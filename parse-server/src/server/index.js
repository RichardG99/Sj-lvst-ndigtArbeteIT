import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../shared/App';
import testHTMLRAW from '../TestForParse/test';
import settings from '../Settings'

const { ParseServer } = require('parse-server');

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
  masterKey: process.env.MASTER_KEY || '', 
  serverURL: process.env.SERVER_URL || 'http://localhost:'+PORT+'/parse', //...and server URL
  javascriptKey: 'DreamScape',
  // -- As we do not use an S3 file bucket, these lines are commented out
  /*filesAdapter: new S3Adapter(
    '', // TODO: Add S3_ACCESS_KEY
    '', // TODO: Add S3_SECRET_KEY
    '', // TODO: Add the name of your S3 bucket
    { directAccess: true },
  ),*/
});
const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

require('../cloud/main.js');

/* ----------------PARSE CODE END ------------------------- */

app.use(cors());

app.use(express.static('public'));

app.get('/test', (req, res) => {
  res.status(200).send(testHTMLRAW());
});
app.get('*', (req, res) => {
  const jsx = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
  );
  res.send(`
      <!DOCTYPE html>
      <html style="margin:0; height:100%; width:100%;">
        <head>
          <title>DreamScape</title>
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
});
ParseServer.createLiveQueryServer(httpServer);
