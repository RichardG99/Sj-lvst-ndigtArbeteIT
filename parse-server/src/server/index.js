import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../shared/App';
import testHTMLRAW from '../TestForParse/test';

const { ParseServer } = require('parse-server');

const PORT = 1337;
const app = express();

/* ----------------PARSE CODE START ------------------------- */

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
const { S3Adapter } = require('parse-server');

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

const api = new ParseServer({
  logLevel: 'warn',
  databaseURI: databaseUri || '', // TODO: Add connection string URI for your MongoDB
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', 
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  javascriptKey: 'DreamScape',
  filesAdapter: new S3Adapter(
    '', // TODO: Add S3_ACCESS_KEY
    '', // TODO: Add S3_SECRET_KEY
    '', // TODO: Add the name of your S3 bucket
    { directAccess: true },
  ),
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
