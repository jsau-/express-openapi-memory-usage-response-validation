'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const numberOfComponents = process.env.NUM_COMPONENTS || 1000;
const numberOfPaths = process.env.NUM_PATHS || 300;

const componentTemplateSource = `
'use strict';

const SampleComponent{{index}} = {
  additionalProperties: false,
  title: 'Sample Component',
  type: 'object',
  properties: {
    sampleField{{index}}One: {
      type: 'string',
      description: 'A sample field.',
    },
    sampleField{{index}}Two: {
      type: 'string',
      description: 'Another sample field.',
    },
  },
};

module.exports = { SampleComponent{{index}} };
`;

const pathTemplateSource = `
'use strict';

module.exports = () => {
  const doc = {
    delete: (req, res) => res.sendStatus(200),
    get: (req, res) => res.sendStatus(200),
  };

  doc.delete.apiDoc = {
    description: 'Sample endpoint.',
    operationId: 'deleteSample{{index}}',
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
    operationId: 'getSample{{index}}',
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
`;

const generateComponents = async () => {
  const componentTemplate = Handlebars.compile(componentTemplateSource);

  Array.from({ length: numberOfComponents }).forEach((val, index) => {
    const componentContent = componentTemplate({ index });
    const componentFilename = path.resolve(__dirname, 'component', `SampleComponent${index}.js`);
    fs.mkdirSync(path.resolve(__dirname, 'component'), { recursive: true });
    fs.writeFileSync(componentFilename, componentContent);
  });
};

const generatePaths = async () => {
  const pathTemplate = Handlebars.compile(pathTemplateSource);

  Array.from({ length: numberOfPaths }).forEach((val, index) => {
    const pathContent = pathTemplate({ index });
    const pathFilename = path.resolve(__dirname, 'path', `sample${index}.js`);
    fs.mkdirSync(path.resolve(__dirname, 'path'), { recursive: true });
    fs.writeFileSync(pathFilename, pathContent);
  });
};

const generateTemplates = async () => {
  await generateComponents();
  await generatePaths();
};

generateTemplates();
