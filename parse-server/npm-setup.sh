#!/bin/bash

# Setup base tools
apt install npm
apt install webpack
apt install webpack-node-externals

# Install needed packages
npm install babel-loader
npm install babel-core
npm install babel-plugin-transform-object-rest-spread
npm install babel-preset-env
npm install babel-preset-react
npm install url-loader
npm install react-router-dom
npm install react-draggable
npm install prop-types
npm install react
npm install file-loader
npm install cors
npm install express
npm install parse
npm install parse-server
npm install react-dom-server
npm install

# Fix security warnings
npm install serialize-javascript@5.0.1
npm install isomorphic-fetch@3.0.0
npm install @google-cloud/speech@4.4.0
