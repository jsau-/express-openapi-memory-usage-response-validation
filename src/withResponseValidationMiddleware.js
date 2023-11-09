'use strict';

const expressOpenapi = require('express-openapi');
const { apiDoc } = require('./apiDoc');
const { app } = require('./app');
const { openapiConfig } = require('./openapiConfig');
const { setupPeriodicMemoryUsageLog } = require('./setupPeriodicMemoryUsageLog');

// Source: README.md in `express-openapi`
function validateAllResponses(req, res, next) {
  const strictValidation = req.apiDoc['x-express-openapi-validation-strict'] ? true : false;

  if (typeof res.validateResponse === 'function') {
    const send = res.send;
    res.send = function expressOpenAPISend(...args) {
      const onlyWarn = !strictValidation;
      if (res.get('x-express-openapi-validation-error-for') !== undefined) {
        return send.apply(res, args);
      }
      const body = args[0];
      let validation = res.validateResponse(res.statusCode, body);
      let validationMessage;
      if (validation === undefined) {
        validation = { message: undefined, errors: undefined };
      }
      if (validation.errors) {
        const errorList = Array.from(validation.errors).map(_ => _.message).join(',');
        validationMessage = `Invalid response for status code ${res.statusCode}: ${errorList}`;
        console.warn(validationMessage);
        // Set to avoid a loop, and to provide the original status code
        res.set('x-express-openapi-validation-error-for', res.statusCode.toString());
      }
      if (onlyWarn || !validation.errors) {
        return send.apply(res, args);
      } else {
        res.status(500);
        return res.json({ error: validationMessage });
      }
    }
  }

  next();
};

async function main() {
  await expressOpenapi.initialize({
    ...openapiConfig,
    apiDoc: {
      ...apiDoc,
      'x-express-openapi-additional-middleware': [validateAllResponses],
    },
  });

  setupPeriodicMemoryUsageLog('[WITH] ');

  const port = process.env.EXPRESS_SERVER_PORT || 9001;

  app.listen(port, () => {
    console.log(`Express server with response validation listening on port ${port}.`);
  });
}

main();
