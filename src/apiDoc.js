'use strict';

const fs = require('fs');
const path = require('path');

const schemas = {};

fs.readdirSync(path.resolve(__dirname, 'component')).forEach(file => {
  const schemaName = file.split('.js')[0];
  const { [schemaName]: schema } = require(`./component/${file}`);
  schemas[schemaName] = schema;
});

const apiDoc = {
  openapi: '3.0.3',
  info: {
    title: 'express-openapi Sample Project',
    version: '3.0.0',
  },
  paths: {},
  components: {
    schemas,
  },
  tags: [],
};

module.exports = { apiDoc };
