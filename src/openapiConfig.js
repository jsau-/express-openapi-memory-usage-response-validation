'use strict';

const path = require('path');
const { app } = require('./app');

const openapiConfig = {
  app,
  consumesMiddleware: {},
  customFormats: {},
  customKeywords: {},
  dependencies: {},
  paths: path.resolve(__dirname, 'path'),
  promiseMode: true,
};

module.exports = { openapiConfig };
