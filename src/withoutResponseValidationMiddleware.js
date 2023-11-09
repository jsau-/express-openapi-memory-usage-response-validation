'use strict';

const expressOpenapi = require('express-openapi');
const { apiDoc } = require('./apiDoc');
const { app } = require('./app');
const { openapiConfig } = require('./openapiConfig');
const { setupPeriodicMemoryUsageLog } = require('./setupPeriodicMemoryUsageLog');

async function main() {
  await expressOpenapi.initialize({
    ...openapiConfig,
    apiDoc: {
      ...apiDoc,
      'x-express-openapi-disable-response-validation-middleware': true,
    },
  });

  setupPeriodicMemoryUsageLog('[WITHOUT] ');

  const port = process.env.EXPRESS_SERVER_PORT || 9000;

  app.listen(port, () => {
    console.log(`Express server without response validation listening on port ${port}.`);
  });
}

main();
