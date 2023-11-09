
'use strict';

module.exports = () => {
  const doc = {
    delete: (req, res) => res.sendStatus(200),
    get: (req, res) => res.sendStatus(200),
  };

  doc.delete.apiDoc = {
    description: 'Sample endpoint.',
    operationId: 'deleteSample296',
    summary: 'Sample Endpoint',
    responses: {
      200: {
        description: 'A sample endpoint response.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  $ref: '#/components/schemas/SampleComponent0',
                },
              },
              required: [
                'data',
              ],
            },
          },
        },
      },
    },
    security: [],
  };

  doc.get.apiDoc = {
    description: 'Sample endpoint.',
    operationId: 'getSample296',
    summary: 'Sample Endpoint',
    responses: {
      200: {
        description: 'A sample endpoint response.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  $ref: '#/components/schemas/SampleComponent0',
                },
              },
              required: [
                'data',
              ],
            },
          },
        },
      },
    },
    security: [],
  };

  return doc;
};
